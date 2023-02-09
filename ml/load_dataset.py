import csv
import json
import random
from typing import Dict, List, Optional, Tuple
from pathlib import Path
from glob import glob
import re
import pandas as pd

import torch

class News:
    """
    네이버 뉴스 데이터셋
    category: 정치(0), 경제(1), 사회(2), 생활/문화(3), 세계(4), 기술/IT(5), 연예(6), 스포츠(7)
    directory: newsData/category_idx/*.txt
    """
    def __init__(self, data_dir: list = './newsData', stopwords: list = []):
        """
        Args:
            data_dir:
            stopwords:
        """
        self.data_dir = Path(data_dir)
        self.stop_words = ['\xa0', '\t']
        self.stop_words += stopwords
        self.idx2topic = ['정치', '경제', '사회', '생활/문화', '세계', '기술/IT', '연예', '스포츠']

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
        strings = list(filter(lambda s: s != '', strings)) # 빈 문자열 제거
        doc = ' '.join(strings)
        return doc
    
    def comb_stopwords_(self, x: str) -> str:
        """
        문자열에서 불용어 제거

        Args:
            x: string

        Returns:

        """
        if self.stopwords:
            x = re.sub('|'.join(self.stop_words), ' ', x)
            x = x.encode('utf-8', 'backslashreplace').decode().replace("\\", "")
            # x = re.sub(r"\\", '', x)
            # x = x.replace('\\', '')
            x = self.crop_article_(x)
        return x

    def crop_article_(self, data: str) -> str:
        """기사에서 불필요한 내용 제거

        Args:
            data(str): df['content'], 뉴스의 원본 기사내용

        Returns:
            str: df['new_content'], preprocessed 기사내용
        """
        data = re.split('[▶☞ⓒ]', data)[0]  # remove related news that come at the end of article
        data = re.sub('[가-힣]{2,3} 기자', '', data)  # remove reporter name information
        data = re.sub('[가-힣]{2,3}뉴스', '', data)  # remove news name info
        data = re.sub("[\(\[].*?[\)\]]", "", data)  # remove text surrounded by brackets
        # data = re.sub('([a-zA-Z])+', '', data)  # remove alphanumerical characters
        data = re.sub('[-=+,#/·“”‘’:^$@*■\"※~&%ㆍ』\\‘|\(\)\[\]\<\>`\'…《\》\n\t]+', '',
                      data)  # remove special characters
        data = re.sub('([ㄱ-ㅎㅏ-ㅣ]+)', '', data)  # remove Korean consonants and vowels
        data = data.strip()

        return data

    def load_data(self, stopwords: bool = True) -> Tuple[list, list]:
        """
        메인 함수부분
        뉴스데이터셋을 불러와 불용어를 제거하고 약간의 전처리 후
        각 뉴스가 string인 리스트로 리턴

        Args:
            stopwords: 불용어 사용할지 안할지

        Returns: 여러 뉴스데이터 문자열 리스트

        """
        self.stopwords = stopwords
        paths = list(self.data_dir.glob('*/*.txt'))
        docs, topics = [], []
        for path in paths:
            loader_fn = self.load_txt_data_
            topic = int(path.parts[-2])
            doc = loader_fn(path)

            topics += [topic]
            docs += [doc]
        self.ord_docs = docs

        docs = list(map(self.comb_stopwords_, docs))

        return docs, topics


