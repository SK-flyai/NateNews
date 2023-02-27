import React, { useState, useEffect, useRef } from "react";
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
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");
import data from "../flask/ranking.json";
import data2 from "../flask/recommend.json";
import { useRoute } from "@react-navigation/native";

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
var press = "";
var date = "";
var content = "";
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
let vv = [];

const TotalContent2 = ({}) => {
  const navigation = useNavigation();
  const [count, setCount] = useState(0);
  const [result, setResult] = useState(null);
  const scrollViewRef = useRef();

  const Refresh = () => {
    setCount(count + 1);
  };

  const route = useRoute();
  const param1 = route.params.param1; //LINK
  const param2 = route.params.param2; //KEYWORD
  const param3 = route.params.param3; //TITLE
  const param4 = route.params.param4; //PRESS
  const param5 = route.params.param5; //DATE
  const param6 = route.params.param6; //CONTENT
  const param7 = route.params.param7; //IMAGE
  console.log("Parameters");
  console.log(param1);
  console.log(param2);
  console.log(param3);
  console.log(param4);
  console.log(param5);
  console.log(param6);
  console.log(param7);

  title = param3;
  press = param4;
  date = param5;
  content = param6;
  //img = param7;

  for (var keyy in param7) {
    img = keyy;
    break;
  }

  const [aspectRatio, setAspectRatio] = useState(null);

  const CloseModal = () => {
    setModalVisible1(!isModalVisible1);
  };

  const [isModalVisible1, setModalVisible1] = useState(false);
  const toggleModal1 = (keywordnum) => {
    setModalVisible1(!isModalVisible1);
    console.log(keywordnum);
    modalLink = recLinks[keywordnum];
    lenlen = recLinks[keywordnum].length;
    modalTitle = recTitles[keywordnum];
    modalPress = recPresses[keywordnum];
    modalDate = recDates[keywordnum];
    modalContent = recContents[keywordnum];
    modalImage = recImages[keywordnum];
    CloseModal();
    if (!isModalVisible1) {
      vv = [];

      for (let i = 0; i < lenlen; i++) {
        const title = (String(i + 1) + ". " + modalTitle[i]).replace(
          / /g,
          "\u00A0"
        );
        vv.push(
          <View key={i} style={{ width: width * 0.85 }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible1(false);
                console.log(modalLink[i]);
                console.log(recKeywords);
                scrollViewRef.current.scrollTo({ y: 0 });
                fetch("http://192.168.0.13:5000/push_url", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    title: modalTitle[i],
                    doc: modalContent[i],
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => setResult(data.message))
                  .catch((error) => setResult(error.message));

                navigation.navigate("TotalContent2", {
                  param1: modalLink[i],
                  param2: recKeywords[i],
                  param3: modalTitle[i],
                  param4: modalPress[i],
                  param5: modalDate[i],
                  param6: modalContent[i],
                  param7: modalImage[i],
                });
                Refresh();
              }}
            >
              <View>
                <Text>{title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
      console.log("1312312312313123123");
    }
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
      if (isModalVisible1) {
        setModalVisible1(false);

        return true; // indicate that the back key was handled
      }
      return false; // default behavior of back key
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, [isModalVisible1]);
  const newContect = content.replace(/ /g, "\u00A0");

  keywordlist = Array.from({ length: keywordcnt }, (_, i) => {
    const keywordnum = i;
    return (
      <Pressable
        key={i}
        onPress={() => toggleModal1(i)}
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
            toggleModal1();
            navigation.navigate("TotalContent2", {
              param1: "https://news.nate.com/view/20230226n07184",
              param2: "이승우",
            });
            Refresh();
          }}
        >
          <View>
            <Text>SESESESESESESE</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { borderWidth: 1, borderColor: "#e0e0e0" }]}
    >
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1, borderWidth: 1, borderColor: "#e0e0e0" }}
        >
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
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>{keywordlist}</Text>
            </View>
          </View>

          {/*Modal (팝업 바)*/}
          <Modal
            visible={isModalVisible1}
            style={styles.bottomModal}
            onRequestClose={() => {
              if (isModalVisible1) {
                setModalVisible1(false);
              }
            }}
          >
            <View style={styles.modalContent}>
              <Pressable style={styles.closeButton} onPress={CloseModal}>
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
                    <TouchableOpacity onPress={CloseModal}>
                      <Text style={{ width: width }}>{vv}</Text>
                    </TouchableOpacity>
                  </View>
                </Text>
              </ScrollView>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TotalContent2;

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
    height: "80%",
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
