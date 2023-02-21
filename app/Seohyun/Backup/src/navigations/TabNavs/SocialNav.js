import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import SocialMain from "../../Tabscreens/SocialMain";
import SocialContent from "../../Tabscreens/SocialContent";

const Stack = createStackNavigator();

const SocialNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen // Page2 - '사회' Tab (뉴스 기사 목록)
        name="SocialMain"
        component={SocialMain}
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

      <Stack.Screen // Page3 - '사회' Tab (뉴스 기사 본문)
        name="SocialContent"
        component={SocialContent}
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

export default SocialNav;
