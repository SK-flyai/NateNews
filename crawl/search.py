from bs4 import BeautifulSoup as bs
import re
import requests

URL = "https://news.nate.com/search?q="

def search_news(keyword: str, num: int=5):
    url = f"{URL}{keyword.replace(' ', '+')}"
    headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'}
    req = requests.get(url, headers=headers)
    html = bs(req.text, 'html.parser')
    
    articles = html.find_all('li', {'class': 'items'})
    
    news_list = list(map(_info, articles[:num]))
    
    tmp_dict = dict()
    for news in news_list:
        tmp_dict.update(news)
    
    return {keyword: tmp_dict}

def _info(article) -> dict:
    # url
    url = f"http:{article.find('a').get('href')}"
    
    # title
    title = article.find('span', {'class': 'tit'}).text
    
    # content
    _content = article.find('span', {'class': 'txt'}).text
    _content = re.sub('[\n\t\r]+', ' ', _content)
    content = re.sub(' +', ' ', _content)
    
    # time and press
    date_press = article.find('span', {'class': 'time'}).text
    tmp = re.sub('[\n\t\r]+', ' ', date_press)
    tmp = re.sub(' +', ' ', tmp)
    press, date = tmp[:-18], tmp[-17:-1]
    
    # image
    try:
        image = f"http:{article.find('img').get('src')}"
    except:
        # 야매..일단은 이미지 없으면 아무 이미지나..!
        image = "http://thumbnews.nateimg.co.kr/news200x200///news.nateimg.co.kr/orgImg/na/2023/02/23/5850168_high.jpg"
    
    return {
        url: {
            "title": title,
            "image": image,
            "content": content,
            "press": press,
            "date": date,
        }
    }


if __name__ == "__main__":
    print(search_news('키워드'))