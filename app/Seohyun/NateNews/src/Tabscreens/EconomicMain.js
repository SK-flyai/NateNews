import React, { useState, useEffect } from "react";
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
  TouchableHighlight,
} from "react-native";
import { Divider } from "react-native-elements";
import { Button } from "react-native-elements";
import Modal from "react-native-modal";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Foundation";
import { Dimensions } from "react-native";
import { color } from "react-native-reanimated";
const { width } = Dimensions.get("window");
import Hyperlink from "react-native-hyperlink";
const EconomicMain = ({ navigation }) => {
  // 이미지 버튼 함수 (Modal에서 사용)

  return (
    <View>
      <Text>
        <Pressable>
          <Text>This </Text>
        </Pressable>

        <Text>This writing should fill most of the conasdfasdftainer</Text>
      </Text>
    </View>
  );
};

export default EconomicMain;

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
