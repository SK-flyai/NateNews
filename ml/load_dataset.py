import csv
import json
import random
from typing import Dict, List, Optional, Tuple
from pathlib import Path
from glob import glob
import re
import pandas as pd

import torch

class NaverSports:
    """
    네이버 뉴스 데이터셋에서 스포츠만
    directory: newsData/7/*.txt
    """

    def __init__(self, data_dir: list = './newsData/7', stop_words: list = []):
        """
        Args:
            data_dir:
            stopwords:
        """
        self.data_dir = Path(data_dir)
        self.stop_words = ['\xa0']
        self.stop_words += stop_words

    def load_txt_data_(self, path: str) -> str:
        """
        하나의 .txt 형식의 뉴스데이터를 가져와 string으로 변환

        Args:
            path: .txt file path

        Returns: string

        """
        with open(path, "r", encoding='UTF8') as f:
            strings = f.readlines()
        strings = list(map(lambda s: s.strip(), strings))  # 앞뒤 공백제거
        strings = list(filter(lambda s: s != '', strings))  # 빈 문자열 제거
        doc = ' '.join(strings)
        return doc

    def comb_stopwords_(self, x: str) -> Tuple[str, str]:
        """
        문자열에서 불용어 제거

        Args:
            x: string

        Returns:

        """
        if self.stopwords:
            x = re.sub('|'.join(self.stop_words), ' ', x)
            # x = x.encode('utf-8', 'backslashreplace').decode().replace("\\", "")
            # x = re.sub(r"\\", '', x)
            # x = x.replace('\\', '')
            x, y = self.crop_article_(x)
            return x, y
        return x

    def crop_article_(self, data: str) -> Tuple[str, str]:
        """기사에서 불필요한 내용 제거

        Args:
            data(str): df['content'], 뉴스의 원본 기사내용

        Returns:
            str, str: 본문 내용, 제목
        """
        data = re.split('[▶☞ⓒ]', data)[0]  # remove related news that come at the end of article
        # print(re.split('[TAB]', data))
        topic, data = re.split('\t', data)
        data = re.sub('[가-힣]{2,3} 기자', '', data)  # remove reporter name information
        data = re.sub('[가-힣]{2,3}뉴스', '', data)  # remove news name info
        data = re.sub("[\(\[].*?[\)\]]", "", data)  # remove text surrounded by brackets
        # data = re.sub('([a-zA-Z])+', '', data)  # remove alphanumerical characters
        data = re.sub('[-=+,#/·“”‘’:^$@*■\"※~&%ㆍ』\\‘|\(\)\[\]\<\>`\'…《\》\n\t]+', '',
                      data)  # remove special characters
        data = re.sub('([ㄱ-ㅎㅏ-ㅣ]+)', '', data)  # remove Korean consonants and vowels
        data = data.strip()

        return data, topic

    def load_data(self, stopwords: bool = True) -> List[str]:
        """
        메인 함수부분
        뉴스데이터셋을 불러와 불용어를 제거하고 약간의 전처리 후
        각 뉴스가 string인 리스트로 리턴

        Args:
            stopwords: 불용어 사용할지 안할지

        Returns: 여러 뉴스데이터 문자열 리스트

        """
        self.stopwords = stopwords

        paths = list(self.data_dir.glob('*.txt'))
        docs = []
        for path in paths:
            loader_fn = self.load_txt_data_
            doc = loader_fn(path)

            docs += [doc]
        self.ord_docs = docs
        x, y = [], []
        for doc in docs:
            x_, y_ = self.comb_stopwords_(doc)
            x += [x_]
            y += [y_]

        return x, y



