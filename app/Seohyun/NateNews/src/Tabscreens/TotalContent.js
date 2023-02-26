import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  BackHandler,
  SafeAreaView,
} from "react-native";
import { Divider } from "react-native-elements";
import Modal from "react-native-modal";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Foundation";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import data from "../flask/ranking.json";
import data2 from "../flask/recommend.json";
const Imagewidth = width * 0.3;
const SmallImageWidth = width * 0.15;

const recSentences = [];
const recKeywords = [];
const recLinks = [];

const recImages = [];
const recTitles = [];
const recContents = [];
const recDates = [];
const recPresses = [];

var tempTitle = [];
var tempPress = [];
var tempDate = [];
var tempContent = [];
var tempImage = [];

let keywordnum = 0;

var title = "";
var category = "";
var press = "";
var date = "";
var content = "";
var caption = "";
var img = "";

for (var key1 in data2.keyword) {
  recKeywords.push(key1 + "  ");
  recLinks.push(Object.keys(data2.keyword[key1]));
  tempTitle = [];
  tempPress = [];
  tempDate = [];
  tempContent = [];
  tempImage = [];

  console.log("--------------------------------------");
  for (var key2 in data2.keyword[key1]) {
    tempTitle.push(data2.keyword[key1][key2].title + "\n\n");
    tempPress.push(data2.keyword[key1][key2].press);
    tempDate.push(data2.keyword[key1][key2].date);
    tempContent.push(data2.keyword[key1][key2].content);
    tempImage.push(data2.keyword[key1][key2].image);
  }
  recTitles.push(tempTitle);
  recImages.push(tempImage);
  recPresses.push(tempPress);
  recDates.push(tempDate);
  recContents.push(tempContent);
}

// for (var i in recTitles) {
//   console.log(i);
//   for (var j in recTitles[i]) {
//     console.log(recTitles[i][j]);
//     console.log(recPresses[i][j]);
//     console.log(recDates[i][j]);
//   }
// }

for (var key2 in data2.sentence) {
  recSentences.push(data2.sentence[key2].replace(/ /g, "\u00A0") + "\n\n");
}

let keywordcnt = recKeywords.length;
let keywordlist = [];
let modalTitle = [];
let modalPress = [];
let modalLink = [];
let modalDate = [];
let modalContent = [];
let modalImage = [];

