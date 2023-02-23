# 네이트 뉴스기사에 대한 핵심 키워드, 핵심 문장 추출

---

## huggfacehub
**https://huggingface.co/sinjy1203/ko-sbert-natenews**

## Installation
- python=3.8

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

### main
```
# load dataset
news = NateNews()
df = news.load_data()

# load model & tagger
tagger = Tagger(API-KEY)
model = NewsModel(tagger=tagger, model_path='bongsoo/kpf-sbert-v1.1', user_words_path='./user_words')

# pred keyword & main sentence 
keywords, keysent = model.predict(df.loc[i, 'contents'], df.loc[i, 'titles'], word_top_n=5,
                                        sent_top_n=2, title_w=0.5, diversity=0)
```
