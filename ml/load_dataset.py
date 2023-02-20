import csv
import json
import random
from typing import Dict, List, Optional, Tuple
from pathlib import Path
from glob import glob
import re
import pandas as pd
import kss
import os

import torch

class NateNews:
    """
    네이트 뉴스 데이터셋
    네이트 데이터셋을 읽어서 약간의 전처리 후 pd.dataframe 리턴
    ex)
        news = NateNews(data_path)
        df = news.load_data()

    df.columns: 'titles'(제목), 'categories'(카테고리), 'press'(신문사), 'date'(날짜),
                'contents'(본문), 'url'(링크)
    """

    def __init__(self, data_dir: str = './natenews_data/20230212_100.csv',
                 custom_filter_words: str = './user_words/'):
        """
        Args:
            data_dir: dataframe path
        """
        self.data_dir = Path(data_dir)

    def preprocess_(self, data: str) -> str:
        """
        앱에 보여질 뉴스 본문내용의 전처리작업

        Args:
            data(str): df['contents'], 뉴스본문 하나의 기사내용

        Returns:
            str: 전처리 작업후의 뉴스본문 하나의 내용
        """
        data = re.sub('\[[^\]]*]', "", data) # [내용] 형태 없애기
        data = re.sub("\\'", "", data) # \' 제거
        data = data.strip().lstrip('\n') # 처음에 \n이 나올때 없애기
        # data = re.sub('[0-9]{4}\.[0-9]{2}\.[0-9]{2}', '', data) # 날짜 형식
        data = re.sub('\.* *\\n+', '. ', data) # 문장을 잘 나누기 위한 빌드업
        # data = re.sub('[가-힣]{2,3} 기자|[가-힣]{2,3} 특파원', '', data)  # remove reporter name information
        # data = re.sub('[가-힣]{2,3}뉴스', '', data)  # remove news name info
        data = re.sub('[=/]+', ' ', data) # 이상한 기호 삭제
        data = re.sub(' +', ' ', data) # 공백 여러개면 하나로
        data = data.strip() # 앞되 공백제거

        return data

    def crop_tail_(self, data: str) -> str:
        """
        *************일단 사용안함**************

        뒤에 의미없는 내용 제거
        """
        data = data.split('\n')
        data = list(filter(lambda x: x != '', data))
        idx = 0
        limit = int(len(data) * 0.75)
        for sent in data:
            if len(sent) <= 20 and idx >= limit:
                break
            idx += 1
        if idx < 5:
            return ''
        return '\n'.join(data[:idx])

    def load_data(self) -> pd.DataFrame:
        """
        뉴스데이터셋을 불러와 전처리후 dataframe 리턴

        Returns:
            df: pd.DataFrame
            df.columns: 'titles'(제목), 'categories'(카테고리), 'press'(신문사), 'date'(날짜),
                        'contents'(본문), 'url'(링크)

        """
        ext_name = os.path.splitext(self.data_dir)[1]
        if ext_name == '.csv':
            df = pd.read_csv(self.data_dir, index_col=0) # 원본 데이터셋 불러오기
        elif ext_name == '.xlsx':
            df = pd.read_excel(self.data_dir, index_col=0)
        else:
            raise Exception("data format error")
        df['contents'] = df['contents'].apply(self.preprocess_) # 각 뉴스 본문 전처리
        df['titles'] = df['titles'].apply(self.preprocess_) # 각 뉴스 제목 전처리
        df.drop(df[df['contents'].apply(len) < 300].index, inplace=True) # 뉴스내용이 작은 거 없애기
        df = df.reset_index(drop=True) # index reset

        return df



##
if __name__ == '__main__':
    news = NateNews(data_dir='20230212_100.xlsx')
    df = news.load_data()

    # ord_df = pd.read_csv('./natenews_data/20230212_100.csv', index_col=0)
    # f = lambda x: re.sub('\\n+', '\n', x)
    # a = ord_df['contents'].apply(f)
    # ord_df = ord_df.rename(columns={'content': 'contents', 'title': 'titles', 'category': 'categories'})
    # ord_df.to_csv('./natenews_data/20230212_100.csv')

    ##
    df = pd.read_excel('20230212_100.xlsx')

    ##
    news = NateNews()
    df = news.load_data()

    ##
    f = lambda x: re.sub('\\n+', '\n', x)
    df_ = pd.DataFrame({
        'titles': ord_df['titles'],
        'titles_': df['titles'],
        'contents': ord_df['contents'].apply(f),
        'contents_': df['contents']
    })
    df_.to_csv('./natenews_data/preprocess.csv')

    ##
    re.sub('[-=+,#/·“”‘’:^$@*■\"※~&%ㆍ』\\‘|\(\)\[\]\<\>`\'…《\》\n\t]+', '', '...')
