from preprocess import CustomTokenizer
from konlpy.tag import Mecab
from sklearn.feature_extraction.text import CountVectorizer
from load_dataset import *
import warnings
import pandas as pd
warnings.filterwarnings('ignore')

print(len('.박범계 더불어민주당 검찰독재정치탄압대책위원회 상임위원장이 1일 오전 서울 여의도 국회 로텐더홀에서 1인 시위를 하고 있다.2023.02.01. 공감언론 뉴시스가 독자 여러분의 소중한 제보를 기다립니다.뉴스 가치나 화제성이 있다고 판단되는 사진 또는 영상을 뉴시스 사진영상부로 보내주시면 적극 반영하겠습니다.'))


# tokenizer = CustomTokenizer(Mecab())
# def keyword(doc):
#     try:
#         count = CountVectorizer(tokenizer=tokenizer, ngram_range=(1,1)).fit([doc])
#     except ValueError:
#         return []
#
#     candidates = count.get_feature_names_out()
#     return candidates
#
# news = NateNews()
# df = pd.read_csv('./natenews_data/keyword.csv', index_col=0)
# # print(keyword(df.loc[0, 'contents']))
# for i in range(0, 100):
#     words = keyword(df.loc[i, 'contents'])
#     total = []
#     tmp = []
#     for j, word in enumerate(words):
#         tmp += [word]
#         if j % 10 == 9:
#             total += ["_".join(tmp)]
#             tmp = []
#     if tmp:
#         total += ["_".join(tmp)]
#
#     words = '\n'.join(total)
#     df.loc[i, 'words'] = words
#
# cols = list(df.columns)
# cols.remove('contents')
# cols += ['contents']
# df.loc[:100, cols].to_csv('./natenews_data/keyword_words.csv')


