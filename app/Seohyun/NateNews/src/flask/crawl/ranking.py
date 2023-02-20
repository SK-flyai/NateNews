from bs4 import BeautifulSoup as bs
from collections import defaultdict
from utils import get_news

import datetime as dt
import requests


CATEGORY=['all', 'sisa', 'spo', 'pol', 'eco', 'soc', 'int', 'its']


def get_ranking(num: int=20):
    ranking_dict = defaultdict(dict)
    date = dt.date.today() - dt.timedelta(days=1)
    date = (date.strftime('%Y%m%d'))
    
    for category in CATEGORY:
        url_list = _get_ranking(category, date)
        news_list = get_news(url_list)[:num]
        ranking_dict[category] = {news.url: news.get_dict() for news in news_list}
    
    return ranking_dict

def _get_ranking(
    category: str,
    date: str,
):
    req = requests.get(f"https://news.nate.com/rank/interest?sc={category}&p=day&date={date}")
    soup = bs(req.text, 'html.parser')
    main = soup.find('div', {'class': 'postRankNews'})
    
    links = main.find_all('a')
    ranking = ['https:' + link['href'].split('?')[0] for link in links if 'nate.com/view' in link['href']]
    
    return ranking

if __name__ == '__main__':
    get_ranking()