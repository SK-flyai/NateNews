import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import SportMain from "../../Tabscreens/SportMain";
import SportContent from "../../Tabscreens/SportContent";

const Stack = createStackNavigator();

const SportNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen // Page2 - '스포츠' Tab (뉴스 기사 목록)
        name="SportMain"
        component={SportMain}
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
        name="SportContent"
        component={SportContent}
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

export default SportNav;
