from konlpy.tag import Mecab
from typing import *

class CustomTokenizer:
    """
    mecab을 활용한 한국어 tokenizer
    키워드 후보군 추출에 사용
    """
    def __init__(self, tagger: Mecab, tag: str):
        """
        Args:
            tagger: mecab 클래스
            tag: 태그 방법
                nouns: 명사만 추출
                morphs: 모든 품사의 형태소 추출
                NNP: 고유명사만 추출
        """
        self.tagger = tagger
        self.tag = tag

    def __call__(self, sent: str) -> List[str]:
        """
        mecab을 이용해 tag 종류에 따라 tokenize를 한 뒤에 길이 1 이하의 단어는 삭제
        Args:
            sent: 원본 문장

        Returns: tokenize 된 문장

        """
        if self.tag == 'nouns':
            word_tokens = self.tagger.nouns(sent)
        elif self.tag == 'morphs':
            word_tokens = self.tagger.morphs(sent)
        elif self.tag == 'NNP':
            word_tokens = list(map(lambda x: x[0], filter(lambda x: x[1] == 'NNP', self.tagger.pos(sent))))
        else:
            raise Exception('keyerror')
        result = [word for word in word_tokens if len(word) > 1]
        return result

if __name__ == '__main__':
    tokenizer = CustomTokenizer(Mecab(), 'morphs')
##
    tokenizer('안녕하세요')
