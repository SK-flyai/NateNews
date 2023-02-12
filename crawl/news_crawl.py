import requests
import re
import time

from bs4 import BeautifulSoup as bs
from preprocessing import text_cleaning


LINK = 'https://news.nate.com/view/'
# TODO: rename SportsNews to NateNews
# TODO: modulize
"""
/
L crawl
    L utils
        L funcs
    L nate
        L NateNews
"""


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

    def _get_content(self):
        article = self.content.find('div',{'id': 'articleContetns'})
        
        # FIXME: 밑에 코드는 backup용, 혹시 위에 코드 에러나면 아래거 돌려보기
        # article = self.content.find('div', {'id': 'realArtcContents'})
        # if not article:
        #     article = self.content.find(
        #         'div',
        #         {'id': 'RealArtcContents'}
        #     )
        # if not article: return None
        return text_cleaning(article)
    
    def _get_title(self):
        title = self.content.find('h3', {'class': 'viewTite'})
        if not title:
            title = self.content.find('h3', {'class': 'articleSubecjt'})
        return title.text
    
    def _get_date(self):
        date = self.content.find('em').text
        # date: dt.datetime = dt.datetime.strptime(_date, "%Y-%m-%d %H:%M")
        return date
    
    
    @staticmethod
    def get_recent(date: int):
        """get latest article number in Nate given date

        Args:
            `date` (int): date in which latest article number will be found

        Note:
            Can't return accurate number of article
            -> get latest number of article in '최신뉴스' in Nate

        Returns:
            int: latest article number
        """        
        req = requests.get(f'https://news.nate.com/recent?mid=n0100&type=c&date={date}')
        content = bs(req.text, 'html.parser')
        _recent = content.find_all('div', {'class': 'mlt01'})
        
        latest = None
        for news in _recent:
            # recent = //news.nate.com/view/{YYYY}{mm}{dd}n{NNNNN}?mid=n0100
            recent = int(news.find('a')['href'].split('?')[0][-5:])
            if not latest or latest < recent:
                latest = recent
        return latest # return latest article number

    @classmethod
    def create(
        cls,
        url:str,
    ):
        # TODO: 기사가 없는 경우 -> svcname='뉴스'
        """create `NateNews` if it satisfy some conditions

        Args:
            `url` (str): url for news in Nate

        Desc:
            return `NateNews` if given url satisfy some conditions
            * 1. Should have article(RealArtcContents or articleContetns)
            * 2. Only for '뉴스', exclude for '연예', '스포츠'
            
        Returns:
            Union[NateNews, None]: 
        """        
        # TODO: add exclusion rule for press('연합뉴스',etc..)
        time.sleep(0.5)
        new_class = cls(url)
        which_news = new_class.content.find(
            'a',
            {'class': 'svcname'}
        ).text
        
        # 연예 기사는 제외
        if which_news == '연예':
            return None

        # 연합 뉴스들 제외
        if new_class._get_press() == 'AP연합뉴스' or new_class._get_press() == 'EPA연합뉴스':
            return None

        article = new_class.content.find(
            'div',
            {'id': 'articleContetns'}
        )
        
        # 기사가 없는 경우
        if not article:
            print(f"There's no article in {url}")
            return None
        else:
            return new_class
