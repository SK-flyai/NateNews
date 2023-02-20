from keybert import KeyBERT
from summarize import TextRank, KeySentence
from load_dataset import *
import warnings
from tqdm import tqdm
import numpy as np
import kss
from preprocess import CustomTokenizer
from konlpy.tag import Mecab
from sklearn.feature_extraction.text import CountVectorizer

from newspred import NewsModel

def pred_keyword_sent(doc, word_top_n=10):
    keywords = word_model.predict(doc=doc, top_n=word_top_n)
    textrank_sent = textrank_model.predict(doc=doc, top_n=1)[0]
    keysent_sent = keysent_model.predict(doc=doc, top_n=1)[0]
    return keywords, textrank_sent, keysent_sent

def enter(sent, length=10):
    res = ''
    for j, c in enumerate(sent):
        res += c
        if j % length == length-1:
            res += '\n'
    return res

def words_(doc):
    # try:
    #     count = CountVectorizer(tokenizer=tokenizer, ngram_range=(1,1)).fit([doc])
    # except ValueError:
    #     return []
    #
    # candidates = count.get_feature_names_out()
    candidates = tokenizer(doc)
    return candidates

def words(doc):
    words = words_(doc)
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
    return words

if __name__ == '__main__':
    warnings.filterwarnings('ignore')

    tokenizer = CustomTokenizer(Mecab())

    pred_range = (0, 100)

    # model_path = "./ko-sbert-natenews"
    # word_model = KeyBERT(model_path=model_path)
    # textrank_model = TextRank(model_path=model_path)
    # keysent_model = KeySentence(model_path=model_path)
    model = NewsModel(model_path="./ko-sbert-natenews")

    news = NateNews()
    df = news.load_data()
    df = df.loc[pred_range[0]:pred_range[1]]

    for i in tqdm(range(*pred_range)):
        # keywords, textrank_sent, keysent_sent = pred_keyword_sent(df.loc[i, 'contents'])
        keywords, keysent_sent = model.predict(df.loc[i, 'contents'], word_top_n=10)
        keywords = "\n".join(keywords)
        # textrank_sent = enter(textrank_sent)
        keysent_sent = enter(keysent_sent)
        title = enter(df.loc[i, 'titles'])
        df.loc[i, 'keywords'] = keywords
        # df.loc[i, 'textrank'] = textrank_sent
        df.loc[i, 'keysentence'] = keysent_sent
        df.loc[i, 'titles'] = title
        df.loc[i, 'contents'] = '\n'.join(kss.split_sentences(df.loc[i, 'contents']))
        df.loc[i, 'words'] = words(df.loc[i, 'contents'])

    df[['titles', 'keywords', 'keysentence', 'contents']].to_csv('./natenews_data/keyword_sent.csv')