class NaverNews:
    """
    네이버 뉴스 데이터셋
    category: 정치(0), 경제(1), 사회(2), 생활/문화(3), 세계(4), 기술/IT(5), 연예(6), 스포츠(7)
    directory: newsData/category/*.txt
    """

    def __init__(self, data_dir: list = './newsData', custom_symbols: list = []):
        """
        Args:
            data_dir: 데이터 디렉토리
            custom_symbols: 커스텀으로 제외시킬 이상한 기호들 (결과 보면서 구축 )
        """
        self.data_dir = Path(data_dir)
        self.custom_symbols = ['\xa0'] + custom_symbols

    def load_txt_data_(self, path: str) -> str:
        """
        하나의 .txt 형식의 뉴스데이터를 가져와 string으로 변환

        Args:
            path: .txt file path

        Returns: string

        """
        with open(path, "r", encoding='UTF8') as f:
            strings = f.readlines()
        strings = list(map(lambda s: s.strip(), strings))  # 앞뒤 공백제거
        strings = list(filter(lambda s: s != '', strings))  # 빈 문자열 제거
        doc = ' '.join(strings)
        return doc

    def preprocess_(self, x: str) -> Tuple[str, str]:
        """
        문자열에서 이상한 기호들이랑 앞 뒤 자르고 본문이랑 제목 분리하기

        Args:
            x: 뉴스 내용

        Returns:
            str, str: 본문내용, 제목

        """
        x = re.sub('|'.join(self.custom_symbols), '', x) # del custom symbols
        # x = x.encode('utf-8', 'backslashreplace').decode().replace("\\", "")
        # x = re.sub(r"\\", '', x)
        # x = x.replace('\\', '')
        x, y = self.crop_article_(x) # 전처리 함수 사용
        return x, y

    def crop_article_(self, data: str) -> Tuple[str, str]:
        """기사에서 불필요한 내용 제거

        Args:
            data(str): df['content'], 뉴스의 원본 기사내용

        Returns:
            str, str: 본문내용, 제목
        """
        data = re.split('[▶☞ⓒ]', data)[0]  # remove related news that come at the end of article
        topic, data = re.split('\t', data) # 제목과 본문내용 분리
        data = re.sub('[가-힣]{2,3} 기자', '', data)  # remove reporter name information
        data = re.sub('[가-힣]{2,3}뉴스', '', data)  # remove news name info
        data = re.sub("[【\(\[].*?[\)\]】]", "", data)  # remove text surrounded by brackets
        # data = re.sub('([a-zA-Z])+', '', data)  # remove alphanumerical characters
        data = re.sub('[-=+,#/·“”‘’:^$@*■\"※~&%ㆍ』\\‘|\(\)\[\]\<\>`\'…《\》\n\t]+', '',
                      data)  # remove special characters
        data = re.sub('([ㄱ-ㅎㅏ-ㅣ]+)', '', data)  # remove Korean consonants and vowels
        data = data.strip()

        return data, topic

    def load_data(self) -> Tuple[list, list, list]:
        """
        메인 함수부분
        뉴스데이터셋을 불러와 불용어를 제거하고 약간의 전처리 후
        각 뉴스가 string인 리스트로 리턴

        Returns:
            contents: 뉴스기사 본문들 리스트
            titles: 뉴스기사 제목들 리스트
            categories: 뉴스기사 카테고리들 리스트

        """

        paths = list(self.data_dir.glob('*/*.txt'))
        categories = []
        contents, titles = [], []
        for path in paths:
            loader_fn = self.load_txt_data_
            doc = loader_fn(path)
            category = int(path.parts[-2])
            content, title = self.preprocess_(doc)

            if len(content) < 10:
                continue
            contents += [content]
            titles += [title]
            categories += [category]

        return contents, titles, categories

    def csv_data(self, output_data_dir: str = './newsData/Naver.csv') -> pd.DataFrame:
        """
        뉴스기사 본문내용들과 제목들 그리고 카테고리들을 csv로 저장하고
        dataframe으로 리턴

        args:
            output_data_dir: 저장시킬 경로, None이면 저장안함

        Returns:
              dataframe형태
              columns: 'contents', 'titles', 'categories'

        """
        contents, titles, categories = self.load_data()
        df = pd.DataFrame(
            {
                'contents': contents,
                'titles': titles,
                'categories': categories
            }
        )
        if output_data_dir is not None:
            df.to_csv(output_data_dir)

        return df


