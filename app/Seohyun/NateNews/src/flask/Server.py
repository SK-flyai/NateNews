# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request
# from articles import *

import json
import sys

with open('paths.json', encoding='utf-8') as f:
    pts = json.load(f)
    
path = pts['crawlpath']

sys.path.append(path)

from nate import news_ranking
from nate import news_keyword

app = Flask(__name__)


@app.route('/crawl', methods=["GET"])
def crawl():
    result = {'output': 'Crawl Code operate'}
    #news_ranking() # ranking.json 파일 생성
    return jsonify(result)


@app.route('/push_url', methods=['POST'])
def push_url():
    result = {'output': 'URL Send Code operate'}
    data = request.json
    title = data.get('title')
    doc = data.get('doc')
    news_keyword(doc, title) # recommend.json 파일 생성
    return jsonify(result)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000', debug=True)
