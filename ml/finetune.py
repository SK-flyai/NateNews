##
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
news = NaverSports()
docs, topics = news.load_data()

##
train_dataset = []
idxs = list(range(len(docs)))
for i in idxs:
    doc, topic = docs[i], topics[i]
    train_dataset += [InputExample(texts=[doc, topic], label=1.0)]
    new_idxs = idxs[:i] + idxs[i+1:]
    train_dataset += [InputExample(texts=[doc, topics[random.choice(new_idxs)]], label=0.0)]
    train_dataset += [InputExample(texts=[doc[random.choice(new_idxs)], topics], label=0.0)]

##
model = SentenceTransformer("jhgan/ko-sbert-nli")

##

train_dataloader = DataLoader(train_dataset, shuffle=True, batch_size=8)
train_loss = losses.CosineSimilarityLoss(model)
evaluator = evaluation.EmbeddingSimilarityEvaluator(docs, topics, scores=[1.0]*len(docs))

model.fit(train_objectives=[(train_dataloader, train_loss)], epochs=10)

##

