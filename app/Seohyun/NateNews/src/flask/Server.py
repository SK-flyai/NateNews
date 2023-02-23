# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request
from articles import *
from crawlcode import *
from recprint import *
from modelcode import *
app = Flask(__name__)

@app.route('/crawl', methods=["GET"])
def crawl():
    result = {'output': 'Crawl Code operate'}
    crawlcode() # 이 함수 자리에 크롤링 코드가 들어가면 됨
                # ranking.json 파일 생성
    return jsonify(result)

@app.route('/push_url', methods=['POST'])
def push_url():
    result = {'output': 'URL Send Code operate'}
    data = request.json
    url = data.get('text') # url == 클릭한 기사의 url. 이걸 바탕으로 키워드 및 문장을 추출하면 됨.
    modelcode(url) # recommend.json 파일 생성
    return jsonify(result)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000', debug=True)
