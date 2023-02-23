from typing import List
from search import search_news

def _tmp_keyword(content: str) -> List[str]:
    return ['하나', '둘', '셋', '넷', '다섯']

def _tmp_sent(title:str, content: str) -> List[str]:
    return [
        '이 대표는 이날 이같이 밝혔다.',
        '그러면서 발언을 마쳤다.',
        '알 수 있다고 주장했다.'
    ]

def return_key(
    title: str,
    content: str,
) -> dict:
    # TODO: keyword extraction
    keyword_list = _tmp_keyword(content)
    sent_list = _tmp_sent(title, content)
    
    keyword_dict = {keyword: search_news(keyword) for keyword in keyword_list}
    key_data = {
        "keyword" : keyword_dict,
        "sentence" : sent_list
    }
    return key_data
