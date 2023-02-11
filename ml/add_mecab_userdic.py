"""
mecab-ko-dic/user-custom.csv에 단어 추가
powershell에서 compile-win.ps1 실행
"""
import os
import pickle
import sys, subprocess
import argparse

def main(args):
    # 경로 변경
    os.chdir('C:/mecab')
    # user-custom.csv에 단어 추가
    with open(args.words_path, 'a', encoding='utf-8') as f:
        for word in args.words:
            word = word.replace('_', ' ') # 띄어쓰기는 _로 대신 입력
            f.write('{},1788,3549,0,NNP,*,F,{},*,*,*,*,*\n'.format(word, word))

    # compile 실행
    p = subprocess.Popen(["powershell.exe", args.compile_path],
                         stdout=sys.stdout)
    p.communicate()

def arg_parser():
    parser = argparse.ArgumentParser(description='add user-words')
    parser.add_argument('-w', '--word', nargs='+', required=True, dest='words')
    parser.add_argument('--words_path', default='C:/mecab/mecab-ko-dic/user-custom.csv',
                        dest='words_path')
    parser.add_argument('--compile_path', default='C:/mecab/tools/compile-win.ps1',
                        dest='compile_path')
    return parser.parse_args()

if __name__ == '__main__':
    main(arg_parser())