from preprocess import CustomTokenizer
from konlpy.tag import Mecab
from sklearn.feature_extraction.text import CountVectorizer
from load_dataset import *
import warnings
import pandas as pd
# -*- coding: utf-8 -*-
warnings.filterwarnings('ignore')

tokenizer = CustomTokenizer(Mecab())
def keyword(doc):
    try:
        count = CountVectorizer(tokenizer=tokenizer, ngram_range=(1,1)).fit([doc])
    except ValueError:
        return []

    candidates = count.get_feature_names_out()
    return candidates

news = NateNews()
df = pd.read_csv('./natenews_data/keyword.csv', index_col=0)
# print(keyword(df.loc[0, 'contents']))
for i in range(0, 100):
    words = keyword(df.loc[i, 'contents'])
    total = []
    tmp = []
    for j, word in enumerate(words):
        tmp += [word]
        if j % 10 == 9:
            total += ["_".join(tmp)]
            tmp = []
    if tmp:
        total += ["_".join(tmp)]

    words = '\n'.join(total)
    df.loc[i, 'words'] = words
    df.loc[i, 'contents'] = '\n'.join(df.loc[i, 'contents'].split('. '))

cols = list(df.columns)
cols.remove('contents')
cols += ['contents']
df.loc[:100, cols].to_csv('./natenews_data/keyword_words.csv')

##
with open('./user_words/word_mapping.txt', 'r', encoding='UTF8') as f:
    a = list(map(lambda y: y.split(), list(set(map(lambda x: x.strip('\n').strip(), f.readlines())) - {''})))
    a = {a_[0]: a_[1] for a_ in a}


