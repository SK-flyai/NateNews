from news_crawl import NateNews
from typing import List, Union


def get_info(urls: Union[List[str], str]) -> dict:
    """Get news datas with `dict` form

    Args:
        urls (Union[List[str], str]): news url or list of news url

    Returns:
        dict: _description_
    """    
    urls = urls if isinstance(urls, list) else [urls]
    result = dict()
    for url in urls:
        news = NateNews(url)
        result[news.url] = news.get_dict()
    return result

if __name__ == "__main__":
    print(get_info('https://news.nate.com/view/20230222n09855?mid=n1006'))