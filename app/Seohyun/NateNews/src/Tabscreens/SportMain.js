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
  for (var key in data.spo) {
    links.push(key);
    titles.push(data.spo[key].title);
    categories.push(data.spo[key].category);
    presses.push(data.spo[key].press);
    dates.push(data.spo[key].date);
    contents.push(data.spo[key].content);
    for (var key2 in data.spo[key].image) {
      // console.log(data.spo[key].image[key2]);
      images.push(key2);
      break;
    }
  }
  const views = [];
  for (let i = 0; i < 20; i++) {
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

    views.push(
      <View styles={{ flex: 1 }} key={i}>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => navigation.navigate("SportContent", links[i])}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Image style={Istyle} source={{ uri: images[i] }} />

            <View
              style={{
                marginLeft: "1%",
                width: width - (imageWidth + 20),
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
        style={{ flex: 1, backgroundColor: "white", marginHorizontal: "3%" }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          스포츠 주요뉴스
        </Text>

        <View style={{ flex: 1 }}>{views}</View>
      </View>

      <View style={styles.divider} />

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
});
