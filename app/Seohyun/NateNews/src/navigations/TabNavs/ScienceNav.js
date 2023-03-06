import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import ScienceMain from "../../Tabscreens/ScienceMain";
import ScienceContent from "../../Tabscreens/ScienceContent";
import ScienceContent2 from "../../Tabscreens/ScienceContent2";
const Stack = createStackNavigator();

const ScienceNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen // Page2 - '스포츠' Tab (뉴스 기사 목록)
        name="ScienceMain"
        component={ScienceMain}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#FA5858",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
            color: "#ffffff",
            ...Platform.select({
              ios: {
                fontFamily: "Futura",
              },
              android: {
                fontFamily: "monospace",
              },
            }),
          },
        }}
      />

      <Stack.Screen // Page3 - '스포츠' Tab (뉴스 기사 본문)
        name="ScienceContent"
        component={ScienceContent}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#FA5858",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
            color: "#ffffff",
            ...Platform.select({
              ios: {
                fontFamily: "Futura",
              },
              android: {
                fontFamily: "monospace",
              },
            }),
          },
        }}
      />
      <Stack.Screen // Page3 - '스포츠' Tab (뉴스 기사 본문)
        name="ScienceContent2"
        component={ScienceContent2}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#FA5858",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
            color: "#ffffff",
            ...Platform.select({
              ios: {
                fontFamily: "Futura",
              },
              android: {
                fontFamily: "monospace",
              },
            }),
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ScienceNav;
