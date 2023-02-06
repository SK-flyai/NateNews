from tqdm import tqdm
from sklearn.feature_extraction.text import CountVectorizer
from konlpy.tag import Mecab
from bertopic import BERTopic
from pathlib import Path
from sentence_transformers import SentenceTransformer, util
import numpy as np
from sklearn.cluster import KMeans
from umap import UMAP
from hdbscan import HDBSCAN
import time

from load_dataset import *
from preprocess import CustomTokenizer


class TopicExtraction:
    """
    뉴스 기사들을 bertopic을 이용해서 토픽을 추출한다.
    """
    def __init__(self, tag: str = 'NNP', ngram_range: Tuple[int, int] = (1,1),
                 nr_topics: str = "auto"):
        """
        Args:
            tag: 토픽 후보군 추출 방법
                nouns: 명사만 추출
                morphs: 모든 품사의 형태소 추출
                NNP: 고유명사만 추출
            ngram_range: 토픽 후보군 추출 범위
            nr_topics: 토픽 개수
        """
        custom_tokenizer = CustomTokenizer(Mecab(), tag=tag)
        embedding_model = SentenceTransformer("jhgan/ko-sbert-nli")
        vectorizer_model = CountVectorizer(tokenizer=custom_tokenizer, ngram_range=ngram_range)
        cluster_model = HDBSCAN(metric='euclidean', cluster_selection_method='eom', prediction_data=True)
        self.model = BERTopic(embedding_model=embedding_model, vectorizer_model=vectorizer_model, nr_topics=nr_topics, hdbscan_model=cluster_model)

    def fit(self, docs: List[str]):
        self.model.fit(docs)

    def predict(self, docs: List[str]):
        topics, probs = self.model.transform(docs)

    def load(self, path: str = './model'):
        self.model = self.model.load(path)

    def save(self, path: str = './model'):
        self.model.save(path)

##
if __name__ == '__main__':
    # news = NateNews(data_dir='./natenews_data/20220301.csv')
    news = News()
    docs, topics = news.load_data()

    ##
    st = time.time()
    model = TopicExtraction()
    model.fit(docs)
    print('걸린시간: ', time.time()-st)

    ##
    model.model.get_topic_info()