class NateNews:
    """
    네이트에서 크롤링한 뉴스 데이터셋
    directory: natenews_data/크롤링날짜.csv
    """
    def __init__(self, data_dir: str, stopwords: list = []):
        """
        Args:
            data_dir:
            stopwords: 사용자 정의 불용어

        self.df:
            DataFrame
            column: title, category, press, date, content, url
        """
        self.data_dir = Path(data_dir)
        self.stop_words = ['\xa0', '\t', '\n']
        self.stop_words += stopwords
        self.df = pd.read_csv(data_dir)
        self.df['new_content'] = self.df['content'].apply(self.crop_article_)

    def crop_article_(self, data: str) -> str:
        """기사에서 불필요한 내용 제거

        Args:
            data(str): df['content'], 뉴스의 원본 기사내용

        Returns:
            str: df['new_content'], preprocessed 기사내용
        """
        data = re.split('[▶☞ⓒ]', data)[0]  # remove related news that come at the end of article
        data = re.sub('[가-힣]{2,3} 기자', '', data)  # remove reporter name information
        data = re.sub('[가-힣]{2,3}뉴스', '', data)  # remove news name info
        data = re.sub("[\(\[].*?[\)\]]", "", data)  # remove text surrounded by brackets
        # data = re.sub('([a-zA-Z])+', '', data)  # remove alphanumerical characters
        data = re.sub('[-=+,#/·“”‘’:^$@*■\"※~&%ㆍ』\\‘|\(\)\[\]\<\>`\'…《\》\n\t]+', '',
                      data)  # remove special characters
        data = re.sub('([ㄱ-ㅎㅏ-ㅣ]+)', '', data)  # remove Korean consonants and vowels
        data = data.strip()

        return data

    def comb_stopwords_(self, x: str) -> str:
        """
        불용어 제거
        Args:
            x(string): 뉴스 기사내용

        Returns:
            str: 불용어 제거된 기사 내용
        """
        if self.stopwords:
            x = re.sub('|'.join(self.stop_words), ' ', x)
            x = x.encode('utf-8', 'backslashreplace').decode().replace("\\", "").strip()
            # x = re.sub(r"\\", '', x)
            # x = x.replace('\\', '')
        return x

    def load_data(self, stopwords: bool = True) -> Tuple[list, list]:
        """
        메인 함수부분
        뉴스데이터셋을 불러와 불용어를 제거하고 약간의 전처리 후
        각 뉴스가 string인 리스트로 리턴
        Args:
            stopwords: 사용자 정의 불용어

        Returns:
            docs(list): df의 new_content 부분 (전처리된 뉴스내용)
            topics(list): df의 title 부분

        """
        self.stopwords = stopwords
        docs = list(self.df['new_content'])
        docs = list(map(self.comb_stopwords_, docs))
        topics = list(self.df['title'])
        return docs, topics


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
            str: df['new_content'], preprocessed 기사내용
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
    네이버 뉴스 데이터셋에서 스포츠만
    category: 정치(0), 경제(1), 사회(2), 생활/문화(3), 세계(4), 기술/IT(5), 연예(6), 스포츠(7)
    directory: newsData/category/*.txt
    """

    def __init__(self, data_dir: list = './newsData', stop_words: list = []):
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
            str: df['new_content'], preprocessed 기사내용
        """
        data = re.split('[▶☞ⓒ]', data)[0]  # remove related news that come at the end of article
        topic, data = re.split('\t', data)
        data = re.sub('[가-힣]{2,3} 기자', '', data)  # remove reporter name information
        data = re.sub('[가-힣]{2,3}뉴스', '', data)  # remove news name info
        data = re.sub("[【\(\[].*?[\)\]】]", "", data)  # remove text surrounded by brackets
        # data = re.sub('([a-zA-Z])+', '', data)  # remove alphanumerical characters
        data = re.sub('[-=+,#/·“”‘’:^$@*■\"※~&%ㆍ』\\‘|\(\)\[\]\<\>`\'…《\》\n\t]+', '',
                      data)  # remove special characters
        data = re.sub('([ㄱ-ㅎㅏ-ㅣ]+)', '', data)  # remove Korean consonants and vowels
        data = data.strip()

        return data, topic

    def load_data(self, stopwords: bool = True) -> Tuple[list, list, list]:
        """
        메인 함수부분
        뉴스데이터셋을 불러와 불용어를 제거하고 약간의 전처리 후
        각 뉴스가 string인 리스트로 리턴

        Args:
            stopwords: 불용어 사용할지 안할지

        Returns: 여러 뉴스데이터 문자열 리스트

        """
        self.stopwords = stopwords

        paths = list(self.data_dir.glob('*/*.txt'))
        docs = []
        categories = []
        for path in paths:
            loader_fn = self.load_txt_data_
            doc = loader_fn(path)
            category = int(path.parts[-2])

            categories += [category]
            docs += [doc]
        self.ord_docs = docs
        contents, titles = [], []
        for doc in docs:
            content, title = self.comb_stopwords_(doc)
            contents += [content]
            titles += [title]

        return contents, titles, categories

##
if __name__ == '__main__':
    # news = NateNews(data_dir='./natenews_data/20220301.csv')
    news = NaverNews()

    contents, titles, categories = news.load_data()

    ##
    df = pd.DataFrame(
        {
            'contents': contents,
            'titles': titles,
            'categories': categories
        }
    )

    ##
    df.to_csv('./newsData/Naver.csv')

    ##
    df = pd.read_csv('./newsData/Naver.csv')
