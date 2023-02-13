import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import EconomicMain from "../../Tabscreens/EconomicMain";
import EconomicContent from "../../Tabscreens/EconomicContent";

const Stack = createStackNavigator();

const EconomicNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen // Page2 - '경제' Tab (뉴스 기사 목록)
        name="EconomicMain"
        component={EconomicMain}
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

      <Stack.Screen // Page3 - '경제' Tab (뉴스 기사 본문)
        name="EconomicContent"
        component={EconomicContent}
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

export default EconomicNav;
