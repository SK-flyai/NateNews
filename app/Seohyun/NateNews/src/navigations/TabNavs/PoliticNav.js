import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import PoliticMain from "../../Tabscreens/PoliticMain";
import PoliticContent from "../../Tabscreens/PoliticContent";
import PoliticContent2 from "../../Tabscreens/PoliticContent2";

const Stack = createStackNavigator();

const PoliticNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen // Page2 - '스포츠' Tab (뉴스 기사 목록)
        name="PoliticMain"
        component={PoliticMain}
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
        name="PoliticContent"
        component={PoliticContent}
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
        name="PoliticContent2"
        component={PoliticContent2}
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

export default PoliticNav;
