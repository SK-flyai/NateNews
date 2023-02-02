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

from load_dataset import *

class TextRank:
    """
    bert 기반 추출적 요약 텍스트 랭크 알고리즘
    문장들 간에 유사도를 구하고 그 기반으로 중요한 문장 추출
    """
    def __init__(self):
        """
        self.embedding_model: kobert으로 학습시킨 sentencebert
        """
        self.embedding_model = SentenceTransformer("jhgan/ko-sbert-nli")

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
        scores = nx.pagerank(nx_graph)
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
        sent_embeddings = self.embedding_model.encode(sents_lst)
        sim_matrix = self.similarity_matrix_(sent_embeddings)
        scores = self.calculate_score_(sim_matrix)
        top_sents = self.ranked_sentences_(sents_lst, scores, n=top_n)
        return top_sents

if __name__ == '__main__':
    news = NateNews(data_dir='./natenews_data/20220301.csv')
    # news = News()
    docs, topics = news.load_data()
    textrank = TextRank()

    ##
    idx = 6
    print(type(textrank.predict(docs[idx])))
    print(type(textrank.predict(docs[idx])[0]))
    # for sent in textrank.predict(docs[idx]):
    #     print(sent)
    # print('topic: ', topics[idx])
    #
    # for sent in kss.split_sentences(docs[idx]):
    #     print(sent)

    ##
#     a = kss.split_sentences(docs[1])
#     for sen in a:
#         print(sen)
#
#     ##
#     textrank = TextRank()
#     sentence_embeddings = textrank.embedding_model.encode(a)
#
#     ##
#     sim_matrix = textrank.similarity_matrix_(sentence_embeddings)
#
#     ##
#     scores = textrank.calculate_score(sim_matrix)
#
#     ##
#     top_sents = textrank.ranked_sentences(a, scores, n=3)
#
# ##
#     for sent in top_sents:
#         print(sent)
