# -*- coding: utf-8 -*-
from flask import Flask, jsonify
from articles import *
from crawlprint import *
from recprint import *
app = Flask(__name__)

@app.route('/crawl', methods=["GET"])
def crawl():
    result = {'output': 'Hello, World!'}
    crawlprint()
    return jsonify(result)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000', debug=True)
