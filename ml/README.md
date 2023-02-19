# 네이트 뉴스기사에 대한 핵심 키워드, 핵심 문장 추출
---

## Installation
- python=3.8

**install mecab** => 한국어 형태소 분석기  
https://mire-gardenia-e1b.notion.site/5874cfe2a72e4214b82dfecac9ea46e4  

=> **mecab 파일이 C:/mecab 경로일경우 site-packages/konlpy/tag/_mecab.py 에서   
Mecab()의 __init__(dicpath='C:/mecab/mecab-ko-dic')로 바꿔줘야 함**


### cpu version  
```
pip install requirements_cpu.txt
```

### gpu version  
- CUDA toolkit 11.6
- cuDNN 8.6.0
```
pip install requirements_gpu.txt
```


## Introduce file
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
[20230212_100.xlsx](https://docs.google.com/spreadsheets/d/1C1MQlYbLmh3gVJq-F6CWXzmQ30kurG6J/edit?usp=share_link&ouid=104879418112776533120&rtpof=true&sd=true)  
[20230212_100.csv](https://drive.google.com/file/d/1De0uG-F9L916WAXN9yRfknhvwTjbeGUf/view?usp=share_link)

```
# mecab의 사용자 사전 추가 (처음 실행할때만 하면 됨)
python add_mecab_userdic.py 
```
```
# load dataset
news = NateNews()
df = news.load_data()

# load model
model = NewsModel(model_path="sinjy1203/ko-sbert-natenews")

# pred keyword & main sentence 
keywords, sentence = model.predict(df.loc[i, 'contents'], word_top_n=5)
```
