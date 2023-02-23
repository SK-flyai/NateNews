import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import {
  SportNav,
  EntertainmentNav,
  PoliticNav,
  EconomicNav,
  SocialNav,
  WorldNav,
} from "./TabNavs/index";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const TopTab = createMaterialTopTabNavigator();

const TopTabNavigation = () => {
  const { width } = Dimensions.get("window");
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarItemStyle: { width: width * 0.2 },

        tabBarScrollEnabled: true,
        tabBarPosition: "top",
      }}
    >
      <TopTab.Screen name="종합" component={SportNav} />
      {/*Page2 - 스포츠 Tab*/}

      <TopTab.Screen name="시사" component={EntertainmentNav} />
      {/*Page2 - 연예 Tab*/}

      <TopTab.Screen name="스포츠" component={PoliticNav} />
      {/*Page2 - 정치 Tab*/}

      <TopTab.Screen name="정치" component={EconomicNav} />
      {/*Page2 - 경제 Tab*/}

      <TopTab.Screen name="경제" component={SocialNav} />
      {/*Page2 - 사회 Tab*/}

      <TopTab.Screen name="사회" component={WorldNav} />
      {/*Page2 - 사회 Tab*/}
      <TopTab.Screen name="세계" component={WorldNav} />
      {/*Page2 - 사회 Tab*/}
      <TopTab.Screen name="IT/과학" component={WorldNav} />
      {/*Page2 - 사회 Tab*/}
    </TopTab.Navigator>
  );
};

export default TopTabNavigation;
