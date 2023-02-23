<<<<<<< HEAD
// 상단 탭 기준 종합
// 상단 탭 기준 종합
// 상단 탭 기준 종합
// 상단 탭 기준 종합

import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { Pressable, TouchableOpacity } from "react-native";
import data from "../flask/ranking.json";

const { width } = Dimensions.get("window");
const Imagewidth = width * 0.3;
const SmallImageWidth = width * 0.15;

function SportMain({ navigation }) {
  const links = [];
  const titles = [];
  const categories = [];
  const presses = [];
  const dates = [];
  const contents = [];
  const images = [];
  var urlLink = "";
  const [result, setResult] = useState(null);

  const urlPushClick = (urls) => {
    console.log(`urlPushClicked`);
    fetch("http://192.168.1.10:5000/push_url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: urls }),
    })
      .then((response) => response.json())
      .then((data) => setResult(data.message))
      .catch((error) => setResult(error.message));
  };

  for (var key in data.spo) {
    links.push(key);
    titles.push(data.spo[key].title);
    categories.push(data.spo[key].category);
    presses.push(data.spo[key].press);
    dates.push(data.spo[key].date);
    contents.push(data.spo[key].content);
    for (var key2 in data.spo[key].image) {
      images.push(key2);
      break;
    }
  }

  const views = [];
  for (let i = 0; i < 5; i++) {
    const urlsend = links[i];
    const [aspectRatio, setAspectRatio] = useState(null);

    useEffect(() => {
      Image.getSize(
        images[0],
        (width, height) => {
          setAspectRatio(width / height);
        },
        (error) => {
          console.error(error);
        }
      );
    }, []);

    const isFirstView = i === 0; // check if it's the first view
    const imageWidth = isFirstView ? Imagewidth : SmallImageWidth; // set image width based on isFirstView
    const imageHeight = isFirstView ? Imagewidth * 0.7 : width * 0.12; // set image width based on isFirstView
    const num = isFirstView ? 2 : 1;
    const Istyle = isFirstView
      ? {
          width: imageWidth,
          aspectRatio,
          backgroundColor: "white",
        }
      : {
          width: imageWidth,
          height: imageHeight,
          backgroundColor: "black",
          resizeMode: "stretch",
        };

    const fview = isFirstView ? (
      <Image style={Istyle} source={{ uri: images[i] }} />
    ) : null;
    const nameView = isFirstView
      ? {
          marginLeft: "1%",
          width: width - (imageWidth + 20),
          justifyContent: "center",
          fontWeight: "bold",
        }
      : {
          marginLeft: "1%",
          width: width * 0.93,
          marginVertical: "2%",
          justifyContent: "center",
        };
    const newDivider = isFirstView ? (
      <View style={{ marginVertical: "3%" }} />
    ) : (
      <View style={styles.divider} />
    );

    views.push(
      <View styles={{ flex: 1 }} key={i}>
        {newDivider}
        <TouchableOpacity
          onPress={() => {
            urlPushClick(urlsend);
            console.log(urlsend); // call urlPushClick with the appropriate text
            navigation.navigate("SportContent", links[i]);
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            {fview}

            <View style={nameView}>
              <Text numberOfLines={num} style={{ fontWeight: "bold" }}>
                {titles[i].replace(/ /g, "\u00A0")}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  const views2 = [];
  for (let i = 5; i < 20; i++) {
    const urlsend = links[i];
    const [aspectRatio, setAspectRatio] = useState(null);

    useEffect(() => {
      Image.getSize(
        images[0],
        (width, height) => {
          setAspectRatio(width / height);
        },
        (error) => {
          console.error(error);
        }
      );
    }, []);

    const isFirstView = i === 0; // check if it's the first view
    const imageWidth = isFirstView ? Imagewidth : SmallImageWidth; // set image width based on isFirstView
    const imageHeight = isFirstView ? Imagewidth * 0.7 : width * 0.12; // set image width based on isFirstView
    const num = isFirstView ? 2 : 1;
    const Istyle = isFirstView
      ? {
          width: imageWidth,
          aspectRatio,
          backgroundColor: "white",
        }
      : {
          width: imageWidth,
          height: imageHeight,
          backgroundColor: "black",
          resizeMode: "stretch",
        };

    views2.push(
      <View styles={{ flex: 1 }} key={i}>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            urlPushClick(urlsend);
            console.log(urlsend); // call urlPushClick with the appropriate text
            navigation.navigate("SportContent", links[i]);
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Image style={Istyle} source={{ uri: images[i] }} />

            <View
              style={{
                marginLeft: "1%",
                width: width * 0.8,
                justifyContent: "center",
              }}
            >
              <Text numberOfLines={num} style={{ fontWeight: "bold" }}>
                {titles[i].replace(/ /g, "\u00A0")}
              </Text>

              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                {presses[i]}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
=======
import React, { useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import SearchBar from "../components/Searchbar";

import { Pressable } from "react-native";

const { width } = Dimensions.get("window");
const Imagewidth = width * 0.25;
const SmallImageWidth = width * 0.15;

function SportMain({ navigation }) {
  const Armypath = "../../assets/youngsan.webp";
>>>>>>> 929584e (02/22 09:41)

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          marginHorizontal: "3%",
<<<<<<< HEAD
          marginTop: "3%",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          얼음판 위엔 연아킴 비트위엔 vj 항상 기막힌
        </Text>
        <View style={{ flex: 1 }}>{views}</View>
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
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          marginHorizontal: "3%",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          스포츠 주요뉴스
        </Text>

        <View style={{ flex: 1 }}>{views2}</View>
=======
        }}
      >
        <View style={{ flex: 1, marginTop: "5%", backgroundColor: "white" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            역술인 '천공' 관저 개입 논란
          </Text>
          <Pressable
            onPress={() => navigation.navigate("SportContent")}
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
                source={require(Armypath)}
              />

              <View style={styles.textcontainer}>
                <Text style={{ fontWeight: "bold" }}>
                  경찰, '천공 의혹' 제기 김종대 前의원 조사…CCTV 확보 주력
                </Text>

                <Text
                  style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}
                  numberOfLines={2}
                >
                  "영상 삭제 여부도 확인 중"…120억대 사기 '인천 건축왕' 구속
                  (서울=연합뉴스) 임순현 기자 = 역술인 '천공'이 대통령 관저 이전
                  결정에 관여했다는 의혹을 수사 중인 경찰이 지난달 명예훼손 혐의
                  피고발인인 김종대 전 정의당 의원을 불러 조사했다.
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
            <Text>
              김종대 "천공 관저 답사 의혹, 육군본부 비서실 빅뉴스였다"
            </Text>
          </Pressable>
          <View style={[styles.divider, { marginVertical: "2%" }]} />
          <Text>경찰, '천공 의혹' 공관 CCTV 확보 나서…"수사 협조 요청"</Text>
          <View style={[styles.divider, { marginVertical: "2%" }]} />
          <Text>'천공 의혹' 부승찬 전 대변인 "아직 제 기록이 맞다고 생각"</Text>
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            정치 주요뉴스
          </Text>
          <View style={styles.divider} />

          <View style={styles.mainnews}>
            <Image
              style={{
                width: Imagewidth,
                height: Imagewidth * 0.6,
                backgroundColor: "black",
              }}
              source={require(Armypath)}
            />

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                박영선 "이재명 공천권 포기 선언? 신의 한 수 될 것"
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                sbs
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.mainnews}>
            <Image
              style={{
                width: Imagewidth,
                height: Imagewidth * 0.6,
                backgroundColor: "black",
              }}
              source={require(Armypath)}
            />

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                다시 부활한 '북한=적'...북풀루토눔 핵폭탄만 15개
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                sbs
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
        </View>
        <View style={styles.mainnews}>
          <Image
            style={{
              width: Imagewidth,
              height: Imagewidth * 0.6,
              backgroundColor: "black",
            }}
            source={require(Armypath)}
          />

          <View style={styles.textcontainer}>
            <Text style={{ fontWeight: "bold" }}>
              다시 부활한 '북한=적'...북풀루토눔 핵폭탄만 15개
            </Text>
            <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
              sbs
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.mainnews}>
          <Image
            style={{
              width: Imagewidth,
              height: Imagewidth * 0.6,
              backgroundColor: "black",
            }}
            source={require(Armypath)}
          />

          <View style={styles.textcontainer}>
            <Text style={{ fontWeight: "bold" }}>
              다시 부활한 '북한=적'...북풀루토눔 핵폭탄만 15개
            </Text>
            <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
              sbs
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.mainnews}>
          <Image
            style={{
              width: Imagewidth,
              height: Imagewidth * 0.6,
              backgroundColor: "black",
            }}
            source={require(Armypath)}
          />

          <View style={styles.textcontainer}>
            <Text style={{ fontWeight: "bold" }}>
              다시 부활한 '북한=적'...북풀루토눔 핵폭탄만 15개
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
>>>>>>> 929584e (02/22 09:41)
      </View>
      <View style={[styles.divider, { borderBottomWidth: 10 }]} />
    </ScrollView>
  );
}

export default SportMain;

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
    marginVertical: "1%",
  },
<<<<<<< HEAD
  firstViewContainer: {
    backgroundColor: "lightgrey",
    width: 150,
=======
  middle: {
    flex: 1,
    borderColor: "#e0e0e0",
    paddingVertical: "2%",

    marginVertical: "3%",
    borderTopWidth: 10,
    borderBottomWidth: 15,

    alignItems: "center",
>>>>>>> 929584e (02/22 09:41)
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
<<<<<<< HEAD
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
=======
>>>>>>> 929584e (02/22 09:41)
});
