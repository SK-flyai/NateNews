<<<<<<< HEAD
import React, { useState } from "react";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
=======
import React, { useState, useEffect } from "react";
>>>>>>> 30a0c09 (230222 16:71)
import {
  Image,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Divider } from "react-native-elements";
import Modal from "react-native-modal";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Foundation";
<<<<<<< HEAD
=======
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
<<<<<<< HEAD
>>>>>>> a042843 (Initial commit)
=======
import data from "../flask/ranking.json";

var title = "";
var category = "";
var press = "";
var date = "";
var content = "";
var caption = "";
var img = "";

const SportContent = ({ route }) => {
  const link = route.params;

  title = data.spo[link].title;
  category = data.spo[link].category;
  press = data.spo[link].press;
  date = data.spo[link].date;
  content = data.spo[link].content;
  caption = data.spo[link].caption;
  for (var key in data.spo[link].image) {
    img = key;
    break;
  }

  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
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
  const newContect = content.replace(/ /g, "\u00A0");

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

          <TouchableOpacity onPress={toggleModal1}>
            <Image
              style={{ width: width, aspectRatio, marginTop: 15 }}
              source={{
                uri: img,
              }}
            />
          </TouchableOpacity>
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
            <Pressable
              onPress={toggleModal2}
              android_ripple={{ color: "purple" }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                backgroundColor: "yellow",
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
                  {newContect}
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

export default SportContent;
>>>>>>> 30a0c09 (230222 16:71)

const styles = StyleSheet.create({
  // 기사 제목 style
  container: {
    flex: 1,
    width: "100%",
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
<<<<<<< HEAD
  },
});

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 5px;
`;

const EntertainmentContent = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const Pic1path = "../../assets/Images/ArticlePic1.png";

  const [isModalVisible, setModalVisible] = useState(false);

  // 이미지 버튼 함수 (Modal에서 사용)
  const imagePress = () => {
    console.log("Image Clicked!");
    setModalVisible(true);
  };

  return (
    <Container insets={insets}>
      <Divider style={{ height: 30 }} />
      <View style={{ backgroundColor: "white" }}>
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
          편의점 직원 살해 후 달아난 30대男…16살부터 상습 강도질
          {"\n"}
        </Text>
        <Text style={{ color: "grey" }}>2023-02-08 22:14</Text>
        <Text style={{ color: "grey" }}>2023-02-09 18:56 {"<최종 수정>"}</Text>
        <Text style={{ color: "grey" }}>동아일보 원문</Text>
        <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}>
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
      <ScrollView
        style={[styles.container, { borderWidth: 1, borderColor: "#e0e0e0" }]}
      >
        <TouchableOpacity onPress={imagePress}>
          <Image
            style={{ width: 420, height: 210, marginTop: 15 }}
            source={require(Pic1path)}
          />
        </TouchableOpacity>
        <Divider style={{ height: 5 }} />

        {/*Modal (팝업 바)*/}
        <Modal isVisible={isModalVisible} style={styles.bottomModal}>
          <View style={styles.modalContent}>
            <Text>You Clicked On Modal !{"\n"}</Text>
            <Text>You Clicked On Modal !{"\n"}</Text>
            <Text>You Clicked On Modal !{"\n"}</Text>
            <Text>You Clicked On Modal !{"\n"}</Text>
            <Text>You Clicked On Modal !{"\n"}</Text>
            <Text>You Clicked On Modal !{"\n"}</Text>
            <Button title="Hide Modal" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
        <Text style={{ padding: 5, marginTop: 10, fontSize: 15 }}>
          인천에서 편의점 직원을 흉기로 찔러 살해한 뒤 위치추적
          전자장치(전자발찌)를 훼손하고 도주한 30대 남성이 10대 때부터 상습
          강도질을 해온 것으로 전해졌다.경찰은 이 남성의 사진을 공개하고 행방을
          쫓고 있다.{"\n"}
          {"\n"}9일 법조계와 경찰 등에 따르면 도주한 A 씨(32)는 16살 때인 2007년
          무면허 상태에서 오토바이를 훔쳐 달아나 절도 등 혐의로 소년보호 처분을
          받았다. 이후 수차례 특수절도 혐의로 체포돼 소년원에서 복역했다.{"\n"}
          {"\n"}2011년에는 소년원에서 나온 지 한 달도 되지 않아 특수강도 등
          5건의 범행을 잇달아 저질렀다. A 씨는 같은해 7월 같은 혐의로
          법원으로부터 징역 3년 6개월을 선고받고 복역하다가 2014년 5월
          가석방됐다. 2014년에는 인천 부평구의 한 중고명품 판매장에서 업주를
          흉기로 찌른 뒤 현금 80만 원을 훔쳐 달아났다가 경찰에 체포됐다. A 씨는
          이 사건으로 징역 7년, 전자발찌 부착 10년 명령을 받았다.{"\n"}
          {"\n"} A 씨는 전날 오후 10시 52분경 인천 계양구의 한 편의점에서 30대
          직원 B 씨를 흉기로 살해하고 도주했다. 그는 범행 후 계양구 효성동의 한
          아파트 인근에서 차고 있던 전자발찌를 훼손한 뒤 흰색 K5택시를 타고
          달아났다. 경찰에 따르면 A 씨는 키 170cm에 도주 당시 검은색 상하의를
          착용하고 있었다. 인천보호관찰소는 100여 명의 직원을 투입해 경찰과 함께
          폐쇄회로(CC)TV 등을 토대로 A 씨의 도주 경로를 추적 중이다.{"\n"}
          {"\n"}인천에서 편의점 직원을 흉기로 찔러 살해한 뒤 위치추적
          전자장치(전자발찌)를 훼손하고 도주한 30대 남성이 10대 때부터 상습
          강도질을 해온 것으로 전해졌다.경찰은 이 남성의 사진을 공개하고 행방을
          쫓고 있다.{"\n"}
          {"\n"}9일 법조계와 경찰 등에 따르면 도주한 A 씨(32)는 16살 때인 2007년
          무면허 상태에서 오토바이를 훔쳐 달아나 절도 등 혐의로 소년보호 처분을
          받았다. 이후 수차례 특수절도 혐의로 체포돼 소년원에서 복역했다.{"\n"}
          {"\n"}2011년에는 소년원에서 나온 지 한 달도 되지 않아 특수강도 등
          5건의 범행을 잇달아 저질렀다. A 씨는 같은해 7월 같은 혐의로
          법원으로부터 징역 3년 6개월을 선고받고 복역하다가 2014년 5월
          가석방됐다. 2014년에는 인천 부평구의 한 중고명품 판매장에서 업주를
          흉기로 찌른 뒤 현금 80만 원을 훔쳐 달아났다가 경찰에 체포됐다. A 씨는
          이 사건으로 징역 7년, 전자발찌 부착 10년 명령을 받았다.{"\n"}
          {"\n"} A 씨는 전날 오후 10시 52분경 인천 계양구의 한 편의점에서 30대
          직원 B 씨를 흉기로 살해하고 도주했다. 그는 범행 후 계양구 효성동의 한
          아파트 인근에서 차고 있던 전자발찌를 훼손한 뒤 흰색 K5택시를 타고
          달아났다. 경찰에 따르면 A 씨는 키 170cm에 도주 당시 검은색 상하의를
          착용하고 있었다. 인천보호관찰소는 100여 명의 직원을 투입해 경찰과 함께
          폐쇄회로(CC)TV 등을 토대로 A 씨의 도주 경로를 추적 중이다.
        </Text>
      </ScrollView>
    </Container>
  );
};

export default EntertainmentContent;
=======
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
>>>>>>> 30a0c09 (230222 16:71)
