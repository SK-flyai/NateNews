from get_keyword import keyword
from ranking import get_ranking

import os
import sys

# ML모듈 내의 predict에 접근하기 위해 경로 수정(접근성을 위해 상대경로를 이용)
path = 'C:/Users/013/Desktop/code/NateNews/ml'
sys.path.append(path)
print(path)

from newspred import NewsModel
from bareunpy import Tagger

API_KEY = 'koba-6REWGFY-OPWE7ZI-TPNV3FQ-DCVQDKA' # 각자의 API키로 변경해주세요!

tagger = Tagger(API_KEY)
model = NewsModel(tagger=tagger, model_path='sinjy1203/ko-sbert-natenews')


def news_keyword(doc: str, title: str):
    return keyword(model, doc, title)

def news_ranking():
    return get_ranking()