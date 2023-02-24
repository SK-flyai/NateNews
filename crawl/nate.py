from get_keyword import keyword
from news_crawl import NateNews
from ranking import get_ranking

import os
import sys

# ML모듈 내의 predict에 접근하기 위해 경로 수정(접근성을 위해 상대경로를 이용)
path = 'C:/Users/013/Desktop/code/NateNews/ml'
sys.path.append(path)

from newspred import NewsModel
from bareunpy import Tagger

API_KEY = 'koba-6REWGFY-OPWE7ZI-TPNV3FQ-DCVQDKA' # 각자의 API키로 변경해주세요!

tagger = Tagger(API_KEY)
model = NewsModel(
    tagger=tagger, 
    model_path='bongsoo/kpf-sbert-v1.1', 
    user_words_path='C:/Users/013/Desktop/code/NateNews/ml/user_words',
)


def news_keyword(doc: str, title: str):
    """키워드 및 중요한 문장 리턴 받는 함수

    Args:
        doc (str): 뉴스 본문
        title (str): 뉴스 제목

    Returns:
        dict: 딕셔너리로 리턴, `ex_keyword.json` 파일 참고하기
    """    
    return keyword(model, doc, title)

def news_ranking():
    """오늘 기준 전날의 랭킹 뉴스들을 카테고리별로 추출
    
    Desc:
        [종합][시사][스포츠][정치][경제][사회][세계][IT/과학]
        'all', 'sisa', 'spo', 'pol', 'eco', 'soc', 'int', 'its'
        각 카테고리별로 20개씩 추출

    Returns:
        dict: 딕셔너리로 리턴, `ex_ranking.json` 파일 참고하기
    """    
    return get_ranking()

def news_info(url: str):
    """인풋으로 들어온 링크에 대해서 정보 리턴

    Args:
        url (str): 기사 주소

    Returns:
        dict: 딕셔너리로 리턴
        {
            "title": "TITLE",
            "category": "CATEGORY",
            "press": "PRESS",
            "date": "DATE",
            "content": "CONTENT",
            "image": [
                {"IMG LINK" : "IMG CAPTION"}
            ]
        }
    """    
    nate = NateNews(url)
    return nate.get_dict()