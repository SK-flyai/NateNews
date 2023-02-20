# -*- coding: utf-8 -*-
from flask import Flask, jsonify
from articles import *

app = Flask(__name__)


@app.route("/get_text", methods=["GET"])

def get_text():
    title = news1['title']
    category = news1['category']
    press = news1['press']
    date = news1['date']
    content = news1['content']
    caption = (list(news1["image"][0].values()))[0]
    img = (list(news1["image"][0].keys()))[0]
    return jsonify({"title": title, "category": category, "press": press, "date": date, "content": content, "caption": caption, "img": img})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000', debug=True)
