<<<<<<< HEAD
// 상단 탭 기준 종합
// 상단 탭 기준 종합
// 상단 탭 기준 종합
// 상단 탭 기준 종합

=======
>>>>>>> 30a0c09 (230222 16:71)
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { Pressable, TouchableOpacity } from "react-native";
import data from "../flask/ranking.json";

const { width } = Dimensions.get("window");
const Imagewidth = width * 0.3;
const SmallImageWidth = width * 0.15;

function SportMain({ navigation }) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
  const Armypath = "../../assets/army.jpg";
>>>>>>> 929584e (02/22 09:41)
=======
>>>>>>> 30a0c09 (230222 16:71)
  const links = [];
  const titles = [];
  const categories = [];
  const presses = [];
  const dates = [];
  const contents = [];
  const images = [];
<<<<<<< HEAD
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

=======
>>>>>>> 929584e (02/22 09:41)
  for (var key in data.spo) {
    links.push(key);
    titles.push(data.spo[key].title);
    categories.push(data.spo[key].category);
    presses.push(data.spo[key].press);
    dates.push(data.spo[key].date);
    contents.push(data.spo[key].content);
    for (var key2 in data.spo[key].image) {
<<<<<<< HEAD
=======
      // console.log(data.spo[key].image[key2]);
>>>>>>> 929584e (02/22 09:41)
      images.push(key2);
      break;
    }
  }
<<<<<<< HEAD
<<<<<<< HEAD

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

=======
=======

>>>>>>> 005848f (230222 19:09)
  const views = [];
  for (let i = 0; i < 5; i++) {
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
    const news = isFirstView ? contents[0] : null;
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
          onPress={() => navigation.navigate("SportContent", links[i])}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            {fview}

            <View style={nameView}>
              <Text numberOfLines={num} style={{ fontWeight: "bold" }}>
                {titles[i].replace(/ /g, "\u00A0")}
              </Text>
              {/* <Text numberOfLines={2}>{news}</Text> */}
              {/* <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                {presses[i]}
              </Text> */}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  const views2 = [];
  for (let i = 5; i < 20; i++) {
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
          onPress={() => navigation.navigate("SportContent", links[i])}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Image style={Istyle} source={{ uri: images[i] }} />

<<<<<<< HEAD
            <View>
              <Text style={{ fontWeight: "bold" }}>{titles[i]}</Text>
>>>>>>> 929584e (02/22 09:41)
=======
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
<<<<<<< HEAD
>>>>>>> 93555d0 (230222 11:58)
=======

>>>>>>> 005848f (230222 19:09)
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                {presses[i]}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 005848f (230222 19:09)
        style={{
          flex: 1,
          backgroundColor: "white",
          marginHorizontal: "3%",
          marginTop: "3%",
        }}
      >
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 005848f (230222 19:09)
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
<<<<<<< HEAD
=======
        <View style={{ flex: 1, marginTop: "5%", backgroundColor: "white" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            병역비리 적발
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
                  [단독] "통화했다, 5급" 녹취 입수…병무청 직원과 유착 정황
                </Text>

                <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                  저희 JTBC가 병역 비리 브로커의 통화 녹취록을 입수했습니다.
                  브로커는 신체검사 직후 "병무청 직원과 통화를 했고, 5급이
                  나왔다"고
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
            <Text>"병역면제? 진짜 뇌전증 환자는 입대 원해"</Text>
          </Pressable>
          <View style={[styles.divider, { marginVertical: "2%" }]} />
          <Text>
            "아들이 정신 잃고 몸을 떤다"... 군대 안보내려 뇌전등 허위신고한
            어머니
          </Text>
          <View style={[styles.divider, { marginVertical: "2%" }]} />
          <Text>"병역면제? 진짜 뇌전증 환자는 입대 원해"</Text>
        </View>

>>>>>>> 929584e (02/22 09:41)
=======
>>>>>>> 005848f (230222 19:09)
        <View
          style={[
            styles.middle,
            { borderLeftWidth: 1 },
            { borderRightWidth: 1 },
          ]}
        >
          <Text>20대 대통령 윤석열</Text>
        </View>
<<<<<<< HEAD
<<<<<<< HEAD
        <View style={styles.middle}>
          <Text>코로나 19 현황</Text>
        </View>
=======

        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            스포츠 주요뉴스
          </Text>

          <View style={{ flex: 1 }}>{views}</View>
        </View>

        <View style={styles.divider} />
>>>>>>> 929584e (02/22 09:41)
=======
        style={{ flex: 1, backgroundColor: "white", marginHorizontal: "3%" }}
=======
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
>>>>>>> 005848f (230222 19:09)
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          스포츠 주요뉴스
        </Text>

<<<<<<< HEAD
        <View style={{ flex: 1 }}>{views}</View>
>>>>>>> 30a0c09 (230222 16:71)
      </View>
<<<<<<< HEAD
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
      </View>
=======
>>>>>>> 93555d0 (230222 11:58)

      <View style={styles.divider} />

=======
        <View style={{ flex: 1 }}>{views2}</View>
      </View>
>>>>>>> 005848f (230222 19:09)
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
  firstViewContainer: {
    backgroundColor: "lightgrey",
    width: 150,
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
});
