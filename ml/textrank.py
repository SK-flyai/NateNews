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
    def __init__(self):
        self.embedding_model = SentenceTransformer("jhgan/ko-sbert-nli")

    def similarity_matrix_(self, sentence_embedding):
        return cosine_similarity(sentence_embedding, sentence_embedding)

    def calculate_score_(self, sim_matrix):
        nx_graph = nx.from_numpy_array(sim_matrix)
        scores = nx.pagerank(nx_graph)
        return scores

    def ranked_sentences_(self, sentences, scores, n=3):
        top_scores = sorted(((scores[i], s)
                             for i, s in enumerate(sentences)),
                            reverse=True)
        top_n_sentences = [sentence
                           for score, sentence in top_scores[:n]]
        return top_n_sentences

    def predict(self, doc, top_n=5):
        sents_lst = kss.split_sentences(doc)
        sent_embeddings = self.embedding_model.encode(sents_lst)
        sim_matrix = self.similarity_matrix_(sent_embeddings)
        scores = self.calculate_score_(sim_matrix)
        print(scores)
        top_sents = self.ranked_sentences_(sents_lst, scores, n=top_n)
        return top_sents

if __name__ == '__main__':
    news = NateNews(data_dir='./natenews_data/20220301.csv')
    # news = News()
    docs, topics = news.load_data()
    textrank = TextRank()

    ##
    idx = 6
    for sent in textrank.predict(docs[idx]):
        print(sent)
    print('topic: ', topics[idx])

    for sent in kss.split_sentences(docs[idx]):
        print(sent)

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
