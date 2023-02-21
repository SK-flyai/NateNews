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
  Dimensions,
} from "react-native";
import { Divider } from "react-native-elements";
import Modal from "react-native-modal";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Foundation";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import axios from "axios";

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
  },
  modalContent: {
    backgroundColor: "white",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    height: "80%",
  },
  closeButton: {
    position: "absolute",
    top: 10,
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

var title = "";
var category = "";
var press = "";
var date = "";
var content = "";
var caption = "";
var img = "";

axios
  .get("http://192.168.1.10:5000/get_text")
  .then((response) => {
    title = response.data.title;
    category = response.data.category;
    press = response.data.press;
    date = response.data.date;
    content = response.data.content;
    caption = response.data.caption;
    img = response.data.img;
  })
  .catch((error) => {
    console.error(error);
  });

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 5px;
`;

const SportContent = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(null);

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

  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

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
              {title}
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
          <Text
            style={{
              padding: 5,
              marginTop: 10,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            "영상 삭제 여부도 확인 중"…120억대 사기 '인천 건축왕' 구속
          </Text>

          <TouchableOpacity onPress={imagePress}>
            <Image
              style={{ width: width, aspectRatio, marginTop: 15 }}
              source={{
                uri: img,
              }}
            />
          </TouchableOpacity>
          <Divider style={{ height: 5 }} />

          {/*Modal (팝업 바)*/}
          <Modal
            isVisible={isModalVisible}
            style={styles.bottomModal}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.modalContent}>
              <Pressable style={styles.closeButton} onPress={toggleModal}>
                <Text style={styles.closeButtonText}>X</Text>
              </Pressable>
              <ScrollView>
                <Text style={{ padding: 5, marginTop: 10, fontSize: 15 }}>
                  {content}
                </Text>
              </ScrollView>
            </View>
          </Modal>
          <View style={{ flex: 1 }}>
            <Text style={{ padding: 5, marginTop: 10, fontSize: 15 }}>
              {content}
            </Text>
            <Pressable
              onPress={toggleModal1}
              android_ripple={{ color: "#8EECF5" }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                backgroundColor: "#A3C4F3",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  // width: width,

                  fontSize: 15,
                }}
              >
                해당
              </Text>
            </Pressable>{" "}
            대통령실은 지난해 12월 의혹을 처음 제기한 김 전 의원 등을 경찰에
            고발했다. {"\n"}
            {"\n"}이달 3일에는 저서와 언론 인터뷰 등을 통해 "남영신 전
            육군참모총장이 '지난해 3월께 천공과 김용현 대통령 경호처장이
            참모총장 공관과 서울사무소를 사전 답사했다는 보고를 공관
            관리관으로부터 받았다'고 얘기했다"고 주장한 부승찬 전 국방부
            대변인과 이를 보도한 언론사 2곳을 추가로 고발했다{"\n"}
            {"\n"} 경찰은 또 천공이 육군참모총장 공관을 들렀다는 지난해 3월 공관
            폐쇄회로(CC)TV 영상 확보에도 주력하고 있다. 해당 영상이 보관기간
            규정 등을 준수해 삭제됐는지 여부도 확인 중이다{"\n"}
            {"\n"} 국수본 관계자는 "CCTV 영상 확보를 위해 수사 협조를
            요청했다"고 말했다.{"\n"}
            {"\n"} 경찰은 또 인천을 중심으로 120억원대 전세 보증금을 가로챈
            혐의를 받는 '건축왕' A(62)씨에 대해 새로운 증거를 확보해 이달 17일
            구속했다고 밝혔다.{"\n"}
            {"\n"} 경찰은 애초 지난해 12월 A씨와 공범 등의 구속영장을 청구했으나
            법원은 "피의자들이 심문에 임한 태도와 사회적 유대관계 등을 종합해 볼
            때 현 단계에서 구속의 필요성을 인정하기 어렵다"며 기각한 바 있다.
            {"\n"}
            {"\n"}
            <Pressable
              onPress={toggleModal2}
              android_ripple={{ color: "#8EECF5" }}
              style={{
                width: width * 0.95,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 4,

                backgroundColor: "#A3C4F3",
              }}
            >
              <View style={{ flex: 1, width: width * 0.95 }}>
                <Text
                  style={{
                    fontSize: 15,
                  }}
                >
                  Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal
                  Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal
                  Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal
                  Modal Modal
                </Text>
              </View>
            </Pressable>
          </View>
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
                <Text style={{ padding: 5, marginTop: 10, fontSize: 15 }}>
                  대통령실은 지난해 12월 의혹을 처음 제기한 김 전 의원 등을
                  경찰에 고발했다. {"\n"}
                  {"\n"}이달 3일에는 저서와 언론 인터뷰 등을 통해 "남영신 전
                  육군참모총장이 '지난해 3월께 천공과 김용현 대통령 경호처장이
                  참모총장 공관과 서울사무소를 사전 답사했다는 보고를 공관
                  관리관으로부터 받았다'고 얘기했다"고 주장한 부승찬 전 국방부
                  대변인과 이를 보도한 언론사 2곳을 추가로 고발했다{"\n"}
                  {"\n"} 경찰은 또 천공이 육군참모총장 공관을 들렀다는 지난해
                  3월 공관 폐쇄회로(CC)TV 영상 확보에도 주력하고 있다. 해당
                  영상이 보관기간 규정 등을 준수해 삭제됐는지 여부도 확인 중이다
                  {"\n"}
                  {"\n"} 국수본 관계자는 "CCTV 영상 확보를 위해 수사 협조를
                  요청했다"고 말했다.{"\n"}
                  {"\n"} 경찰은 또 인천을 중심으로 120억원대 전세 보증금을
                  가로챈 혐의를 받는 '건축왕' A(62)씨에 대해 새로운 증거를
                  확보해 이달 17일 구속했다고 밝혔다.{"\n"}
                  {"\n"} 경찰은 애초 지난해 12월 A씨와 공범 등의 구속영장을
                  청구했으나 법원은 "피의자들이 심문에 임한 태도와 사회적
                  유대관계 등을 종합해 볼 때 현 단계에서 구속의 필요성을
                  인정하기 어렵다"며 기각한 바 있다.{"\n"}
                  {"\n"}
                </Text>
              </ScrollView>
            </View>
          </Modal>
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

export default SportContent;
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
    padding: "7%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    height: "90%",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "red",
    borderRadius: 20,
    padding: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
