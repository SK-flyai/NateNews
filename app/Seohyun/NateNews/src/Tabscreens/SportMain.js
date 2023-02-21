import React, { useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { Pressable, TouchableOpacity } from "react-native";
import data from "../flask/ranking.json";

const { width } = Dimensions.get("window");
const Imagewidth = width * 0.3;
const SmallImageWidth = width * 0.15;

function SportMain({ navigation }) {
  const Armypath = "../../assets/army.jpg";
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
    views.push(
      <View key={i}>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => navigation.navigate("SportContent", links[i])}
        >
          <View>
            <Image
              style={{
                width: SmallImageWidth,
                height: Imagewidth * 0.4,
                backgroundColor: "black",
                resizeMode: "stretch",
              }}
              source={{ uri: images[i] }}
            />

            <View>
              <Text style={{ fontWeight: "bold" }}>{titles[i]}</Text>
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
        }}
      >
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
                backgroundColor: "pink",
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
            스포츠 주요뉴스
          </Text>
          <View style={styles.divider} />
          <View>
            <Text>{views}</Text>
          </View>
        </View>

        <View style={styles.divider} />
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
