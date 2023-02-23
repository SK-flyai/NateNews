import pandas as pd
from tqdm import tqdm
from sklearn.feature_extraction.text import CountVectorizer
from konlpy.tag import Mecab
from pathlib import Path
import numpy as np
import itertools
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer, util
import numpy as np
import networkx as nx
import matplotlib.pyplot as plt
import kss
import warnings

from load_dataset import *

class TextRank:
    """
    ***************** 일단 성능 별로라 사용안함 *****************************
    bert 기반 추출적 요약 텍스트 랭크 알고리즘
    문장들 간에 유사도를 구하고 그 기반으로 중요한 문장 추출
    """
    def __init__(self, model_path="sinjy1203/ko-sbert-natenews"):
        """
        self.embedding_model: kobert으로 학습시킨 sentencebert
        """
        self.embedding_model = SentenceTransformer(model_path)

    def similarity_matrix_(self, sentence_embedding: np.ndarray) -> np.ndarray:
        """
        각 문장들의 임베딩 값을 이용해 nxn형태의 서로의 유사도 리턴
        """
        return cosine_similarity(sentence_embedding, sentence_embedding)

    def calculate_score_(self, sim_matrix: np.ndarray) -> dict:
        """
        문장의 유사도 행렬을 이용해서 문장 인덱스 별 score 리턴 -> {idx: score}
        """
        nx_graph = nx.from_numpy_array(sim_matrix)
        try:
            scores = nx.pagerank(nx_graph)
        except nx.exception.PowerIterationFailedConvergence:
            scores = nx.pagerank(nx_graph, tol=1)
        return scores

    def ranked_sentences_(self, sentences: List[str], scores: dict, n: int = 3) -> List[str]:
        """
        score 기반으로 top_n 개의 문장 리턴
        """
        top_scores = sorted(((scores[i], s)
                             for i, s in enumerate(sentences)),
                            reverse=True)
        top_n_sentences = [sentence
                           for score, sentence in top_scores[:n]]
        return top_n_sentences

    def predict(self, doc: str, top_n: int = 5) -> List[str]:
        """
        뉴스기사 내용을 받으면 가장 중요한 top_n개의 문장을 리턴
        """
        sents_lst = kss.split_sentences(doc)
        sents_lst = list(filter(lambda x: len(x) > 10, sents_lst))
        sent_embeddings = self.embedding_model.encode(sents_lst)
        sim_matrix = self.similarity_matrix_(sent_embeddings)
        scores = self.calculate_score_(sim_matrix)
        top_sents = self.ranked_sentences_(sents_lst, scores, n=top_n)
        return top_sents

    def pred_df(self, df: pd.DataFrame, top_n: int) -> pd.DataFrame:
        """
        dataframe의 contents를 모두 예측
        """
        preds = []
        for i, sent in tqdm(enumerate(df['contents']), desc='textrank pred'):
            try:
                preds += [self.predict(sent, top_n=top_n)]
            except:
                print(i, sent)
                raise Exception('error')
        df['textrank'] = preds
        return df


