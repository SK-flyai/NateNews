import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchBar from "../components/Searchbar";
import { Image, View, Text, ScrollView } from "react-native";
import { Divider } from "react-native-elements";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 5px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;

// 광고 및 기사 이미지들
const AD1path = "../../assets/ad1.png";
const AD2path = "../../assets/ad2.png";
const Artipic1 = "../../assets/artipic1.png";
const Artipic2 = "../../assets/artipic2.png";
const Artipic3 = "../../assets/artipic3.png";

const Main = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  // Today 표시
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const todaydate = date.getDate();

  //인기 검색어 출력
  const [keywordIndex, setKeywordIndex] = useState(0);
  const hotkeywords = [
    "1. 뉴진스",
    "2. 르세라핌",
    "3. 아이브",
    "4. 프로미스나인",
    "5. 에스파",
    "6. 소녀시대",
    "7. 블랙핑크",
    "8. 아이즈원",
    "9. 레드벨벳",
    "10. 트와이스",
  ];
  const changeKeyword = () => {
    setKeywordIndex((keywordIndex + 1) % hotkeywords.length);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      changeKeyword();
    }, 1000);

    return () => clearInterval(interval);
  }, [keywordIndex]);

  return (
    <Container insets={insets}>
      <View>
        <Text></Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: 10,
            marginTop: -40,
          }}
        >
          [TODAY] {year}.{month}.{todaydate}
        </Text>
      </View>
      <SearchBar />
      <ScrollView>
        <Container insets={insets}>
          <View style={{ width: "100%", marginTop: -40 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 14, marginBottom: 10 }}
            >
              1. 곽상도, '50억 뇌물 혐의' 1심 무죄…정치자금법 위반만 인정
            </Text>
            <Divider style={{ marginVertical: 10 }} />
            <Text
              style={{ fontWeight: "bold", fontSize: 14, marginBottom: 10 }}
            >
              2. 토트넘 승점도 깎인다…맨시티 퇴출시 순위표 공개
            </Text>
            <Divider style={{ marginVertical: 10 }} />
            <Text
              style={{ fontWeight: "bold", fontSize: 14, marginBottom: 10 }}
            >
              3. "아들 혼자 엄마에게 극존칭"…초등생 사망에 이웃 충격
            </Text>
            <Divider style={{ marginVertical: 10 }} />
            <Text
              style={{ fontWeight: "bold", fontSize: 14, marginBottom: 10 }}
            >
              4. 이승기, 이다인과 결혼 앞두고 개종했나…기독교→불교
            </Text>
            <Divider style={{ marginVertical: 10 }} />
            <Text
              style={{ fontWeight: "bold", fontSize: 14, marginBottom: 10 }}
            >
              5. 튀르키예GK 대지진으로 사망…향년 28세
            </Text>
          </View>
        </Container>

        <Container insets={insets}>
          <View
            style={{
              width: "100%",
              marginTop: -90,
              backgroundColor: "#F2F2F2",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
                fontSize: 17,
                marginLeft: "25%",
                marginVertical: "3%",
              }}
            >
              인기 검색어  :
            </Text>
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 18 }}>
                {hotkeywords[keywordIndex]}
            </Text>
          </View>
        </Container>

        <Container
          insets={insets}
          style={{
            backgroundColor: "white",
            height: 110,
            width: "100%",
            marginTop: -30,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: 190, height: 95, marginRight: 20 }}
              source={require(AD1path)}
            />
            <Image
              style={{ width: 190, height: 95 }}
              source={require(AD2path)}
            />
          </View>
        </Container>

        <Container
          insets={insets}
          style={{
            backgroundColor: "white",
            height: 110,
            width: "100%",
            marginTop: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Image
                style={{ width: 120, height: 72, marginRight: 20 }}
                source={require(Artipic1)}
              />
              <Text style={{ marginRight: 20, marginTop: 5, width: 100 }}>
                2m 58cm 위치에서 헤더골...
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Image
                style={{ width: 120, height: 72, marginRight: 20 }}
                source={require(Artipic2)}
              />
              <Text style={{ marginRight: 20, marginTop: 5, width: 100 }}>
                NBA 최다득점 후 눈물 보인...
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Image
                style={{ width: 120, height: 72 }}
                source={require(Artipic3)}
              />
              <Text style={{ marginTop: 5, width: 100 }}>
                경찰 보란 듯 도망간 신호위반...
              </Text>
            </View>
          </View>
        </Container>
      </ScrollView>
      <View
        style={{
          backgroundColor: "#FA5858",
          height: 50,
          width: "110%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "lightgrey", fontWeight: "bold", fontSize: 13 }}>
          개인정보처리방침 | 서비스 이용약관 | 광고문의
        </Text>
      </View>
    </Container>
  );
};

export default Main;
