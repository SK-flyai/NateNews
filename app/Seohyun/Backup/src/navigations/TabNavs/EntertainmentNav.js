import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import EntertainmentMain from "../../Tabscreens/EntertainmentMain";
import EntertainmentContent from "../../Tabscreens/EntertainmentContent";

const Stack = createStackNavigator();

const EntertainmentNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen // Page2 - '연예' Tab (뉴스 기사 목록)
        name="EntertainmentMain"
        component={EntertainmentMain}
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

      <Stack.Screen // Page3 - '연예' Tab (뉴스 기사 본문)
        name="EntertainmentContent"
        component={EntertainmentContent}
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

export default EntertainmentNav;
