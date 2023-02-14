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

const TopTab = createMaterialTopTabNavigator();

const TopTabNavigation = () => {
  return (
    <TopTab.Navigator tabBarPosition="top">
      <TopTab.Screen name="스포츠" component={SportNav} />
      {/*Page2 - 스포츠 Tab*/}

      <TopTab.Screen name="연예" component={EntertainmentNav} />
      {/*Page2 - 연예 Tab*/}

      <TopTab.Screen name="정치" component={PoliticNav} />
      {/*Page2 - 정치 Tab*/}

      <TopTab.Screen name="경제" component={EconomicNav} />
      {/*Page2 - 경제 Tab*/}

      <TopTab.Screen name="사회" component={SocialNav} />
      {/*Page2 - 사회 Tab*/}

      <TopTab.Screen name="세계" component={WorldNav} />
      {/*Page2 - 사회 Tab*/}
    </TopTab.Navigator>
  );
};

export default TopTabNavigation;
