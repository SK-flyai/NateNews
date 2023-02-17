import csv
import json
import random
from typing import Dict, List, Optional, Tuple
from pathlib import Path
from glob import glob
import re
import pandas as pd
import kss

import torch

class NateNews:
    """
    네이트 뉴스 데이터셋
    네이트 데이터셋을 읽어서 약간의 전처리
    directory: natenews_data/20230212_100.csv
    """

    def __init__(self, data_dir: str = './natenews_data/20230212_100.csv',
                 custom_filter_words: str = './user_words/'):
        """
        Args:
            data_dir: 데이터 디렉토리
        """
        self.data_dir = Path(data_dir)

    def preprocess_(self, data: str) -> str:
        """기사에서 불필요한 내용 제거

        Args:
            data(str): df['content'], 뉴스의 원본 기사내용

        Returns:
            str: 본문내용
        """
        data = re.sub('\[[^\]]*]', "", data) # [내용] 형태 없애기
        data = re.sub("\\'", "", data)
        data = data.strip().lstrip('\n') # 처음에 \n이 나올때 없애기
        # match = re.search(' *\\n+ *', data)
        # if match:
        #     data = data[match.span()[1]:]
        # if data[0] == '\n':
        #     data = data[1:]
        # except:
        #     print(data)
        #     raise Exception('error')
        data = re.sub('[0-9]{4}\.[0-9]{2}\.[0-9]{2}', '', data) # 날짜 형식
        # data = re.sub('/', '', data)
        data = re.sub('\.* *\\n+', '. ', data) # '. '로 문장을 나누기위한 빌드업
        data = re.sub('[가-힣]{2,3} 기자|[가-힣]{2,3} 특파원', '', data)  # remove reporter name information
        data = re.sub('[가-힣]{2,3}뉴스', '', data)  # remove news name info
        data = re.sub('[=/]+', ' ', data)
        data = re.sub(' +', ' ', data) # 공백 여러개면 하나로
        # if data[0] == '.':
        #     data = data[1:]
        data = data.strip()

        return data

    def crop_tail_(self, data: str) -> str:
        """
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
        메인 함수부분
        뉴스데이터셋을 불러와 불용어를 제거하고 약간의 전처리 후
        각 뉴스가 string인 리스트로 리턴

        Returns:
            contents: 뉴스기사 본문들 리스트
            titles: 뉴스기사 제목들 리스트
            categories: 뉴스기사 카테고리들 리스트

        """

        df = pd.read_csv(self.data_dir, index_col=0)
        df['contents'] = df['contents'].apply(self.preprocess_)
        df['titles'] = df['titles'].apply(self.preprocess_)
        df.drop(df[df['contents'].apply(len) < 300].index, inplace=True)
        df = df.reset_index(drop=True)

        return df



##
if __name__ == '__main__':
    news = NateNews()
    df = news.load_data()

    # ord_df = pd.read_csv('./natenews_data/20230212_100.csv', index_col=0)
    # f = lambda x: re.sub('\\n+', '\n', x)
    # a = ord_df['contents'].apply(f)
    # ord_df = ord_df.rename(columns={'content': 'contents', 'title': 'titles', 'category': 'categories'})
    # ord_df.to_csv('./natenews_data/20230212_100.csv')

    ##
    # doc = df.loc[112, 'contents']
    # print([doc])
    # sents = kss.split_sentences(df.loc[112, 'contents'])
    # print(sents)

    ##
    contents = ord_df.loc[[1, 2, 3, 5, 6], 'contents']
    titles = ord_df.loc[[1, 2, 3, 5, 6], 'titles']
    idx = 0
    for title, content in zip(titles, contents):
        content = re.sub("\\n\\n", '\\n', content)
        with open(f'natenews_data/{idx}.txt', 'w') as f:
            f.write("<title>\n")
            f.write(title + "\n")
            f.write("\n")
            f.write("<content>\n")
            f.write(content + "\n")
        idx += 1

    ##
    # print(ord_df[len(ord_df['contents']) < 10])
    print(ord_df['contents'].apply(len) < 10)

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