class KeySentence:
    """
    뉴스 제목과 뉴스 본문 문장들의 유사도를 통해
    신문본문에서 주요 문장 추출

    ex)
        model_path = "sinjy1203/ko-sbert-natenews"
        keysent = KeySentence(model_path=model_path)
        key_sent = keysent.predict(본문내용)

    """
    def __init__(self, model_path='sinjy1203/ko-sbert-natenews'):
        """
        Args:
            model_path: huggingface hub에 있는 finetuning한 sbert model

        """
        self.model = SentenceTransformer(model_path)

    def mss_(self, doc_embedding: np.ndarray, candidate_embeddings: np.ndarray,
             candidates: List[str], top_n: int, nr_candidates: int,
             title_w: float = 0.5) -> List[str]:
        """
        Max Sum Similarity
        후보간 유사성은 최소화, 문서와의 유사성은 최대화 를 목적으로 주요문장 추출 알고리즘
        Args:
            doc_embedding: 뉴스본문의 임베딩값
            candidate_embeddings: 문장 후보군들의 임베딩값들
            candidates: 문장 후보군
            top_n: top_n개의 문장들을 주요문장으로 리턴
            nr_candidates: 처음에 추출할 뉴스본문과 유사도가 높은 문장 개수
            title_w: 뉴스의 임베딩 값을 구할 때 title의 가중치

        Returns:
            top_n개의 주요문장 리스트
        """
        # 문서와 각 문장들 간의 유사도
        distances = cosine_similarity(doc_embedding, candidate_embeddings)
        distances = distances[0] * (1 - title_w) + distances[1] * title_w
        distances = distances[np.newaxis]

        # 각 문장들 간의 유사도
        distances_candidates = cosine_similarity(candidate_embeddings,
                                                 candidate_embeddings)

        # 코사인 유사도에 기반하여 문장들 중 상위 nr_candidates개의 문장을 pick.
        sents_idx = list(distances.argsort()[0][-nr_candidates:])
        sents_vals = [candidates[index] for index in sents_idx]
        distances_candidates = distances_candidates[np.ix_(sents_idx, sents_idx)]

        # 각 문장들 중에서 가장 덜 유사한 문장들 top_n개를 최종 리턴
        min_sim = np.inf
        candidate = None
        for combination in itertools.combinations(range(len(sents_idx)), top_n):
            sim = sum([distances_candidates[i][j] for i in combination for j in combination if i != j])
            if sim < min_sim:
                candidate = combination
                min_sim = sim

        return [sents_vals[idx] for idx in candidate]

    def mmr_(self, doc_embedding: np.ndarray, candidate_embeddings: np.ndarray,
             candidates: List[str], top_n: int, diversity: float,
             title_w: float = 0.5) -> List[str]:
        """
        Maximal Marginal Relevance
        문서와 유사도가 가장 높은 문장을 선택하고
        이미 선택된 문장과 유사하지 않으면서 문서와 유사한 문장을 반복적으로 선택
        Args:
            doc_embedding: 신문 기사의 임베딩값
            candidate_embeddings: 문장 후보군들의 임베딩값들
            candidates: 문장 후보군들의 원본(한글)
            top_n: top n개의 문장들을 주요문장으로 리턴
            diversity: top_n개의 문장들의 유사도정도 (0~1)
            title_w: 뉴스의 임베딩 값을 구할 때 title의 가중치

        Returns:
            top_n개의 주요문장 리스트
        """

        # 문서와 각 문장들 간의 유사도가 적혀있는 리스트
        sent_doc_similarity = cosine_similarity(candidate_embeddings, doc_embedding)
        sent_doc_similarity = sent_doc_similarity[:, 0] * (1 - title_w) + \
                              sent_doc_similarity[:, 1] * title_w
        sent_doc_similarity = sent_doc_similarity[:, np.newaxis]

        # 각 문장들 간의 유사도
        sent_similarity = cosine_similarity(candidate_embeddings)

        # 문서와 가장 높은 유사도를 가진 문장의 인덱스를 추출.
        sents_idx = [np.argmax(sent_doc_similarity)]

        # 가장 높은 유사도를 가진 문장의 인덱스를 제외한 문서의 인덱스들
        candidates_idx = [i for i in range(len(candidates)) if i != sents_idx[0]]

        # 최고의 주요문장은 이미 추출했으므로 top_n-1번만큼 아래를 반복.
        # ex) top_n = 5라면, 아래의 loop는 4번 반복됨.
        for _ in range(top_n - 1):
            candidate_similarities = sent_doc_similarity[candidates_idx, :]
            target_similarities = np.max(sent_similarity[candidates_idx][:, sents_idx], axis=1)
            # MMR을 계산
            mmr = (1 - diversity) * candidate_similarities - diversity * target_similarities.reshape(-1, 1)
            mmr_idx = candidates_idx[np.argmax(mmr)]
            # keywords & candidates를 업데이트
            sents_idx.append(mmr_idx)
            candidates_idx.remove(mmr_idx)

        return [candidates[idx] for idx in sents_idx]

    def predict(self, doc: str, title: str, mode: str = 'mmr', top_n: int = 1, nr_candidates: int = 10,
                diversity: float = 0.2, title_w: float = 0.5) -> List[str]:
        """
        뉴스본문에서 주요문장들을 리턴
        Args:
            doc: 뉴스 본문
            title: 뉴스 제목
            mode: mss or mmr
            top_n: 추출할 문장 개수
            nr_candidates: mss의 파라미터
            diversity: mmr의 파라미터
            title_w: 뉴스의 임베딩 값을 구할 때 title의 가중치

        Returns:
            top_n개의 주요문장 리스트
        """
        # candidates = kss.split_sentences(doc) # 뉴스본문에서 문장들 구분
        # candidates = doc.split('. ')
        candidates = re.split('\. |\? ', doc)

        doc_embedding = self.model.encode([doc, title]) # 뉴스본문의 임베딩
        candidate_embeddings = self.model.encode(candidates) # 각 문장들의 임베딩들

        main_sents = None
        if mode == 'mss':
            main_sents = self.mss_(doc_embedding, candidate_embeddings, candidates, top_n=top_n,
                                nr_candidates=nr_candidates, title_w=title_w)
        elif mode == 'mmr':
            main_sents = self.mmr_(doc_embedding, candidate_embeddings, candidates, top_n=top_n,
                                   diversity=diversity, title_w=title_w)
        else:
            raise Exception('keyerror')

        return main_sents

    def pred_df(self, df: pd.DataFrame, top_n: int) -> pd.DataFrame:
        """
        dataframe의 contents를 모두 예측
        """
        preds = []
        for sent in tqdm(df['contents'], desc='keysentence pred'):
            preds += [self.predict(sent, top_n=top_n)]
        df['keysentence'] = preds
        return df

