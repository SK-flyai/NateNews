from tqdm import tqdm
from sklearn.feature_extraction.text import CountVectorizer
from konlpy.tag import Mecab
from bertopic import BERTopic
from pathlib import Path
from load_dataset import *
from sentence_transformers import SentenceTransformer, util
import numpy as np
from sklearn.cluster import KMeans
from umap import UMAP
from hdbscan import HDBSCAN
import time

class CustomTokenizer:
    def __init__(self, tagger, tag):
        self.tagger = tagger
        self.tag = tag

    def __call__(self, sent):
        if self.tag == 'nouns':
            word_tokens = self.tagger.nouns(sent)
        elif self.tag == 'morphs':
            word_tokens = self.tagger.morphs(sent)
        elif self.tag == 'NNP':
            word_tokens = list(map(lambda x: x[0], filter(lambda x: x[1] == 'NNP', self.tagger.pos(sent))))
        else:
            raise Exception('keyerror')
        result = [word for word in word_tokens if len(word) > 1]
        return result

class TopicExtraction:
    def __init__(self, tag='NNP', ngram_range=(1,1), nr_topics="auto"):
        custom_tokenizer = CustomTokenizer(Mecab(), tag=tag)
        embedding_model = SentenceTransformer("jhgan/ko-sbert-nli")
        vectorizer_model = CountVectorizer(tokenizer=custom_tokenizer, ngram_range=ngram_range)
        cluster_model = HDBSCAN(metric='euclidean', cluster_selection_method='eom', prediction_data=True)
        self.model = BERTopic(embedding_model=embedding_model, vectorizer_model=vectorizer_model, nr_topics=nr_topics, hdbscan_model=cluster_model)

    def fit(self, docs):
        self.model.fit(docs)

    def predict(self, docs):
        topics, probs = self.model.transform(docs)

    def load(self, path='./model'):
        self.model = self.model.load(path)

    def save(self, path='./model'):
        self.model.save(path)

##
if __name__ == '__main__':
    news = NateNews(data_dir='./natenews_data/20220301.csv')
    docs, topics = news.load_data()

    ##
    st = time.time()
    model = TopicExtraction()
    model.fit(docs)
    print('걸린시간: ', time.time()-st)

    ##
    model.model.get_topic_info()