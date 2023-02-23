##
import pandas as pd

##

df_1 = pd.read_csv('./natenews_data/keyword_kpf_titlew0.0.csv', index_col=0)
df_2 = pd.read_csv('./natenews_data/keyword_kpf_titlew0.5.csv', index_col=0)
df_3 = pd.read_csv('./natenews_data/keyword_kpf_titlew1.0.csv', index_col=0)

##
df = pd.DataFrame()
df['titles'] = df_1['titles']
df['0.0'] = df_1['keywords']
df['0.5'] = df_2['keywords']
df['1.0'] = df_3['keywords']
# df['sents'] = df_1['keysentence']
# df['sents_kpf'] = df_2['keysentence']
df['contents'] = df_1['contents']

df.to_csv('./natenews_data/kpf_titlew.csv')

##
df_1 = pd.read_csv('./natenews_data/keyword_words_0.0title.csv', index_col=0)
df_2 = pd.read_csv('./natenews_data/keyword_words_0.25title.csv', index_col=0)
df_3 = pd.read_csv('./natenews_data/keyword_words_0.5title.csv', index_col=0)
df_4 = pd.read_csv('./natenews_data/keyword_words_0.75title.csv', index_col=0)
df_5 = pd.read_csv('./natenews_data/keyword_words_1.0title.csv', index_col=0)

##
df = pd.DataFrame()
df['titles'] = df_1['titles']
df['0.0'] = df_1['keywords']
df['0.25'] = df_2['keywords']
df['0.5'] = df_3['keywords']
df['0.75'] = df_4['keywords']
df['1.0'] = df_5['keywords']
df['contents'] = df_1['contents']

df.to_csv('./natenews_data/keywords_titlew.csv')

##
df_1 = pd.read_csv('./natenews_data/keyword_0.0title.csv', index_col=0)
df_2 = pd.read_csv('./natenews_data/keyword_0.5title.csv', index_col=0)
df_3 = pd.read_csv('./natenews_data/keyword_1.0title.csv', index_col=0)

##
df = pd.DataFrame()
df['titles'] = df_1['titles']
df['0.0'] = df_1['keywords']
df['0.5'] = df_2['keywords']
df['1.0'] = df_3['keywords']
df['contents'] = df_1['contents']

df.to_csv('./natenews_data/keyword_titlew.csv')
