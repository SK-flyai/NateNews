from tqdm import tqdm
from sklearn.feature_extraction.text import CountVectorizer
from konlpy.tag import Mecab
from pathlib import Path
import numpy as np
import itertools
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer, util
import numpy as np

from load_dataset import *

class TextRank:
    def __init__(self):
        self.embedding_model = SentenceTransformer("jhgan/ko-sbert-nli")

    def similarity_matrix_(self, sentence_embedding):
        sim_mat = np.zeros([len(sentence_embedding), len(sentence_embedding)])
        for i in range(len(sentence_embedding)):
            for j in range(len(sentence_embedding)):
                sim_mat[i][j] = cosine_similarity(sentence_embedding[i].reshape(1, embedding_dim),
                                                  sentence_embedding[j].reshape(1, embedding_dim))[0, 0]
        return sim_mat