class NateNews:
    """
    네이트 뉴스 데이터셋
    네이트 데이터셋을 읽어서 약간의 전처리
    directory: natenews_data/20230212_100.csv
    """

    def __init__(self, data_dir: str = './natenews_data/20230212_100.csv',
                 custom_symbols: list = []):
        """
        Args:
            data_dir: 데이터 디렉토리
            custom_symbols: 커스텀으로 제외시킬 이상한 기호들 (결과 보면서 구축 )
        """
        self.data_dir = Path(data_dir)
        self.custom_symbols = ['\xa0'] + custom_symbols

    def preprocess_(self, x: str) -> str:
        """
        문자열에서 이상한 기호들이랑 앞 뒤 자르고 본문이랑 제목 분리하기

        Args:
            x: 뉴스 내용

        Returns:
            str: 본문내용

        """
        x = re.sub('|'.join(self.custom_symbols), '', x) # del custom symbols
        # x = x.encode('utf-8', 'backslashreplace').decode().replace("\\", "")
        # x = re.sub(r"\\", '', x)
        # x = x.replace('\\', '')
        x = self.crop_article_(x) # 전처리 함수 사용
        return x

    def crop_article_(self, data: str) -> str:
        """기사에서 불필요한 내용 제거

        Args:
            data(str): df['content'], 뉴스의 원본 기사내용

        Returns:
            str: 본문내용
        """
        data = re.split('[▶☞ⓒ]', data)[0]  # remove related news that come at the end of article
        data = re.sub('[가-힣]{2,3} 기자', '', data)  # remove reporter name information
        data = re.sub('[가-힣]{2,3}뉴스', '', data)  # remove news name info
        data = re.sub("[【\(\[].*?[\)\]】]", "", data)  # remove text surrounded by brackets
        # data = re.sub('([a-zA-Z])+', '', data)  # remove alphanumerical characters
        data = re.sub('[-=+#/·“”‘’:^$@*■\"※~&%ㆍ』\\‘|\(\)\[\]\<\>`\'…《\》\n\t]+', ' ',
                      data)  # remove special characters
        data = re.sub('[→~]', '에서 ', data)
        data = re.sub(' +', ' ', data)
        data = re.sub('([ㄱ-ㅎㅏ-ㅣ]+)', '', data)  # remove Korean consonants and vowels
        data = data.strip()

        return data

    def crop_tail(self, data: str) -> str:
        """
        뒤에 의미없는 내용 제거
        """
        data = data.split('\n\n')
        for i, sent in enumerate(data):
            if len(sent) <= 10 and i > 4:
                break
        return ' '.join(data[:i])

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
        df['contents'] = df['contents'].apply(self.crop_tail)
        df['contents'] = df['contents'].apply(self.preprocess_)
        df['titles'] = df['titles'].apply(self.preprocess_)
        df.drop(df[df['contents'].apply(len) < 10].index, inplace=True)
        # for path in paths:
        #     loader_fn = self.load_txt_data_
        #     doc = loader_fn(path)
        #     category = int(path.parts[-2])
        #     content, title = self.preprocess_(doc)
        #
        #     if len(content) < 10:
        #         continue
        #     contents += [content]
        #     titles += [title]
        #     categories += [category]

        return df



##
if __name__ == '__main__':
    # news = NateNews(data_dir='./natenews_data/20220301.csv')
    # news = NaverNews(custom_symbols=[])

    # contents, titles, categories = news.load_data()
    # df = news.csv_data()
    ord_df = pd.read_csv('./natenews_data/20230212_100.csv', index_col=0)
    # df = df.rename(columns={'category': 'categories'})
    # df.to_csv('./natenews_data/20230212_100.csv')

    ##
    # print(ord_df[len(ord_df['contents']) < 10])
    print(ord_df['contents'].apply(len) < 10)

    ##
    news = NateNews()
    df = news.load_data()

    ##
    df_ = pd.DataFrame({
        'titles': ord_df['titles'],
        'titles_': df['titles'],
        'contents': ord_df['contents'],
        'contents_': df['contents']
    })
    df_.to_csv('./natenews_data/preprocess.csv')

    ##
    re.sub('[-=+,#/·“”‘’:^$@*■\"※~&%ㆍ』\\‘|\(\)\[\]\<\>`\'…《\》\n\t]+', '', '...')
