import React from "react";
import { StyleSheet, View, Image, SafeAreaView } from "react-native";

export default function Header() {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={{
            uri: "https://m1.nateimg.co.kr/n3main/newBI/nate_170x50.png",
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    marginLeft: "20%",
  },
  image: {
    width: 170,
    height: 50,
  },
});
