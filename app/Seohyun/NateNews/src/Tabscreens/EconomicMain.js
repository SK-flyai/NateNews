import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

const hotkeywords = [
  "1. 뉴진스",
  "2. 르세라핌",
  "3. 아이브",
  "4. 프로미스나인",
  "5. 에스파",
  "6. 소녀시대",
  "7. 블랙핑크",
  "8. 아이즈원",
  "9. 레드벨벳",
  "10. 트와이스",
];

const HotKeyword = () => {
  const [keywordIndex, setKeywordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKeywordIndex((keywordIndex + 1) % hotkeywords.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [keywordIndex]);

  const currentKeyword = hotkeywords[keywordIndex];

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={{ color: "blue", fontWeight: "bold", fontSize: 17 }}>
        인기 검색어 :{" "}
      </Text>
      <View style={{ width: 120 }}>
        <Text
          style={{ color: "black", fontWeight: "bold", fontSize: 18 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {currentKeyword}
        </Text>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <HotKeyword />
    </View>
  );
};

export default App;
