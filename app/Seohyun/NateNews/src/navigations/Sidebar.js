import React from "react";
import { Image, View, Platform, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import MainPage from "./MainPage";
import { Button } from "../components";
import Tab from "./Tab";

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  drawerLabel: {
    fontSize: 17,
  },
  button: {
    backgroundColor: "#a6a6a6",
  },
});

const Sidebar = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main" // 초기 화면 -> Main.js (Page1)
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FA5858",
        },
        drawerStyle: {
          backgroundColor: "#F2F2F2",
        },
        drawerActiveTintColor: "#FA5858",
      }}
      drawerContent={(props) => (
        <View>
          <Image
            style={{
              width: 120,
              height: 120,
              alignSelf: "center",
              marginTop: 50,
              marginBottom: 20,
              borderRadius: 20,
            }}
            source={require("../../assets/IM1.png")}
          />
          <View style={{ backgroundColor: "#ffffff" }}>
            <DrawerItemList {...props} />
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              backgroundColor: "#F2F2F2",
            }}
          >
            <View
              style={{
                width: "45%",
                marginLeft: "3%",
                marginRight: "3%",
              }}
            >
              <Button
                title="로그인"
                onPress={() => console.log("Button 1 pressed")}
                textStyle={{
                  color: "white",
                  fontWeight: "bold",
                }}
                containerStyle={styles.button}
              />
            </View>
            <View style={{ width: "45%", marginRight: "3%" }}>
              <Button
                title="공지사항"
                onPress={() => console.log("Button 2 pressed")}
                textStyle={{
                  color: "white",
                  fontWeight: "bold",
                }}
                containerStyle={styles.button}
              />
            </View>
          </View>
        </View>
      )}
    >
      <Drawer.Screen // 사이드바 - 네이트 (클릭 시 Page1로 이동)
        name="Nate"
        component={MainPage}
        options={{
          drawerLabel: "네이트",
          drawerLabelStyle: styles.drawerLabel,
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

      <Drawer.Screen // 사이드바 - 뉴스 (클릭 시 Page2로 이동)
        name="News"
        component={Tab}
        options={{
          drawerLabel: "뉴스",
          drawerLabelStyle: styles.drawerLabel,
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

      <Drawer.Screen
        name="Blank1"
        component={MainPage}
        options={{ drawerLabel: "연예", drawerLabelStyle: styles.drawerLabel }}
      />

      <Drawer.Screen
        name="Blank2"
        component={MainPage}
        options={{ drawerLabel: "판", drawerLabelStyle: styles.drawerLabel }}
      />

      <Drawer.Screen
        name="Blank3"
        component={MainPage}
        options={{ drawerLabel: "날씨", drawerLabelStyle: styles.drawerLabel }}
      />

      <Drawer.Screen
        name="Blank4"
        component={MainPage}
        options={{ drawerLabel: "운세", drawerLabelStyle: styles.drawerLabel }}
      />

      <Drawer.Screen
        name="Blank5"
        component={MainPage}
        options={{ drawerLabel: "썰", drawerLabelStyle: styles.drawerLabel }}
      />

      <Drawer.Screen
        name="Blank6"
        component={MainPage}
        options={{ drawerLabel: "TV", drawerLabelStyle: styles.drawerLabel }}
      />
    </Drawer.Navigator>
  );
};

export default Sidebar;
