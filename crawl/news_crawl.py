import requests
import re
import time

from bs4 import BeautifulSoup as bs
from preprocessing import text_cleaning


LINK = 'https://news.nate.com/view/'
# TODO: modulize


class NateNews:
    def __init__(self, url:str):
        headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'}
        res = requests.get(url, headers=headers) # to prevent block crawling
        assert res.status_code == 200
        
        self.url = url
        html = res.text
        self.content = bs(html, 'html.parser')
    
    def get_info(self):
        return[
            self._get_title(),
            self._get_category(),
            self._get_press(),
            self._get_date(),
            self._get_content(),
            self.url,
        ]
    
    def get_dict(self):
        return{
            "title": self._get_title(),
            "category": self._get_category(),
            "press": self._get_press(),
            "date": self._get_date(),
            "content": self._get_content(),
            "image": self.image,
        }
    
    @property
    def press(self):
        return self._get_press()
    
    @property
    def image(self):
        return self._image

    @image.setter
    def image(self, img:dict):
        self._image = img

    def _get_content(self):
        _article = self.content.find('div',{'id': 'articleContetns'})
        article, self.image = text_cleaning(_article)

        return article
    
    def _get_press(self):
        _press = self.content.find('a', {'class': 'medium'})
        if _press and _press.text:
            press = _press.text
        else:
            press = self.content.find('dl', {'class': 'articleInfo'}).select('img')[0]['alt']
        return press

    def _get_category(self):
        nav = self.content.find('div', {'class': 'snbArea'})
        category = nav.find('li', {'class': 'on'})
        return category.text if category else 'X'
    
    @property
    def title(self):
        return self._get_title()
    
    def _get_title(self):
        title = self.content.find('h3', {'class': 'viewTite'})
        if not title:
            title = self.content.find('h3', {'class': 'articleSubecjt'})
        return title.text
    
    def _get_date(self):
        date = self.content.find('em').text
        # date: dt.datetime = dt.datetime.strptime(_date, "%Y-%m-%d %H:%M")
        return date