const TotalContent = ({ route, navigation }) => {
  const link = route.params;

  const [count, setCount] = useState(0);
  const Refresh = () => {
    setCount(count + 1);
  };
  if (count == 0) {
    title = data.all[link].title;
    category = data.all[link].category;
    press = data.all[link].press;
    date = data.all[link].date;
    content = data.all[link].content;
    caption = data.all[link].caption;
  }
  for (var key3 in data.all[link].image) {
    img = key3;
    break;
  }

  const [aspectRatio, setAspectRatio] = useState(null);
  console.log("CNT : ", count);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  const [isModalVisible1, setModalVisible1] = useState(false);
  const toggleModal1 = (keywordnum) => {
    setModalVisible1(!isModalVisible1);
    console.log(keywordnum);
    modalLink = recLinks[keywordnum];
    modalTitle = recTitles[keywordnum];
    modalPress = recPresses[keywordnum];
    modalDate = recDates[keywordnum];
    modalContent = recContents[keywordnum];
    modalImage = recImages[keywordnum];
  };

  useEffect(() => {
    Image.getSize(
      img,
      (width, height) => {
        setAspectRatio(width / height);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  useEffect(() => {
    const handleBackButton = () => {
      if (isModalVisible1 || isModalVisible2) {
        setModalVisible1(false);
        setModalVisible2(false);
        return true; // indicate that the back key was handled
      }
      return false; // default behavior of back key
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, [isModalVisible1, isModalVisible2]);
  const newContect = content.replace(/ /g, "\u00A0");

  keywordlist = Array.from({ length: keywordcnt }, (_, i) => {
    const keywordnum = i;
    return (
      <Pressable
        onPress={() => toggleModal1(i + 1)}
        android_ripple={{ color: "#e0e0e0" }}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
          }}
        >
          {"#"}
          {recKeywords[i]}
        </Text>
      </Pressable>
    );
  });

  //

  const views3 = [];
  for (let i = 0; i < keywordcnt; i++) {
    const urlsend = recLinks[i];
    views3.push(
      <View>
        <TouchableOpacity
          onPress={() => {
            console.log(title);
            title =
              data2.keyword["손흥민"][
                "https://news.nate.com/view/20230224n21994"
              ].title;
            category =
              data2.keyword["손흥민"][
                "https://news.nate.com/view/20230224n21994"
              ].category;
            press =
              data2.keyword["손흥민"][
                "https://news.nate.com/view/20230224n21994"
              ].press;
            date =
              data2.keyword["손흥민"][
                "https://news.nate.com/view/20230224n21994"
              ].date;
            content =
              data2.keyword["손흥민"][
                "https://news.nate.com/view/20230224n21994"
              ].content;
            caption =
              data2.keyword["손흥민"][
                "https://news.nate.com/view/20230224n21994"
              ].caption;
            toggleModal1();
            Refresh();
            console.log(title);
          }}
        >
          <View style={{ width: width * 0.8 }}>
            <Text>"말씀 중에 죄송합니다. 절대 월드클래스 아닙니다."</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  console.log(recLinks[0]);
  //
  console.log("TTT : ", title);
  return (
    <SafeAreaView
      style={[styles.container, { borderWidth: 1, borderColor: "#e0e0e0" }]}
    >
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView style={{ flex: 1, borderWidth: 1, borderColor: "#e0e0e0" }}>
          {/* <Divider style={{ height: 30 }} /> */}
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <Text
              style={{
                fontSize: 17,
                ...Platform.select({
                  ios: {
                    fontFamily: "Futura",
                  },
                  android: {
                    fontFamily: "monospace",
                  },
                }),
              }}
            >
              {/* 편의점 직원 살해 후 달아난 30대男…16살부터 상습 강도질
              {"\n"} */}
              {title.replace(/ /g, "\u00A0")}
            </Text>
            <Text style={{ color: "grey" }}>{date}</Text>
            <Text style={{ color: "grey" }}>{press}</Text>
            <View
              style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}
            >
              {/*댓글 버튼*/}
              <TouchableOpacity style={{ marginRight: 15 }}>
                <Icon3 name="comments" size={30} color="black" />
              </TouchableOpacity>

              {/*공유 버튼*/}
              <TouchableOpacity>
                <Icon2 name="share-alternative" size={30} color="black" />
              </TouchableOpacity>
            </View>
            {/* 기사 제목, 날짜, 언론사 정보 가져와서 여기 넣기*/}
          </View>
          <Divider style={{ height: 5 }} />

          <Image
            style={{
              width: width,
              aspectRatio,
              marginTop: 15,
              // resizeMode: "contain",
              // height: width * aspectRatio,
            }}
            source={{
              uri: img,
            }}
          />

          <Divider style={{ height: 5 }} />

          <View style={{ flex: 1 }}>
            <Text
              style={{
                padding: 5,
                marginTop: 10,
                fontSize: 15,
              }}
            >
              {newContect}
            </Text>
            <View style={{ marginTop: "5%", marginLeft: "3%" }}>
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                핵심 문장
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>{"\n"}</Text>

              <View
                style={{
                  flex: 1,
                  width: width * 0.85,
                  // backgroundColor: "#edede9",
                  backgroundColor: "#edf2f4",
                  borderRadius: 6,
                  padding: "5%",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                  }}
                >
                  {recSentences}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: "5%", marginLeft: "3%" }}>
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                주요 키워드
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: width,
                marginVertical: "5%",
                // alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <Text>{keywordlist}</Text>
            </View>
          </View>

          {/*Modal (팝업 바)*/}
          <Modal
            visible={isModalVisible1}
            style={styles.bottomModal}
            onRequestClose={toggleModal1}
          >
            <View style={styles.modalContent}>
              <Pressable style={styles.closeButton} onPress={toggleModal1}>
                <Text style={styles.closeButtonText}>X</Text>
              </Pressable>
              <ScrollView>
                <Text
                  style={{
                    padding: 5,
                    marginTop: 10,
                    fontSize: 15,
                  }}
                >
                  <View>
                    <View>{views3}</View>
                    <Text>HI</Text>
                  </View>
                </Text>
              </ScrollView>
            </View>
          </Modal>

          {/* 모달 2 */}
          <Modal
            visible={isModalVisible2}
            style={styles.bottomModal}
            onRequestClose={toggleModal2}
          >
            <View style={styles.modalContent}>
              <Pressable style={styles.closeButton} onPress={toggleModal2}>
                <Text style={styles.closeButtonText}>X</Text>
              </Pressable>
              <ScrollView>
                <Text style={{ padding: 5, marginTop: 10, fontSize: 15 }}>
                  mdoal2
                </Text>
              </ScrollView>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TotalContent;

const styles = StyleSheet.create({
  // 기사 제목 style
  container: {
    flex: 1,
    width: width,
    paddingHorizontal: "1%",
    backgroundColor: "white",
  },
  item: {
    padding: 18,
    marginHorizontal: 0,
  },
  separator: {
    backgroundColor: "#e0e0e0",
    height: 1,
  },
  title: {
    fontSize: 16,
    ...Platform.select({
      ios: {
        fontFamily: "Futura",
      },
      android: {
        fontFamily: "monospace",
      },
    }),
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: "6%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    height: "85%",
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 10,
    backgroundColor: "red",
    borderRadius: 20,
    padding: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
