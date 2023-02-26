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

function ScienceMain({ navigation }) {
  const links = [];
  const titles = [];
  const categories = [];
  const presses = [];
  const dates = [];
  const contents = [];
  const images = [];
  var urlLink = "";
  const [result, setResult] = useState(null);

  const urlPushClick = (titlesend, docsend) => {
    console.log(`urlPushClicked`);
    fetch("http://172.30.121.76:5000/push_url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: titlesend, doc: docsend }),
    })
      .then((response) => response.json())
      .then((data) => setResult(data.message))
      .catch((error) => setResult(error.message));
  };

  for (var key in data.its) {
    links.push(key);
    titles.push(data.its[key].title);
    categories.push(data.its[key].category);
    presses.push(data.its[key].press);
    dates.push(data.its[key].date);
    contents.push(data.its[key].content);
    for (var key2 in data.its[key].image) {
      images.push(key2);
      break;
    }
  }

  const views = [];
  for (let i = 0; i < 5; i++) {
    const urlsend = links[i];
    const titlesend = titles[i];
    const docsend = contents[i];
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
      <View style={{ marginVertical: "2%" }} />
    ) : (
      <View style={styles.divider} />
    );

    views.push(
      <View styles={{ flex: 1 }} key={i}>
        {newDivider}
        <TouchableOpacity
          onPress={() => {
            // urlPushClick(urlsend);
            urlPushClick(titlesend, docsend);
            navigation.navigate("ScienceContent", links[i]);
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
  for (let i = 5; i < 10; i++) {
    const urlsend = links[i];
    const titlesend = titles[i];
    const docsend = contents[i];
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
            // urlPushClick(urlsend);
            urlPushClick(titlesend, docsend);
            navigation.navigate("ScienceContent", links[i]);
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

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          marginHorizontal: "3%",
          marginTop: "3%",
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>경제 인기뉴스</Text>
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>경제 주요뉴스</Text>

        <View style={{ flex: 1 }}>{views2}</View>
      </View>

      <View style={[styles.divider, { borderBottomWidth: 10 }]} />
    </ScrollView>
  );
}

export default ScienceMain;

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
