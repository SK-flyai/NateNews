import React, { useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import SearchBar from "../components/Searchbar";

import { Pressable } from "react-native";

const { width } = Dimensions.get("window");
const Imagewidth = width * 0.25;
const SmallImageWidth = width * 0.15;

function EntertainmentMain({ navigation }) {
  const Armypath = "../../assets/youngsan.webp";

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          marginHorizontal: "3%",
        }}
      >
        <View style={{ flex: 1, marginTop: "5%", backgroundColor: "white" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            '베를린 영화제' 빛낸 스타들
          </Text>
          <Pressable
            onPress={() => navigation.navigate("EntertainmentContent")}
            android_ripple={{ color: "e0e0e0" }}
          >
            <View
              style={{
                marginVertical: "2%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                flexDirection: "row",
              }}
            >
              <Image
                style={{
                  width: Imagewidth,
                  height: Imagewidth * 0.7,
                  backgroundColor: "black",
                  resizeMode: "stretch",
                }}
                source={{
                  uri: "https://thumbnews.nateimg.co.kr/mnews107x80///news.nateimg.co.kr/etc/cms/2023/02/20/1676870109_561.jpg",
                }}
              />

              <View style={styles.textcontainer}>
                <Text style={{ fontWeight: "bold" }}>
                  "전도연, 실망시키는 법 없다" 베를린서 공개된 '길복순' 극찬
                  세례
                </Text>

                <Text
                  style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}
                  numberOfLines={2}
                >
                  전도연 주연 '길복순'이 베를린 국제영화제를 통해 공개된 가운데,
                  뜨거운 반응이 전해지고 있다. 넷플릭스 영화 '길복순'(감독
                  변성현)은 청부살인업계의 전설적인 킬러 길복순이 회사와 재계약
                  직전, 죽거나 또는 죽이거나, 피할 수 없는 대결에 휘말리게 되는
                  이야기를 그린 액션 영화.
                </Text>
              </View>
            </View>
          </Pressable>
        </View>

        <View>
          <View
            style={[
              styles.divider,
              { marginTop: "3%" },
              { marginBottom: "2%" },
            ]}
          />
          <Pressable
            onPress={() => navigation.navigate("SportContent")}
            android_ripple={{ color: "gray" }}
          >
            <Text numberOfLines={1}>
              "밀양과 달라"…'길복순' 전도연, 젠더리스 턱시도→연기 찬사…베를린
              매료 [종합]
            </Text>
          </Pressable>
          <View style={[styles.divider, { marginVertical: "2%" }]} />
          <Text numberOfLines={1}>
            [SC이슈] "다정 투샷부터 모자 장난까지"…홍상수♥김민희, 신작보다 더
            뜨거운 해외發 불륜 로맨스
          </Text>
          <View style={[styles.divider, { marginVertical: "2%" }]} />
          <Text numberOfLines={1}>
            '전생' 유태오, 베를린영화제서 환대…"영광스럽다"
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={[styles.middle]}>
            <Text>2030 부산 액스포</Text>
          </View>
          <View
            style={[
              styles.middle,
              { borderLeftWidth: 1 },
              { borderRightWidth: 1 },
            ]}
          >
            <Text>20대 대통령 윤석열</Text>
          </View>
          <View style={styles.middle}>
            <Text>코로나 19 현황</Text>
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>연예랭킹</Text>
          <View style={styles.divider} />

          <View style={styles.mainnews}>
            <Image
              style={{
                width: Imagewidth,
                height: Imagewidth * 0.6,
                backgroundColor: "black",
              }}
              source={{
                uri: "https://thumbnews.nateimg.co.kr/mnews70/http://news.nateimg.co.kr/orgImg/tt/2023/02/20/news-p.v1.20230220.4272e9227283419da6d09c71c21b0642_P1.jpg",
              }}
            />

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }} numberOfLines={1}>
                '이제훈 성희롱 발언' 이경실, 결국 대학생에 고발당했다
              </Text>
              <Text
                style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}
                numberOfLines={2}
              >
                개그우먼 이경실이 배우 이제훈을 향한 성희롱성 발언으로 고발
                당했다. 20일 매일경제 단독 보도에 따르면 이경실은 지난 19일
                연세대학교 재학생 A씨로부터 통신매체이용음란 혐의로 경찰에 고발
                당했다. A씨는 행정안전부 ‘문서24’를 통해 고발했다.
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.mainnews}>
            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }} numberOfLines={1}>
                BTS 슈가가 밝힌 빠른 출·입국 이유, 블랙핑크 리사 때 일어난
                불상사 [한혁승의 포톡]
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                sbs
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
        </View>
        <View style={styles.mainnews}>
          <View style={styles.textcontainer}>
            <Text style={{ fontWeight: "bold" }} numberOfLines={1}>
              "노출 거절하면 캐스팅 교체"…'판타G스팟' 여배우 고백 파문
            </Text>
            <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
              sbs
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.mainnews}>
          <View style={styles.textcontainer}>
            <Text style={{ fontWeight: "bold" }} numberOfLines={1}>
              문가영, 데뷔 첫 팬미팅서 눈물 펑펑…유연석도 오고 '그남자'도 왔다
            </Text>
            <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
              sbs
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.mainnews}>
          <View style={styles.textcontainer}>
            <Text style={{ fontWeight: "bold" }} numberOfLines={1}>
              김하영, 코 성형 전 사진 공개 "하길 잘했다 싶어"(철파엠)
            </Text>
            <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
              sbs
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            정치 최신뉴스
          </Text>
          <View style={styles.divider} />

          <View style={styles.mainnews}>
            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                "총리님이 희망""내 마음 1등"...황교안 치켜세운 이준석, 왜
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                중앙일보 | 5분전
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.mainnews}>
            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                "총리님이 희망""내 마음 1등"...황교안 치켜세운 이준석, 왜
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                중앙일보 | 5분전
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.mainnews}>
            <Image
              style={{
                width: SmallImageWidth,
                height: Imagewidth * 0.4,
                backgroundColor: "black",
                resizeMode: "stretch",
              }}
              source={require(Armypath)}
            />

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                "총리님이 희망""내 마음 1등"...황교안 치켜세운 이준석, 왜
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                중앙일보 | 5분전
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.mainnews}>
            <Image
              style={{
                width: SmallImageWidth,
                height: Imagewidth * 0.4,
                backgroundColor: "black",
                resizeMode: "stretch",
              }}
              source={require(Armypath)}
            />

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                "총리님이 희망""내 마음 1등"...황교안 치켜세운 이준석, 왜
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                중앙일보 | 5분전
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.mainnews}>
            <Image
              style={{
                width: SmallImageWidth,
                height: Imagewidth * 0.4,
                backgroundColor: "black",
                resizeMode: "stretch",
              }}
              source={require(Armypath)}
            />

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                "총리님이 희망""내 마음 1등"...황교안 치켜세운 이준석, 왜
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                중앙일보 | 5분전
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.mainnews}>
            <Image
              style={{
                width: SmallImageWidth,
                height: Imagewidth * 0.4,
                backgroundColor: "black",
                resizeMode: "stretch",
              }}
              source={require(Armypath)}
            />

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                "총리님이 희망""내 마음 1등"...황교안 치켜세운 이준석, 왜
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                중앙일보 | 5분전
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.mainnews}>
            <Image
              style={{
                width: SmallImageWidth,
                height: Imagewidth * 0.4,
                backgroundColor: "black",
                resizeMode: "stretch",
              }}
              source={require(Armypath)}
            />

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                "총리님이 희망""내 마음 1등"...황교안 치켜세운 이준석, 왜
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                중앙일보 | 5분전
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.mainnews}>
            <Image
              style={{
                width: SmallImageWidth,
                height: Imagewidth * 0.4,
                backgroundColor: "black",
                resizeMode: "stretch",
              }}
              source={require(Armypath)}
            />

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                "총리님이 희망""내 마음 1등"...황교안 치켜세운 이준석, 왜
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                중앙일보 | 5분전
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.mainnews}>
            <Image
              style={{
                width: SmallImageWidth,
                height: Imagewidth * 0.4,
                backgroundColor: "black",
                resizeMode: "stretch",
              }}
              source={require(Armypath)}
            />

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                "총리님이 희망""내 마음 1등"...황교안 치켜세운 이준석, 왜
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                중앙일보 | 5분전
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.mainnews}>
            {/* <Image
              style={{
                width: SmallImageWidth,
                height: Imagewidth * 0.4,
                backgroundColor: "black",
                resizeMode: "stretch",
              }}
              source={require(Armypath)}
            /> */}

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                "총리님이 희망""내 마음 1등"...황교안 치켜세운 이준석, 왜
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                중앙일보 | 5분전
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
        </View>
      </View>
      <View style={[styles.divider, { borderBottomWidth: 10 }]} />
    </ScrollView>
  );
}

export default EntertainmentMain;

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
    marginVertical: "1%",
  },
  middle: {
    flex: 1,
    borderColor: "#e0e0e0",
    paddingVertical: "2%",

    marginVertical: "3%",
    borderTopWidth: 10,
    borderBottomWidth: 15,

    alignItems: "center",
    justifyContent: "center",
  },
  mainnews: {
    marginVertical: "2%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "row",
  },
  textcontainer: {
    flex: 1,
    marginLeft: "1%",
    backgroundColor: "white",
  },
});
