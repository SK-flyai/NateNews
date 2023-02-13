import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import WorldMain from "../../Tabscreens/WorldMain";
import WorldContent from "../../Tabscreens/WorldContent";

const Stack = createStackNavigator();

const WorldNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen // Page2 - '세계' Tab (뉴스 기사 목록)
        name="WorldMain"
        component={WorldMain}
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

      <Stack.Screen // Page3 - '세계' Tab (뉴스 기사 본문)
        name="WorldContent"
        component={WorldContent}
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

export default WorldNav;
