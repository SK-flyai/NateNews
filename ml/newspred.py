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

class NewsModel:
    """
    최종 키워드와 핵심문장 예측 클래스

    ex)
        model_path = "./ko-sbert-natenews"
    word_model = KeyBERT(model_path=model_path)
    textrank_model = TextRank(model_path=model_path)
    keysent_model = KeySentence(model_path=model_path)

    """
    def __init__(self, model_path: str = 'sinjy1203/ko-sbert-natenews'):
        """
        Args:
            model_path: huggingface hub에 있는 finetuning한 sbert model
        """
        self.word_model = KeyBERT(model_path=model_path)
        self.keysent_model = KeySentence(model_path=model_path)

    def predict(self, doc: str, word_top_n: int = 5) -> Tuple[List[str], str]:
        """
        Args:
            doc: 뉴스본문 한개

        Return:
            keywords: 예측한 word_top_n개 키워드들
            keysent: 예측한 핵심문장
        """
        keywords = self.word_model.predict(doc=doc, top_n=word_top_n)
        keysent = self.keysent_model.predict(doc=doc, top_n=1)[0]

        return keywords, keysent



if __name__ == '__main__':
    warnings.filterwarnings('ignore')



