import os
from konlpy.tag import Mecab
from typing import *
import pandas as pd
import pickle
from pathlib import Path

class CustomTokenizer:
    """
    mecab을 활용한 한국어 tokenizer
    키워드 후보군 추출에 사용
    """
    def __init__(self, tagger: Mecab, tag: Union[str, Tuple[str]] = ('NNP', 'NNG')):
        """
        Args:
            tagger: mecab 클래스
            tag: 태그 방법
                nouns: 명사만 추출
                morphs: 모든 품사의 형태소 추출
                NNP: 고유명사만 추출
                NNG: 일반명사만 추출
        """
        self.tagger = tagger
        self.tag = tag

    def add_mapping(self, add_dict: Dict[str, str], save_path='./user_words/word_mapping.pkl'):
        """
        버락 오바마와 오바마를 같은 단어로 인식하기 위한 단어 매핑들 저장

        Args:
            add_dict: 추가할 단어 매핑 딕셔너리
            save_path: 딕셔너리 저장 경로
        """
        if os.path.isfile(save_path):
            with open(save_path, 'rb') as f:
                user_dict = pickle.load(f)
                user_dict.update(add_dict)
        else:
            user_dict = add_dict
        with open(save_path, 'wb') as f:
            pickle.dump(user_dict, f)

    def add_filtering(self, add_filter: Set[str], save_path='./user_words/word_filtering.pkl'):
        """
        불필요한 단어나 너무 제너럴한 단어(한국) 을 제외시키기 위한 단어들 저장

        Args:
            add_filter: 추가할 단어 집합
            save_path: 집합 저장경로
        """
        if os.path.isfile(save_path):
            with open(save_path, 'rb') as f:
                user_filter = pickle.load(f)
                user_filter = user_filter.union(add_filter)
        else:
            user_filter = add_filter
        with open(save_path, 'wb') as f:
            pickle.dump(user_filter, f)

    def __call__(self, sent: str, user_words_path: str = './user_words') -> List[str]:
        """
        mecab을 이용해 tag 종류에 따라 tokenize를 한 뒤에 mapping & filtering
        Args:
            sent: 원본 문장

        Returns: tokenize 된 문장

        """
        if self.tag == 'nouns': # 명사만
            word_tokens = self.tagger.nouns(sent)
        elif self.tag == 'morphs': # 전체 다
            word_tokens = self.tagger.morphs(sent)
        elif isinstance(self.tag, tuple): # 세부적으로 pos 지칭한 것만 추출
            word_tokens = list(map(lambda x: x[0], filter(lambda x: x[1] in self.tag, self.tagger.pos(sent))))
        else:
            raise Exception('keyerror')
        # result = [word for word in word_tokens if len(word) > 1]
        result = word_tokens
        user_words_path = Path(user_words_path)
        f_filtering, f_mapping = open(str(user_words_path / 'word_filtering.pkl'), 'rb') \
                                , open(str(user_words_path / 'word_mapping.pkl'), 'rb')
        self.filtering = pickle.load(f_filtering)
        self.mapping = pickle.load(f_mapping)
        f_filtering.close()
        f_mapping.close()

        def func(x):
            if x in self.mapping:
                return self.mapping[x]
            return x

        result = list(map(func, result))
        result = list(filter(lambda x: x not in self.filtering, result))
        return result

if __name__ == '__main__':
    tokenizer = CustomTokenizer(Mecab())
    print(tokenizer('신정열은 양의동과 김서현과 안치호와 같이 프로젝트를 진행하였다.'))

    ##
    tokenizer.add_mapping(
        {
            '안치호': '치호',
            '양의동': '동'
        }
    )

    ##
    with open('./user_words/word_mapping.pkl', 'rb') as f:
        my_dict = pickle.load(f)
    print(my_dict)

    ##
    tokenizer.add_filtering(
        {
            '양의동', '김서현'
        }
    )

    ##
    with open('./user_words/word_filtering.pkl', 'rb') as f:
        my_dict = pickle.load(f)
    print(my_dict)

    ##
    df = pd.read_csv('./newsData/Naver.csv', index_col=0)
    print(tokenizer(df.loc[23, 'contents']))
