from news_crawl import NateNews
from typing import List, Union


def get_news(urls: Union[List[str], str]) -> dict:
    urls = urls if isinstance(urls, list) else [urls]
    result = dict()
    for url in urls:
        news = NateNews(url)
        result[news.url] = news.get_dict()
    return result

if __name__ == "__main__":
    print(get_news('https://news.nate.com/view/20230222n09855?mid=n1006'))