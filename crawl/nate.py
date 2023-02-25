from bareunpy import Tagger

from get_keyword import keyword
from ranking import get_ranking

import os
import sys

# ML모듈 내의 predict에 접근하기 위해 경로 수정(접근성을 위해 상대경로를 이용)
# path = './../ml'
path = 'C:/Users/012/Desktop/git/NateNews/ml'

sys.path.append(path)
print(path)

from newspred import NewsModel

API_KEY = 'koba-6REWGFY-OPWE7ZI-TPNV3FQ-DCVQDKA'  # 각자의 API키로 변경해주세요!

tagger = Tagger(API_KEY)
model = NewsModel(tagger=tagger, model_path='bongsoo/kpf-sbert-v1.1',
                  user_words_path='C:/Users/012/Desktop/git/NateNews/ml/user_words')
title = "This is title"
doc = "This is doc"


def news_keyword(doc: str, title: str):
    
    return keyword(model, doc, title)


def news_ranking():
    return get_ranking()

# if __name__ == '__main__':
#     news_keyword(doc, title)
#     news_ranking()
