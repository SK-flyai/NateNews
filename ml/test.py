import pandas as pd

df_1 = pd.read_csv('./natenews_data/keyword_words.csv', index_col=0)
df_2 = pd.read_csv('./natenews_data/keyword_words_withtitle.csv', index_col=0)

##
df = pd.DataFrame()
df['titles'] = df_1['titles']
df['keywords'] = df_1['keywords']
df['keywords_withtitle'] = df_2['keywords']
# df['sents'] = df_1['keysentence']
# df['sents_kpf'] = df_2['keysentence']
df['contents'] = df_1['contents']

df.to_csv('./natenews_data/keywords_withtitle.csv')

##
df = pd.read_csv('./natenews_data/bigkinds_bareun.csv', index_col=0)

##
df.to_csv('./natenews_data/bigkinds_bareun_.csv', encoding='utf-8')

