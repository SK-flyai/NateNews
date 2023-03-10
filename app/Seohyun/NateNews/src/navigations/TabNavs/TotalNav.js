import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import TotalMain from "../../Tabscreens/TotalMain";
import TotalContent from "../../Tabscreens/TotalContent";
import TotalContent2 from "../../Tabscreens/TotalContent2";
const Stack = createStackNavigator();

const TotalNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen // Page2 - '스포츠' Tab (뉴스 기사 목록)
        name="TotalMain"
        component={TotalMain}
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
        name="TotalContent"
        component={TotalContent}
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
        name="TotalContent2"
        component={TotalContent2}
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

export default TotalNav;
