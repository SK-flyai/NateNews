# -*- coding: utf-8 -*-
from nate import news_ranking
from nate import news_keyword
from flask import Flask, jsonify, request
# from articles import *
from crawlcode import *
from recprint import *
from modelcode import *

import json
import sys
path = 'C:/Users/012/Desktop/git/NateNews/crawl'
sys.path.append(path)


app = Flask(__name__)


@app.route('/crawl', methods=["GET"])
def crawl():
    result = {'output': 'Crawl Code operate'}
    # crawlcode() # 이 함수 자리에 크롤링 코드가 들어가면 됨
    #             # ranking.json 파일 생성
    # news_ranking()
    return jsonify(result)


@app.route('/push_url', methods=['POST'])
def push_url():
    result = {'output': 'URL Send Code operate'}
    data = request.json
    title = data.get('title')
    doc = data.get('doc')

    # modelcode(title, doc) # recommend.json 파일 생성
    news_keyword(doc, title)
    return jsonify(result)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000', debug=True)