if __name__ == '__main__':
    warnings.filterwarnings('ignore')
    # news = NateNews(data_dir='./natenews_data/20220301.csv')
    # news = NaverSports()

    # docs, topics = news.load_data()
    # df = pd.read_csv('./natenews_data/keyword.csv', index_col=0)
    news = NateNews()
    df = news.load_data()

    ##
    model_path = "./ko-sbert-natenews"
    keysent = KeySentence(model_path=model_path)
    textrank = TextRank(model_path=model_path)

    ##
    pred_sent = keysent.predict(df.loc[157, 'contents'], top_n=1)
    print(pred_sent)

    ##
    sents = kss.split_sentences(df.loc[15, 'contents'])
    print(sents)

    ##
    # len_lst = []
    # for i in tqdm(range(len(df))):
    #     sent = df.loc[i, 'contents']
    #     len_lst += [len(kss.split_sentences(sent))]
    # max(len_lst)
    # for sent in kss.split_sentences(df.loc[460, 'contents']):
    #     print(sent, len(sent))
    # print(textrank.predict(df.loc[460, 'contents'], top_n=1))

    ##
    # df = df.loc[:100]
    # df = keysent.pred_df(df, top_n=1)
    # df = textrank.pred_df(df, top_n=1)
    # cols = list(df.columns)
    # cols.remove('contents')
    # cols += ['contents']
    # df[cols].to_csv('./natenews_data/Nate_keyword_sum.csv')
    #
    # ##
    # idx = 95
    # # print(textrank.predict(docs[idx]))
    # # print(type(textrank.predict(docs[idx])[0]))
    # # print("---------keysent----------")
    # # for sent in keysent.predict(docs[idx], diversity=0):
    # #     print(sent)
    # # print("---------textrank----------")
    # # for sent in textrank.predict(docs[idx]):
    # #     print(sent)
    # # print('topic: ', topics[idx])
    # #
    # print("---------original----------")
    # for sent in kss.split_sentences(docs[idx]):
    #     print(sent)
    #
    # ##
    # # model = KeySentence()
    # # model = KeySentence(model_path='./model')
    # # model = TextRank()
    # model = TextRank(model_path='./model')
    #
    # pred_idx = 3
    # sents = kss.split_sentences(docs[pred_idx])
    # keysents = model.predict(docs[pred_idx], top_n=3)
    #
    # with open('result/naver_rank_good_sum.txt', 'w') as f:
    #     for sent in sents:
    #         f.write(sent + "\n")
    #     f.write('\n')
    #     for keysent in keysents:
    #         f.write(keysent + '\n')
