from typing import *
from keybert import KeyBERT
from summarize import TextRank, KeySentence
from load_dataset import *
import warnings
from tqdm import tqdm
import numpy as np
import kss
from preprocess import CustomTokenizer
from sklearn.feature_extraction.text import CountVectorizer
from bareunpy import Tagger
import time
from sentence_transformers import SentenceTransformer

class NewsModel:
    """
    최종 키워드와 핵심문장 예측 클래스

    ex)
        model_path = "./ko-sbert-natenews"
    word_model = KeyBERT(model_path=model_path)
    textrank_model = TextRank(model_path=model_path)
    keysent_model = KeySentence(model_path=model_path)

    """
    def __init__(self, tagger: Tagger, model_path: str = 'sinjy1203/ko-sbert-natenews',
                 user_words_path: str = './user_words'):
        """
        Args:
            tagger: 키워드 추출에 사용할 형태소분석기
            model_path: huggingface hub에 있는 finetuning한 sbert model
            user_words_path: 사용자 사전 위치
        """
        self.model = SentenceTransformer(model_path)
        self.word_model = KeyBERT(self.model, tagger=tagger, user_words_path=user_words_path)
        self.keysent_model = KeySentence(self.model)

    def predict(self, doc: str, title: str, word_top_n: int = 5, sent_top_n: int = 1,
                title_w: float = 0.5, diversity: float = 0.0) -> Tuple[List[str], List[str]]:
        """
        Args:
            doc: 뉴스본문 한개
            title: 뉴스제목 한개
            word_top_n: 핵심키워드 개수
            sent_top_n: 핵심문장 개수
            title_w: 뉴스의 임베딩 값을 구할 때 title의 가중치
            diversity: 핵심문장이나 키워드들 간에 다양성

        Return:
            keywords: 예측한 word_top_n개 키워드들
            keysent: 예측한 핵심문장
        """
        doc = re.sub('/사진=', '', doc)
        doc = ' ' + doc
        doc = re.sub(' [가-힣]{2,3} 기자| [가-힣]{2,3} 특파원', '', doc)
        doc = re.sub('=', '', doc)
        doc_embedding = self.model.encode([doc, title])
        keywords = self.word_model.predict(doc_embedding, doc, top_n=word_top_n, title_w=title_w,
                                           diversity=diversity)
        keysent = self.keysent_model.predict(doc_embedding, doc, top_n=sent_top_n, title_w=title_w,
                                             diversity=diversity)

        return keywords, keysent


##
if __name__ == '__main__':
    # warnings.filterwarnings('ignore')
    # news = NateNews()
    # df = news.load_data()
    #
    # ##
    # # title = '복지부 "유독성 높은 번개탄 생산금지, 자살예방 효과 있어"'
    # tagger = Tagger('koba-MO2S2DI-MJDUZUA-XLVQTHI-MOMZA6A')
    # model = NewsModel(tagger=tagger, model_path='bongsoo/kpf-sbert-v1.1')
    #
    # ##
    # st = time.time()
    # keywords, keysent = model.predict(content, title, word_top_n=20,
    #                                   sent_top_n=3, title_w=0.5, diversity=0)
    # print(keysent)
    # print(len(keysent))
    # print(time.time() - st)
    #
    # ##
    # tokenizer = CustomTokenizer(tagger=tagger)
    # a = set(tokenizer(df.loc[202, 'contents']))

    ##
    import sys
    sys.path.append('C:/Users/011/sinjy1203/NateNews/crawl')
    from preprocessing import text_cleaning
    from bs4 import BeautifulSoup as bs

    import requests

    ##
    req = requests.get('https://sports.news.nate.com/view/20230203n10587')
    article = bs(req.text, 'html.parser')
    content = article.find('div', {'id': 'articleContetns'})
    content = text_cleaning(content)[0]
    # print(content)

    ##
    title = article.find('h3', {'class': 'viewTite'})
    title = title.text

    ##
    tagger = Tagger('koba-MO2S2DI-MJDUZUA-XLVQTHI-MOMZA6A')
    model = NewsModel(tagger=tagger, model_path='bongsoo/kpf-sbert-v1.1')
    st = time.time()
    keywords, keysents = model.predict(content, title, word_top_n=5, sent_top_n=3)
    print(time.time()-st)

##
    print(keywords, keysents)
