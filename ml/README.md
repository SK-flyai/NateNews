# 네이트 뉴스기사에 대한 핵심 키워드, 핵심 문장 추출

---

## huggfacehub
**https://huggingface.co/sinjy1203/ko-sbert-natenews**

## Installation
- python=3.8

### Mecab 설치 & 환경세팅 (일단 mecab 부분 사용안함)
**install mecab** => 한국어 형태소 분석기  
https://mire-gardenia-e1b.notion.site/5874cfe2a72e4214b82dfecac9ea46e4  

=> **mecab 파일이 C:/mecab 경로일경우 site-packages/konlpy/tag/_mecab.py 에서   
Mecab()의 __init__(dicpath='C:/mecab/mecab-ko-dic')로 바꿔줘야 함**

=> 관리자권한으로 powershell 실행후에  
```
ExecutionPolicy
```
이 것의 결과가 Restricted 일경우 아래 실행
```
Set-ExecutionPolicy RemoteSigned
```

### bareun 설치 & 환경세팅
```commandline
pip3 install bareunpy
```
- Go to https://bareun.ai/.  
With registration, for the first time, you can get a API-KEY to use it freely.

### cpu version  
```
# pip install requirements_cpu.txt => 이거 에러떠서 아래 실행 고우
pip install sentence-transformers
pip install kss
pip install matplotlib
```

### gpu version  
- CUDA toolkit 11.6
- cuDNN 8.6.0
```
# pip install requirements_gpu.txt => 아래거 실행 고우
pip3 install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu116
pip install sentence-transformers
pip install kss
pip install matplotlib
```


## file
`add_mecab_userdic.py`  
mecab의 사용자 사전에 고유명사 추가  

`finetune.py`  
ko-sbert-nli 모델을 natenews 데이터셋으로 finetuning  

`keybert.py`  
핵심 키워드 추출

`kobertopic.py`  
토픽모델링

`load_dataset.py`  
네이트 뉴스 데이터셋 불러오기  

`main.py`  
네이트 뉴스 데이터셋에서 키워드와 핵심문장 예측 실행문

`preprocess.py`  
keybert.py 사용하기 전에 키워드 후보군 추출  

`run_colab.py`  
colab gpu를 활용하여 model finetuning  

`summarize.py`  
핵심 문장 추출

`newspred.py`  
최종 키워드 예측과 핵심 문장 예측 모델

## Getting Started
### sample dataset 
[20230212_100.xlsx](https://docs.google.com/spreadsheets/d/1SbKPI4Y0O6xgrYXHFIu8u-l9ucr5O45Q/edit?usp=share_link&ouid=104879418112776533120&rtpof=true&sd=true)  
[20230212_100.csv](https://drive.google.com/file/d/1De0uG-F9L916WAXN9yRfknhvwTjbeGUf/view?usp=share_link)

### mecab compile 파일 다운
[compile-win.ps1](https://drive.google.com/file/d/1HH6D5Y89OOO_R2WSblDGXUdCkJNJt85f/view?usp=share_link)  
=> 이 파일을 C:/mecab/tools 경로에 넣어주기

```
# mecab의 사용자 사전 추가 (처음 실행할때 한번만 하면 됨)
python initial_mecab_userdic.py

# add_mecab_userdic.py 실행 전에 ./user_words/mecab_words.txt 에 모든 단어 앞에 /표시 없애기
# 단어 앞에 /표시는 그 단어를 추가 안하겟다는 의미이기 때문
python add_mecab_userdic.py 
```
```
# load dataset
news = NateNews()
df = news.load_data()

# load model & tagger
tagger = Tagger(API-KEY)
model = NewsModel(tagger=tagger, model_path="sinjy1203/ko-sbert-natenews")

# pred keyword & main sentence 
keywords, sentence = model.predict(df.loc[i, 'contents'], word_top_n=5)
```
