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
        eval_scores += [0.7]

        new_idxs = list(df[df['categories'] != category].index)

        train_dataset += [InputExample(texts=[content, df.loc[random.choice(new_idxs), 'titles']], label=0.0)]
        eval_sents1 += [content]
        eval_sents2 += [df.loc[random.choice(new_idxs), 'titles']]
        eval_scores += [0.3]

        train_dataset += [InputExample(texts=[df.loc[random.choice(new_idxs), 'contents'], title], label=0.0)]
        eval_sents1 += [df.loc[random.choice(new_idxs), 'contents']]
        eval_sents2 += [title]
        eval_scores += [0.3]
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
    # news = NateNews()
    # df = news.load_data()
    # train_dataset, eval_dataset = dataset(df)
    # finetuning(train_dataset, eval_dataset, output_path='ko-sbert-natenews')

    model = SentenceTransformer('sinjy1203/ko-sbert-natenews')
    train_examples = [InputExample(texts=['"난 천하람의 빠니보틀" 이준석 발언에 찐 빠니보틀이 답했다', '빠니보틀'], label=1.0)]
    train_dataloader = DataLoader(train_examples, shuffle=True, batch_size=1)

    train_loss = losses.CosineSimilarityLoss(model)

    # Tune the model
    model.fit(train_objectives=[(train_dataloader, train_loss)], epochs=10, optimizer_params={'lr': 0.1})

    ##
    doc = model_.encode(['"난 천하람의 빠니보틀" 이준석 발언에 찐 빠니보틀이 답했다'])
    word = model_.encode(['곽튜브'])
    sim = cosine_similarity(doc, word)

    ##
    model_ = SentenceTransformer('bongsoo/kpf-sbert-v1.1')
    # model_ = SentenceTransformer('sinjy1203/ko-sbert-natenews')
