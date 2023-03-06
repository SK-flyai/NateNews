"""
mecab-ko-dic/user-custom.csv에 단어 추가
powershell에서 compile-win.ps1 실행
"""
import os
import pickle
import sys, subprocess
import argparse
import pandas as pd

def main(path='./user_words/mecab_words.txt'):
    f = open('C:/mecab/user-dic/custom.csv', 'w')
    f.close()
    # compile 실행
    os.chdir('C:/mecab') # 실행경로 변경
    p = subprocess.Popen(["powershell.exe", 'C:/mecab/tools/add-userdic-win.ps1'],
                         stdout=sys.stdout)
    p.communicate()

if __name__ == '__main__':
    main()