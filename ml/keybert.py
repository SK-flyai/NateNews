##
from tqdm import tqdm
from sklearn.feature_extraction.text import CountVectorizer
from konlpy.tag import Mecab
from pathlib import Path
from transformers import FeatureExtractionPipeline
from transformers import BertTokenizer
from transformers import BertConfig, BertModel
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np
import itertools
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer, util
import numpy as np
import warnings

from load_dataset import *
from preprocess import CustomTokenizer

class KeyBERT:
    """
    신문기사 내용에서 주요 키워드를 추출
    """
    def __init__(self, tag: str = 'NNP'):
        """
        self.model: 문장 임베딩 모델 (kobert를 이용해 학습시킨 sentencebert 모델)
        self.tokenizer: 키워드 후보군 추출에 사용되는 tokenizer
        """
        self.model = SentenceTransformer("jhgan/ko-sbert-nli")
        self.tokenizer = CustomTokenizer(Mecab(), tag=tag)

    def mss_(self, doc_embedding: np.ndarray, candidate_embeddings: np.ndarray,
             words: np.ndarray, top_n: int, nr_candidates: int) -> List[str]:
        """
        Max Sum Similarity
        후보간 유사성은 최소화, 문서와의 유사성은 최대화
        Args:
            doc_embedding: 신문 기사의 임베딩값
            candidate_embeddings: 키워드 후보군들의 임베딩값들
            words: 키워드 후보군 단어들
            top_n: top n개의 단어들을 키워드로 리턴
            nr_candidates: 처음에 추출할 문서와의 유사도가 높은 단어 개수

        Returns:
            top_n개의 키워드 리스트
        """
        # 문서와 각 키워드들 간의 유사도
        distances = cosine_similarity(doc_embedding, candidate_embeddings)

        # 각 키워드들 간의 유사도
        distances_candidates = cosine_similarity(candidate_embeddings,
                                                 candidate_embeddings)

        # 코사인 유사도에 기반하여 키워드들 중 상위 nr_candidates개의 단어를 pick.
        words_idx = list(distances.argsort()[0][-nr_candidates:])
        words_vals = [words[index] for index in words_idx]
        distances_candidates = distances_candidates[np.ix_(words_idx, words_idx)]

        # 각 키워드들 중에서 가장 덜 유사한 키워드들 top_n개를 최종 리턴
        min_sim = np.inf
        candidate = None
        for combination in itertools.combinations(range(len(words_idx)), top_n):
            sim = sum([distances_candidates[i][j] for i in combination for j in combination if i != j])
            if sim < min_sim:
                candidate = combination
                min_sim = sim

        return [words_vals[idx] for idx in candidate]

    def mmr_(self, doc_embedding: np.ndarray, candidate_embeddings: np.ndarray,
             words: np.ndarray, top_n: int, diversity: float) -> List[str]:
        """
        Maximal Marginal Relevance
        문서와 유사도가 가장 높은 단어를 선택하고
        이미 선택된 키워드와 유사하지 않으면서 문서와 유사한 단어르 반복적으로 선택
        Args:
            doc_embedding: 신문 기사의 임베딩값
            candidate_embeddings: 키워드 후보군들의 임베딩값들
            words: 키워드 후보군 단어들
            top_n: top n개의 단어들을 키워드로 리턴
            diversity: top_n개의 키워드들의 유사도정도 (0~1)

        Returns:
            top_n개의 키워드 리스트
        """

        # 문서와 각 키워드들 간의 유사도가 적혀있는 리스트
        word_doc_similarity = cosine_similarity(candidate_embeddings, doc_embedding)

        # 각 키워드들 간의 유사도
        word_similarity = cosine_similarity(candidate_embeddings)

        # 문서와 가장 높은 유사도를 가진 키워드의 인덱스를 추출.
        # 만약, 2번 문서가 가장 유사도가 높았다면
        # keywords_idx = [2]
        keywords_idx = [np.argmax(word_doc_similarity)]

        # 가장 높은 유사도를 가진 키워드의 인덱스를 제외한 문서의 인덱스들
        # 만약, 2번 문서가 가장 유사도가 높았다면
        # ==> candidates_idx = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10 ... 중략 ...]
        candidates_idx = [i for i in range(len(words)) if i != keywords_idx[0]]

        # 최고의 키워드는 이미 추출했으므로 top_n-1번만큼 아래를 반복.
        # ex) top_n = 5라면, 아래의 loop는 4번 반복됨.
        for _ in range(top_n - 1):
            candidate_similarities = word_doc_similarity[candidates_idx, :]
            target_similarities = np.max(word_similarity[candidates_idx][:, keywords_idx], axis=1)
            # MMR을 계산
            mmr = (1 - diversity) * candidate_similarities - diversity * target_similarities.reshape(-1, 1)
            mmr_idx = candidates_idx[np.argmax(mmr)]
            # keywords & candidates를 업데이트
            keywords_idx.append(mmr_idx)
            candidates_idx.remove(mmr_idx)

        return [words[idx] for idx in keywords_idx]

    def predict(self, doc: str, ngram_range: Tuple[int, int] = (1, 1), mode: str = 'mmr', top_n: int = 5, nr_candidates: int = 10,
                diversity: float = 0.2) -> List[str]:
        """
        뉴스기사에서 키워드들을 리턴
        Args:
            doc: 뉴스기사
            ngram_range: 키워드 후보군들의 window 크기  ex) ngram_range=(1, 2) => window 크기가 1과 2의 후보군들을 뽑는다.
            mode: mss or mmr
            top_n: 추출할 키워드 개수
            nr_candidates: mss의 파라미터
            diversity: mmr의 파라미터

        Returns:
            top_n개의 키워드 리스트
        """
        count = CountVectorizer(tokenizer=self.tokenizer, ngram_range=ngram_range).fit([doc])
        candidates = count.get_feature_names_out()

        doc_embedding = self.model.encode([doc])
        print(doc_embedding.shape)
        candidate_embeddings = self.model.encode(candidates)

        keyword = None
        if mode == 'mss':
            keyword = self.mss_(doc_embedding, candidate_embeddings, candidates, top_n=top_n,
                                nr_candidates=nr_candidates)
        elif mode == 'mmr':
            keyword = self.mmr_(doc_embedding, candidate_embeddings, candidates, top_n=top_n, diversity=diversity)
        else:
            raise Exception('keyerror')

        return keyword



if __name__ == '__main__':
    warnings.filterwarnings('ignore')
    # news = NateNews(data_dir='./natenews_data/20220301.csv')
    news = NaverSports()

    docs = news.load_data()

    ##
    keybert = KeyBERT()

    ##
    print(keybert.predict(docs[3], top_n=10, ngram_range=(1, 1)))

    #################### docs[0]은 키워드가 한개 나와서 에러 나옴