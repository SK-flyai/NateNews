import re

from bs4 import BeautifulSoup as bs


MESSAGE = '지원하지 않는 브라우저로 접근하셨습니다.\nInternet Explorer 10 이상으로 업데이트 해주시거나, 최신 버전의 Chrome에서 정상적으로 이용이 가능합니다.'

def text_cleaning(article):
    article_text = str(article)
    
    # [] 내부 모두 제거
    pattern = '\[[^\]]*\]'
    tmp = re.sub(pattern, '', article_text)

    tmp = tmp.replace('\n', '').replace('\t', '').replace('\r', '') # 공백 제거
    pattern = "<br/?>" # <br> 태그 -> 개행으로 변경
    tmp = re.sub(pattern, '\n', tmp)
    
    tmp = _remove_caption(tmp)
    tmp = _remove_html_tag(tmp)
    
    content = bs(tmp, 'html.parser') # 다시 parsing
    tmp = re.sub(' {2,}', ' ', content.text)
    
    tmp = _remove_bracket(tmp)
    
    tmp = ('').join([word for word in tmp if word.isalpha() or ord(word) < 128])
    tmp = tmp.replace(MESSAGE, '')
    
    tmp = _remove_email(tmp)
    tmp = _remove_newline(tmp)

    text = tmp.replace('기사내용 요약', '[기사내용 요약]\n')

    return text

def _remove_caption(text):
    # 캡션 표시
    pattern = re.compile('(<p style="[^>]*>)([^<]*)(</p>)')
    result = pattern.finditer(text)
    for r in result:
        text = text.replace(r.group(), f"[{r.group(2)}]")
    # 캡션 표시
    pattern = re.compile('(<span class="sub_tit">)([^<]*)(</span>)')
    result = pattern.finditer(text)

    for r in result:
        text = text.replace(r.group(), f"[{r.group(2)}]")
    
    return text

def _remove_html_tag(text):
    pattern = "</?p[^>]*>" # <p> or </p> -> 개행으로 변경
    text = re.sub(pattern, '\n', text)
    
    pattern = "<caption>[^>]+>" # caption 제거
    text = re.sub(pattern, '', text)

    pattern = "<a.+</a>" # [a] 태그 제거
    text = re.sub(pattern, '', text)

    # pattern = "<img[^>]+>" # img들 모두 제거
    pattern = re.compile('<img[^>]+>')
    result = pattern.finditer(text)
    images = bs(text, 'html.parser').find_all('img')
    
    i = 0
    for r in result:
        text = text.replace(r.group(), f"\n[http:{images[i]['src']}]\n")
        i += 1
    
    return text

def _remove_bracket(text):
    pattern = "<[^>]*>" # <> 내부 모두 제거
    text = re.sub(pattern, '', text)
    
    pattern = "\([^\)]*\)" # () 내부 모두 제거
    text = re.sub(pattern, '', text)
    
    return text

def _remove_email(text):
    pattern = '[a-zA-Z0-9+-_.]+@[a-zA-Z0-9+-_]+.com'
    text = re.sub(pattern, '', text)
    pattern = '[a-zA-Z0-9+-_.]+@[a-zA-Z0-9+-_]+.co.kr'
    text = re.sub(pattern, '', text)
    pattern = '[a-zA-Z0-9+-_.]+@'
    text = re.sub(pattern, '', text)
    
    return text

def _remove_newline(text):
    text = re.sub('\n ', '\n\n', text)
    text = re.sub('-\n', '\n\n', text)
    text = re.sub('\n{2,}', '\n\n', text)
    if len(text) < 2:
        return ''
    
    while text[0] == ' ' or text[0] == '\n':
        text = text[1:]
    if text[0] == ']': text = text[1:]
    while text[-1] == ' ' or text[-1] == '\n':
        text = text[:-1]

    return text
