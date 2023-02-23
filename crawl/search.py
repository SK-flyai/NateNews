from bs4 import BeautifulSoup as bs
import requests

URL = "https://news.nate.com/search?q="

def search_news(keyword: str, num: int=5):
    url = f"{URL}{keyword.replace(' ', '+')}"
    headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'}
    req = requests.get(url, headers=headers)
    html = bs(req.text, 'html.parser')
    
    articles = html.find('ul', {'class': 'search-list'})
    search_list = articles.find_all('a', {'class': 'thumb-wrap'})
    url_list = [f"https:{article['href']}" for article in search_list]
    return url_list[:num]


if __name__ == "__main__":
    print(search_news('키워드'))