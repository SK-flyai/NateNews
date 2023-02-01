import csv
import json
import random
from typing import Dict, List, Optional, Tuple
from pathlib import Path
from glob import glob
import re
import pandas as pd

import torch

class Aihub:
    def __init__(self, data_dir, stopwords=[]):
        self.data_dir = Path(data_dir)
        self.stop_words = ["#@주소#", "#@이모티콘#", "#@이름#", "#@URL#", "#@소속#", "#@기타#",
            "#@전번#", "#@계정#", "#@url#", "#@번호#", "#@금융#", "#@신원#", "#@장소#", "#@시스템#사진#", 
            "#@시스템#동영상#", "#@시스템#기타#", "#@시스템#검색#", "#@시스템#지도#", "#@시스템#삭제#", 
            "#@시스템#파일#", "#@시스템#송금#", "#@시스템#"]
        self.stop_words += stopwords

    def load_json_data_(self, path: str):
        with open(path, encoding='UTF-8') as f:
            data = json.load(f)

        ids = []
        dialogues = []
        summaries = []
        for datum in data["data"]:
            ids.append(datum["header"]["dialogueInfo"]["dialogueID"])

            prev_speaker_id = None
            prev_line = ""
            utts = []
            for dialogue in datum["body"]["dialogue"]:
                utterance = dialogue["utterance"].strip()

                if dialogue["participantID"] == prev_speaker_id:
                    prev_line += " " + utterance
                else:
                    if prev_line:
                        utts.append(prev_line)
                    prev_line = utterance
                    prev_speaker_id = dialogue["participantID"]
            if prev_line:
                utts.append(prev_line)

            dialogues.append(utts)
            summaries.append(datum["body"].get("summary"))
        return ids, dialogues, summaries
    
    def comb_stopwords_(self, x):
        x = ' '.join(x)
        if self.stopwords:
            x = re.sub('|'.join(self.stop_words), '', x)
        return x

    def load_data(self, data_type, stopwords=True):
        self.stopwords = stopwords
        path_pattern = self.data_dir / data_type / '*.json'
        paths = glob(str(path_pattern))[:5]

        ids, dialogues, summaries, topics = [], [], [], []
        for path in paths:
            loader_fn = self.load_json_data_
            topic = Path(path).stem
            file_ids, file_dialogues, file_summaries = loader_fn(path)
            ids.extend(file_ids)
            topics += [topic]*len(file_ids)
            dialogues.extend(file_dialogues)
            summaries.extend(file_summaries)

        docs = list(map(self.comb_stopwords_, dialogues))
        
        return docs, summaries, topics


class News:
    def __init__(self, data_dir, stopwords=[]):
        self.data_dir = Path(data_dir)
        self.stop_words = ['\xa0', '\t']
        self.stop_words += stopwords
        self.idx2topic = ['정치', '경제', '사회', '생활/문화', '세계', '기술/IT', '연예', '스포츠']

    def load_json_data_(self, path: str):
        with open(path, encoding='UTF-8') as f:
            data = json.load(f)

        ids = []
        dialogues = []
        summaries = []
        for datum in data["data"]:
            ids.append(datum["header"]["dialogueInfo"]["dialogueID"])

            prev_speaker_id = None
            prev_line = ""
            utts = []
            for dialogue in datum["body"]["dialogue"]:
                utterance = dialogue["utterance"].strip()

                if dialogue["participantID"] == prev_speaker_id:
                    prev_line += " " + utterance
                else:
                    if prev_line:
                        utts.append(prev_line)
                    prev_line = utterance
                    prev_speaker_id = dialogue["participantID"]
            if prev_line:
                utts.append(prev_line)

            dialogues.append(utts)
            summaries.append(datum["body"].get("summary"))
        return ids, dialogues, summaries

    def load_txt_data_(self, path: str):
        with open(path, "r", encoding='UTF8') as f:
            strings = f.readlines()
        strings = list(map(lambda s: s.strip(), strings))
        strings = list(filter(lambda s: s != '', strings))
        doc = ' '.join(strings)
        return doc
    
    def comb_stopwords_(self, x):
        if self.stopwords:
            x = re.sub('|'.join(self.stop_words), ' ', x)
            x = x.encode('utf-8', 'backslashreplace').decode().replace("\\", "")
            # x = re.sub(r"\\", '', x)
            # x = x.replace('\\', '')
        return x

    def load_data(self, stopwords=True):
        self.stopwords = stopwords
        paths = list(self.data_dir.glob('*/*.txt'))
        docs, topics = [], []
        for path in paths:
            loader_fn = self.load_txt_data_
            topic = int(path.parts[-2])
            doc = loader_fn(path)

            topics += [topic]
            docs += [doc]

        docs = list(map(self.comb_stopwords_, docs))

        return docs, topics


