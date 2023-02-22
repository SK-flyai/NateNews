# -*- coding: utf-8 -*-
from search import search_news
from utils import get_news

import sys
import os
import json
# import time

path = ('/').join(os.getcwd().split('\\')[:-1]) + '/ml'
sys.path.append(path)

from newspred import NewsModel
from bareunpy import Tagger

tagger = Tagger('koba-6REWGFY-OPWE7ZI-TPNV3FQ-DCVQDKA')
model = NewsModel(tagger=tagger, model_path='sinjy1203/ko-sbert-natenews')

def keyword(doc: str, title: str, save: bool=False):
    # this = time.time()
    keywords, sentence = model.predict(doc, title)
    keywords = list(map(lambda x: x.split('[')[0], keywords))
    # print(f"Inference Time of keys : {time.time() - this}\n\n"); this = time.time()
    
    key_dict = {'keyword' : {keyword : {news.url: news.get_dict() for news in get_news(search_news(keyword))} for keyword in keywords}}


    key_dict['sentence'] = sentence
    # print(f"Inference Time of recom articles : {time.time() - this}\n\n")
    if save:
        with open('ex_keyword.json', 'w', -1, 'utf-8') as f : 
            json.dump(key_dict, f, indent=4, ensure_ascii=False)
    return key_dict


if __name__ == "__main__":
    title = '"여자인데 남자답다고 軍 보낸 꼴"…아파텔 사는 31세의 분노'
    doc = '세금 낼 때는 주택이라더니 대출받을 때는 아니라고 하네요. 귀에 걸면 귀걸이 코에 걸면 코걸이식 정책이 따로 없습니다. 이건 마치 여자로 태어났는데, 남자 답게 생겼다고 군대 보내는 꼴 아닙니까?\n\n아파텔로 불리는 주거용 오피스텔을 계약한 김모씨의 하소연이다. 최근 정부가 부동산 시장 안정화를 위해 잇따라 규제 완화 대책을 내놓은 가운데 김씨와 같은 아파텔 계약자나 거주자의 불만이 커지고 있다. 아파트 위주로 규제 완화가 되면서 오피스텔 거주자나 계약자가 역차별을 받고 있다는 것이다. 김씨는 정권이 바뀐 지금 아파트는 규제 해제로 선회했지만 아직 오피스텔은 이렇다 할 규제 해제 소식이 들려오지 않고 있다며 오피스텔 계약들은 숨 막히는 규제로 인해 역차별을 당하고 있다고 토로했다.\n\n이들의 가장 큰 불만은 아파텔에 대한 이중잣대다. 오피스텔은 주택법이 아닌 건축법을 적용받는다. 하지만 오피스텔을 거주 목적으로 사용하기 위해 전입신고를 한 경우 세법상 주택 수에 포함된다. 종합부동산세 등 보유세와 양도소득세를 매길 때 보유 주택 수로 산정하는 것이다. 하지만 취득세는 무주택 기준으로 아파트보다 높은 4.6%를 적용받는다. 취득 시점에서는 주거용인지 업무용인지 구분이 어렵기 때문이다.\n\n대출받을 때는 아파텔이 철저하게 비주택으로 분류된다. 특히 DSR을 산정할 때 오피스텔로 담보 대출을 받았을 경우 실제 상환 기간에 상관없이 만기를 8년으로 적용받는다. DSR 규제에 따라 연간 원리금 상환액이 연 소득의 40%를 넘기지 못하는데, 만기가 줄어들면 DSR 비율이 높아져 대출 한도가 줄어들 수밖에 없다. 아파트 등 주택이 최장 40년까지 만기를 적용받는 것과 비교하면 대출 한도의 차이가 크다.\n\n기존 오피스텔 소유자들은 최근 낮은 금리의 정책 금융상품인 특례보금자리론도 받을 수 없는 상황이다. 이 또한 오피스텔을 바라보는 정부의 이중잣대 탓이다. 정부는 특례보금자리론 상품을 내놓으면서, 신청 대상을 주택법상 주택으로만 한정했기 때문이다.\n\n아파텔 거주에 대한 이점이 사라지면서 오피스텔에 대한 인기는 차갑게 식고 있다. 2020~21년 집값 급등기에 아파트 관련 청약, 대출 등 규제가 강화되자 자금이 부족한 수요가 아파텔로 몰렸다. 청약 통장이 없어도 청약에 신청할 수 있고 100% 추첨제로 당첨자를 선정해 청약 가점이 낮은 신혼부부나 청년층이 대거 청약에 나섰다.\n\n하지만 최근엔 아파트 규제 완화로 인해 오피스텔 시장은 더욱 얼어붙었다. 서울부동산정보광장에 따르면 지난달 서울 오피스텔 거래량은 443건에 불과했다. 다양한 규제 완화책이 담긴 1, 3 부동산 대책이 발표되기 전인 지난해 12월에서 사실상 반 토막이 났다. 아파트 거래량과도 대조적인 흐름을 보인다. 서울 아파트의 경우 지난해 12월 837건이 거래됐던 것이 지난달에는 1362건으로 크게 늘었다.\n\n가격도 약세로 돌아섰다. 부동산 정보제공업체 부동산R114의 집계 결과 지난해 전국 오피스텔 매매가격 변동률은 0.38%로 2021년 5.17%에 비해 4.79%포인트 둔화했다. 특히 매매가격 변동률 증감 폭은 전용면적이 큰 구간에서 더 많이 하향 조정됐는데, 오피스텔 전용 60 초과~85 이하의 가격은 0.41% 내려 2013년 이후 처음으로 하락 전환했다. 85 초과 오피스텔의 상승률도 0.53%에 그쳐, 2021년 상승률 10.84%보다 10.31%P 줄었다.\n\n최근 국회에서도 오피스텔에 대한 이중잣대를 해소해야 한다는 지적이 이어졌다. 지난 21일 열린 국회 정무위원회 전체회의에서 박재호 더불어민주당 의원은 신혼부부나 청년들이 아파트 대신 오피스텔에 많이 거주하고 있다며 특례보금자리론도 아파트에만 국한할 것이 아니라 주거용 오피스텔까지도 확장해야 한다고 말했다. 이에 대해 김주현 금융위원장은 실제 오피스텔이 주거용으로 사용되고 있는 만큼, 법적으로는 어떻게 마련되고 있는지 더 검토해 보겠다고 답했다.'
    keywords = keyword(doc, title, save=True)
    print(keywords.keys())