import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 5px;
`;

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
      if (isModalVisible) {
        setModalVisible(false);
        return true; // indicate that the back key was handled
      }
      return false; // default behavior of back key
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
  }, [isModalVisible]);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // 이미지 버튼 함수 (Modal에서 사용)
  const imagePress = () => {
    console.log("Image Clicked!");
    setModalVisible(true);
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
              onPress={imagePress}
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SportContent;
