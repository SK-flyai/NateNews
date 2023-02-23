from bs4 import BeautifulSoup as bs
from collections import defaultdict
from utils import get_news

import datetime as dt
import requests
import json

CATEGORY=['all', 'sisa', 'spo', 'pol', 'eco', 'soc', 'int', 'its']


def get_ranking(num: int=20):
    """Get yesterday news's ranking

    Args:
        num (int, optional): # of news in ranking. Defaults to 20.

    Returns:
        _type_: _description_
    """
    ranking_dict = defaultdict(dict)
    date = dt.date.today() - dt.timedelta(days=1)
    date = (date.strftime('%Y%m%d'))
    
    for category in CATEGORY:
        url_list = _get_ranking(category, date)
        print(f"\n{category}")
        news_list = get_news(url_list)[:num]
        ranking_dict[category] = {news.url: news.get_dict() for news in news_list}
        
    with open('C:/Users/frica/OneDrive/바탕 화면/GitHub/NateNews/app/Seohyun/NateNews/src/flask/ranking.json', 'w', -1, 'utf-8') as f : 
            json.dump(ranking_dict, f, indent=4, ensure_ascii=False)
             
    return ranking_dict

def _get_ranking(
    category: str,
    date: str,
):
    req = requests.get(f"https://news.nate.com/rank/interest?sc={category}&p=day&date={date}")
    soup = bs(req.text, 'html.parser')
    main = soup.find('div', {'class': 'postRankNews'})
    
    links = main.find_all('a')
    ranking = [link['href'] for link in links if 'nate.com/view' in link['href']]
    return ranking

if __name__ == '__main__':
    get_ranking()