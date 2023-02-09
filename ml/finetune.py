##
import os
from tqdm import tqdm
from konlpy.tag import Mecab
from pathlib import Path
from sklearn.feature_extraction.text import CountVectorizer
import itertools
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import warnings
import kss

from load_dataset import *
from preprocess import CustomTokenizer

from sentence_transformers import SentenceTransformer, InputExample, losses, evaluation
from torch.utils.data import DataLoader

## dataset
# news = NaverSports()
# docs, topics = news.load_data()

## load dataframe
df = pd.read_csv('./newsData/Naver.csv', index_col=0)

## make dataset
eval_sents1 = []
eval_sents2 = []
eval_scores = []

train_dataset = []
idxs = list(range(len(df)))
for i in idxs:
    content, title, category = df.loc[i, 'contents'], df.loc[i, 'titles'], df.loc[i, 'categories']
    train_dataset += [InputExample(texts=[content, title], label=1.0)]

    eval_sents1 += [content]
    eval_sents2 += [title]
    eval_scores += [1.0]

    new_idxs = list(df[df['categories'] != category].index)
    train_dataset += [InputExample(texts=[content, df.loc[random.choice(new_idxs), 'titles']], label=0.0)]
    eval_sents1 += [content]
    eval_sents2 += [df.loc[random.choice(new_idxs), 'titles']]
    eval_scores += [0.0]

    train_dataset += [InputExample(texts=[df.loc[random.choice(new_idxs), 'contents'], title], label=0.0)]
    eval_sents1 += [df.loc[random.choice(new_idxs), 'contents']]
    eval_sents2 += [title]
    eval_scores += [0.0]

##
# ##
# eval_sents1 = []
# eval_sents2 = []
# eval_scores = []

# train_dataset = []
# idxs = list(range(len(docs)))
# for i in idxs:
#     doc, topic = docs[i], topics[i]
#     train_dataset += [InputExample(texts=[doc, topic], label=1.0)]

#     eval_sents1 += [doc]
#     eval_sents2 += [topic]
#     eval_scores += [1.0]

#     new_idxs = idxs[:i] + idxs[i+1:]
#     train_dataset += [InputExample(texts=[doc, topics[random.choice(new_idxs)]], label=0.0)]
#     eval_sents1 += [doc]
#     eval_sents2 += [topics[random.choice(new_idxs)]]
#     eval_scores += [0.0]


#     train_dataset += [InputExample(texts=[doc[random.choice(new_idxs)], topics], label=0.0)]
#     eval_sents1 += [doc[random.choice(new_idxs)]]
#     eval_sents2 += [topic]
#     eval_scores += [0.0]

## load model
# model = SentenceTransformer("jhgan/ko-sbert-nli")
model = SentenceTransformer('./model')

## prepare before train
import shutil
try:
    shutil.rmtree('./model')
except FileNotFoundError:
    pass

train_dataloader = DataLoader(train_dataset, shuffle=True, batch_size=8)
train_loss = losses.CosineSimilarityLoss(model)
evaluator = evaluation.EmbeddingSimilarityEvaluator(eval_sents1, eval_sents2, eval_scores)

## train
model.fit(train_objectives=[(train_dataloader, train_loss)], epochs=10, evaluator=evaluator, warmup_steps=100,
          output_path='model')

## nli model evaluation
evaluator(model, output_path='model/eval')