class NateNews:
    def __init__(self, data_dir, stopwords=[]):
        self.data_dir = Path(data_dir)
        self.stop_words = ['\xa0', '\t', '\n']
        self.stop_words += stopwords
        self.df = pd.read_csv(data_dir)
        self.df['new_content'] = self.df['content'].apply(self.crop_article_)

    def crop_article_(self, data):
        """Remove unnecessary text from an article

        Args:
            data(str): Raw text of news article.

        Returns:
            str: Preprocessed text of news article.
        """
        data = re.split('[▶☞ⓒ]', data)[0]  # remove related news that come at the end of article
        data = re.sub('[가-힣]{2,3} 기자', '', data)  # remove reporter name information
        data = re.sub('[가-힣]{2,3}뉴스', '', data)
        data = re.sub("[\(\[].*?[\)\]]", "", data)  # remove text surrounded by brackets
        data = re.sub('([a-zA-Z])+', '', data)  # remove alphanumerical characters
        data = re.sub('[-=+,#/·“”‘’\?:^$.@*■\"※~&%ㆍ!』\\‘|\(\)\[\]\<\>`\'…《\》\n\t]+', ' ',
                      data)  # remove special characters
        data = re.sub('([ㄱ-ㅎㅏ-ㅣ]+)', '', data)  # remove Korean consonants and vowels
        data = data.strip()

        return data

    def load_txt_data_(self, path: str):
        with open(path, "r", encoding='UTF8') as f:
            strings = f.readlines()
        strings = list(map(lambda s: s.strip(), strings))
        strings = list(filter(lambda s: s != '', strings))
        doc = ' '.join(strings)
        return doc

    def comb_stopwords_(self, x):
        if self.stopwords:
            x = re.sub('|'.join(self.stop_words), ' ', x)
            x = x.encode('utf-8', 'backslashreplace').decode().replace("\\", "").strip()
            # x = re.sub(r"\\", '', x)
            # x = x.replace('\\', '')
        return x

    def load_data(self, stopwords=True):
        self.stopwords = stopwords
        docs = list(self.df['new_content'])
        docs = list(map(self.comb_stopwords_, docs))
        topics = list(self.df['title'])
        return docs, topics

##
if __name__ == '__main__':
    news = NateNews(data_dir='./natenews_data/20220301.csv')

    docs, topics = news.load_data()

    ##
    for idx in news.df.index:
        if '한국공학한림원' in news.df.loc[idx, 'new_content']:
            break
    new_doc, doc = news.df.loc[idx, 'new_content'], news.df.loc[idx, 'content']
    # new_df = news.df['한국공학한림원' in news.df['new_content']]

    ##

    for doc in docs:
        if '한국공학한림원' in doc:
            break

    # print(docs, len(topics))

    # ids, dialogues, summaries = [], [], []
    # for path in paths:
    #     loader_fn = load_json_data
    #
    #     file_ids, file_dialogues, file_summaries = loader_fn(path)
    #     ids.extend(file_ids)
    #     dialogues.extend(file_dialogues)
    #     summaries.extend(file_summaries)
    #
    # dialogues[0]
