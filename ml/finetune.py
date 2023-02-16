##
import os

import pandas as pd
from tqdm import tqdm
from pathlib import Path
from sklearn.feature_extraction.text import CountVectorizer
import itertools
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import warnings
import kss
import shutil

from load_dataset import *
from finetune import *

from sentence_transformers import SentenceTransformer, InputExample, losses, evaluation
from torch.utils.data import DataLoader

def dataset(df: pd.DataFrame) -> Tuple[List[InputExample], Tuple[List]]:
    """
    뉴스 데이터에서 sbert finetuning을 위한 데이터셋 생성
    label 1: 뉴스 본문과 해당 제목
    label 0: 뉴스 본문과 다른 카테고리 제목들 중 하나
    label 0: 뉴스 제목과 다른 카테고리 본문들 중 하나
    
    Return:
        training dataset
        validation dataset
    """

    train_dataset = []
    eval_sents1 = []
    eval_sents2 = []
    eval_scores = []

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
    eval_dataset = (eval_sents1, eval_sents2, eval_scores)

    return train_dataset, eval_dataset

def finetuning(train_dataset: List[InputExample], eval_dataset: Tuple[List],
               model_path: str = "jhgan/ko-sbert-nli", output_path: str = 'ko-sbert-navernews'):
    """
    sbert model finetuning
    
    Args:
        model_path: 초기 모델 파라미터 경로
        output_path: finetuning 후 모델 저장 경로
    """
    eval_path = os.path.join(output_path, 'eval/similarity_evaluation_results.csv')
    if os.path.isfile(eval_path):
        os.remove(eval_path)
    # os.mkdir(os.path.join(output_path, 'eval'), exist)
    model = SentenceTransformer(model_path)

    train_dataloader = DataLoader(train_dataset, shuffle=True, batch_size=8)
    train_loss = losses.CosineSimilarityLoss(model)
    evaluator = evaluation.EmbeddingSimilarityEvaluator(*eval_dataset)

    evaluator(model, output_path=os.path.join(output_path, 'eval'))

    model.fit(train_objectives=[(train_dataloader, train_loss)], epochs=5, evaluator=evaluator, warmup_steps=100,
              output_path=output_path)
    #   callback=transformers.integrations.TensorBoardCallback(SummaryWriter()))
    
if __name__ == '__main__':
    news = NateNews()
    df = news.load_data()
    train_dataset, eval_dataset = dataset(df)
    finetuning(train_dataset, eval_dataset, output_path='ko-sbert-natenews')



## dataset
# news = NaverSports()
# docs, topics = news.load_data()

# ## load dataframe
# df = pd.read_csv('./newsData/Naver.csv', index_col=0)
#
# ## make dataset
# eval_sents1 = []
# eval_sents2 = []
# eval_scores = []
#
# train_dataset = []
# idxs = list(range(len(df)))
# for i in idxs:
#     content, title, category = df.loc[i, 'contents'], df.loc[i, 'titles'], df.loc[i, 'categories']
#     train_dataset += [InputExample(texts=[content, title], label=1.0)]
#
#     eval_sents1 += [content]
#     eval_sents2 += [title]
#     eval_scores += [1.0]
#
#     new_idxs = list(df[df['categories'] != category].index)
#     train_dataset += [InputExample(texts=[content, df.loc[random.choice(new_idxs), 'titles']], label=0.0)]
#     eval_sents1 += [content]
#     eval_sents2 += [df.loc[random.choice(new_idxs), 'titles']]
#     eval_scores += [0.0]
#
#     train_dataset += [InputExample(texts=[df.loc[random.choice(new_idxs), 'contents'], title], label=0.0)]
#     eval_sents1 += [df.loc[random.choice(new_idxs), 'contents']]
#     eval_sents2 += [title]
#     eval_scores += [0.0]



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


