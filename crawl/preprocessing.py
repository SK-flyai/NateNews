import re

from bs4 import BeautifulSoup as bs


MESSAGE = '지원하지 않는 브라우저로 접근하셨습니다.\nInternet Explorer 10 이상으로 업데이트 해주시거나, 최신 버전의 Chrome에서 정상적으로 이용이 가능합니다.'
PRESS = [
    # 노컷뉴스
    'CBS노컷뉴스는 여러분의 제보로 함께 세상을 바꿉니다. 각종 비리와 부당대우, 사건사고와 미담 등 모든 얘깃거리를 알려주세요.이메일 : 카카오톡 : @노컷뉴스사이트 : https://url.kr/b71afn',
    # 뉴스1
    'news1.kr',
    'All rights reserved.',
    '무단 전재 및 재배포 금지.',
    '뉴스1.',
    # 뉴시스
    '뉴시스통신사.',
    '무단전재-재배포 금지.',
    # 데일리임팩트
    '데일리임팩트.',
    # 조선비즈
    'ChosunBiz.com',
    # 헤럴드경제
    'All Rights Reserved.',
    # 더팩트
    '여러분의 제보를 기다립니다.',
]

def text_cleaning(article):
    article_text = str(article)
    i = 0
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

    text = tmp.replace('기사내용 요약', '[기사내용 요약]\n')
    text = re.sub("\\'", "", text)
    
    text = _remove_press(text)
    
    # text -> article, images -> {IMAGE: CAPTION}
    text, images = _seperate_text(text)
    
    text = _remove_link(text)
    text = _remove_newline(text)
    
    text = ('.').join(text.split('.')[:-1])
    text = re.sub('\n{3,}', '\n\n', text)

    return (text.strip() + '.', images)

def _seperate_text(text):
    pattern_link = re.compile('\[(http://[^\]]*)\]')
    result_img = pattern_link.finditer(text)
    text = re.sub(pattern_link, '', text)

    pattern_cap = re.compile('\[([^\]]*)\]')
    result_cap = pattern_cap.finditer(text)
    text = re.sub(pattern_cap, '', text)
    text = re.sub('\n{3,}', '\n\n', text)
    
    image_dict = dict()
    for r in result_img:
        image_dict[r.group(1)] = ''
        try:
            image_dict[r.group(1)] = next(result_cap).group(1)
        except:
            pass
    return text, image_dict

def _remove_press(text):
    text = re.sub(('|').join(PRESS), '', text)
    return text

def _remove_link(text):
    pattern = re.compile('^[^\[\n]*https?://[^ \n]+', re.MULTILINE)
    text = re.sub(pattern, '', text)
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
    text = re.sub('- \n', '\n\n', text)
    text = re.sub('\n-', '\n\n', text)
    if len(text) < 2:
        return ''

    text = text.strip()
    if text[0] == ']': text = text[1:]

    return text
