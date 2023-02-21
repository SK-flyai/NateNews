import React, { useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import SearchBar from "../components/Searchbar";

import { Pressable } from "react-native";

const { width } = Dimensions.get("window");
const Imagewidth = width * 0.3;
const SmallImageWidth = width * 0.15;

function SportMain({ navigation }) {
  const Armypath = "../../assets/army.jpg";

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          marginHorizontal: "3%",
        }}
      >
        <View style={{ flex: 1, marginTop: "5%", backgroundColor: "white" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            병역비리 적발
          </Text>
          <Pressable
            onPress={() => navigation.navigate("SportContent")}
            android_ripple={{ color: "e0e0e0" }}
          >
            <View
              style={{
                marginVertical: "2%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "pink",
                flexDirection: "row",
              }}
            >
              <Image
                style={{
                  width: Imagewidth,
                  height: Imagewidth * 0.7,
                  backgroundColor: "black",
                  resizeMode: "stretch",
                }}
                source={require(Armypath)}
              />

              <View style={styles.textcontainer}>
                <Text style={{ fontWeight: "bold" }}>
                  [단독] "통화했다, 5급" 녹취 입수…병무청 직원과 유착 정황
                </Text>

                <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                  저희 JTBC가 병역 비리 브로커의 통화 녹취록을 입수했습니다.
                  브로커는 신체검사 직후 "병무청 직원과 통화를 했고, 5급이
                  나왔다"고
                </Text>
              </View>
            </View>
          </Pressable>
        </View>

        <View>
          <View
            style={[
              styles.divider,
              { marginTop: "3%" },
              { marginBottom: "2%" },
            ]}
          />
          <Pressable
            onPress={() => navigation.navigate("SportContent")}
            android_ripple={{ color: "gray" }}
          >
            <Text>"병역면제? 진짜 뇌전증 환자는 입대 원해"</Text>
          </Pressable>
          <View style={[styles.divider, { marginVertical: "2%" }]} />
          <Text>
            "아들이 정신 잃고 몸을 떤다"... 군대 안보내려 뇌전등 허위신고한
            어머니
          </Text>
          <View style={[styles.divider, { marginVertical: "2%" }]} />
          <Text>"병역면제? 진짜 뇌전증 환자는 입대 원해"</Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={[styles.middle]}>
            <Text>2030 부산 액스포</Text>
          </View>
          <View
            style={[
              styles.middle,
              { borderLeftWidth: 1 },
              { borderRightWidth: 1 },
            ]}
          >
            <Text>20대 대통령 윤석열</Text>
          </View>
          <View style={styles.middle}>
            <Text>코로나 19 현황</Text>
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            정치 주요뉴스
          </Text>
          <View style={styles.divider} />

          <View style={styles.mainnews}>
            <Image
              style={{
                width: Imagewidth,
                height: Imagewidth * 0.6,
                backgroundColor: "black",
              }}
              source={require(Armypath)}
            />

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                다시 부활한 '북한=적'...북풀루토눔 핵폭탄만 15개
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                sbs
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.mainnews}>
            <Image
              style={{
                width: Imagewidth,
                height: Imagewidth * 0.6,
                backgroundColor: "black",
              }}
              source={require(Armypath)}
            />

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                다시 부활한 '북한=적'...북풀루토눔 핵폭탄만 15개
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                sbs
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
        </View>
        <View style={styles.mainnews}>
          <Image
            style={{
              width: Imagewidth,
              height: Imagewidth * 0.6,
              backgroundColor: "black",
            }}
            source={require(Armypath)}
          />

          <View style={styles.textcontainer}>
            <Text style={{ fontWeight: "bold" }}>
              다시 부활한 '북한=적'...북풀루토눔 핵폭탄만 15개
            </Text>
            <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
              sbs
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.mainnews}>
          <Image
            style={{
              width: Imagewidth,
              height: Imagewidth * 0.6,
              backgroundColor: "black",
            }}
            source={require(Armypath)}
          />

          <View style={styles.textcontainer}>
            <Text style={{ fontWeight: "bold" }}>
              다시 부활한 '북한=적'...북풀루토눔 핵폭탄만 15개
            </Text>
            <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
              sbs
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.mainnews}>
          <Image
            style={{
              width: Imagewidth,
              height: Imagewidth * 0.6,
              backgroundColor: "black",
            }}
            source={require(Armypath)}
          />

          <View style={styles.textcontainer}>
            <Text style={{ fontWeight: "bold" }}>
              다시 부활한 '북한=적'...북풀루토눔 핵폭탄만 15개
            </Text>
            <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
              sbs
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            정치 최신뉴스
          </Text>
          <View style={styles.divider} />

          <View style={styles.mainnews}>
            <Image
              style={{
                width: SmallImageWidth,
                height: Imagewidth * 0.4,
                backgroundColor: "black",
                resizeMode: "stretch",
              }}
              source={require(Armypath)}
            />

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                "총리님이 희망""내 마음 1등"...황교안 치켜세운 이준석, 왜
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                중앙일보 | 5분전
              </Text>
            </View>
          </View>

          <View style={styles.divider} />
          <View style={styles.mainnews}>
            <Image
              style={{
                width: SmallImageWidth,
                height: Imagewidth * 0.4,
                backgroundColor: "black",
                resizeMode: "stretch",
              }}
              source={require(Armypath)}
            />

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                "총리님이 희망""내 마음 1등"...황교안 치켜세운 이준석, 왜
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                중앙일보 | 5분전
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.mainnews}>
            <Image
              style={{
                width: SmallImageWidth,
                height: Imagewidth * 0.4,
                backgroundColor: "black",
                resizeMode: "stretch",
              }}
              source={require(Armypath)}
            />

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                "총리님이 희망""내 마음 1등"...황교안 치켜세운 이준석, 왜
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                중앙일보 | 5분전
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.mainnews}>
            <Image
              style={{
                width: SmallImageWidth,
                height: Imagewidth * 0.4,
                backgroundColor: "black",
                resizeMode: "stretch",
              }}
              source={require(Armypath)}
            />

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                "총리님이 희망""내 마음 1등"...황교안 치켜세운 이준석, 왜
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                중앙일보 | 5분전
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.mainnews}>
            <Image
              style={{
                width: SmallImageWidth,
                height: Imagewidth * 0.4,
                backgroundColor: "black",
                resizeMode: "stretch",
              }}
              source={require(Armypath)}
            />

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                "총리님이 희망""내 마음 1등"...황교안 치켜세운 이준석, 왜
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                중앙일보 | 5분전
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.mainnews}>
            <Image
              style={{
                width: SmallImageWidth,
                height: Imagewidth * 0.4,
                backgroundColor: "black",
                resizeMode: "stretch",
              }}
              source={require(Armypath)}
            />

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                "총리님이 희망""내 마음 1등"...황교안 치켜세운 이준석, 왜
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                중앙일보 | 5분전
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.mainnews}>
            <Image
              style={{
                width: SmallImageWidth,
                height: Imagewidth * 0.4,
                backgroundColor: "black",
                resizeMode: "stretch",
              }}
              source={require(Armypath)}
            />

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                "총리님이 희망""내 마음 1등"...황교안 치켜세운 이준석, 왜
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                중앙일보 | 5분전
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.mainnews}>
            <Image
              style={{
                width: SmallImageWidth,
                height: Imagewidth * 0.4,
                backgroundColor: "black",
                resizeMode: "stretch",
              }}
              source={require(Armypath)}
            />

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                "총리님이 희망""내 마음 1등"...황교안 치켜세운 이준석, 왜
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                중앙일보 | 5분전
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.mainnews}>
            <Image
              style={{
                width: SmallImageWidth,
                height: Imagewidth * 0.4,
                backgroundColor: "black",
                resizeMode: "stretch",
              }}
              source={require(Armypath)}
            />

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                "총리님이 희망""내 마음 1등"...황교안 치켜세운 이준석, 왜
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                중앙일보 | 5분전
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.mainnews}>
            {/* <Image
              style={{
                width: SmallImageWidth,
                height: Imagewidth * 0.4,
                backgroundColor: "black",
                resizeMode: "stretch",
              }}
              source={require(Armypath)}
            /> */}

            <View style={styles.textcontainer}>
              <Text style={{ fontWeight: "bold" }}>
                "총리님이 희망""내 마음 1등"...황교안 치켜세운 이준석, 왜
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3, color: "#d6ccc2" }}>
                중앙일보 | 5분전
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
        </View>
      </View>
      <View style={[styles.divider, { borderBottomWidth: 10 }]} />
    </ScrollView>
  );
}

export default SportMain;

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
    marginVertical: "1%",
  },
  middle: {
    flex: 1,
    borderColor: "#e0e0e0",
    paddingVertical: "2%",

    marginVertical: "3%",
    borderTopWidth: 10,
    borderBottomWidth: 15,

    alignItems: "center",
    justifyContent: "center",
  },
  mainnews: {
    marginVertical: "2%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "row",
  },
  textcontainer: {
    flex: 1,
    marginLeft: "1%",
    backgroundColor: "white",
  },
});

// import React from "react";
// import styled from "styled-components/native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
// import SearchBar from "../components/Searchbar";
// import { Button } from "react-native-elements";
// import { Dimensions } from "react-native";

// const { width } = Dimensions.get("window");

// const DATA = [
//   {
//     id: "1",
//     title: "1. 곽상도가 돈 달래, 아들 통해서 녹음파일...",
//   },
//   {
//     id: "2",
//     title: "2. 탄핵안 설명 중에…'필리핀 날씨' 검색한...",
//   },
//   {
//     id: "3",
//     title: "3. 편의점 직원 살해 후 달아난 30대…",
//   },
//   {
//     id: "4",
//     title: "4. 대기업 다니던 딸, 출산 중 지적장애 얻어…",
//   },
//   {
//     id: "5",
//     title: "5. 빅뱅 승리 오늘(9일) 오전 출소",
//   },
//   {
//     id: "6",
//     title: "6. 신정환, 라방 중 도박·뎅기열 언급하는...",
//   },
//   {
//     id: "7",
//     title: "7. '기부 요정' 한지민, 튀르키예·시리아...",
//   },
//   {
//     id: "8",
//     title: "8. 송민호 맞아? 몰라보게 달라진 충격 근황...",
//   },
//   {
//     id: "9",
//     title: "9. 유재석, 갈비뼈 실금 간 전소민에...",
//   },
//   {
//     id: "10",
//     title: "10. 조국 딸 600만 원 '유죄', 곽상도 아들 50억...",
//   },
//   {
//     id: "11",
//     title: "11. 곽상도가 돈 달래, 아들 통해서 녹음파일...",
//   },
//   {
//     id: "12",
//     title: "12. 탄핵안 설명 중에…'필리핀 날씨' 검색한...",
//   },
//   {
//     id: "13",
//     title: "13. 편의점 직원 살해 후 달아난 30대…",
//   },
//   {
//     id: "14",
//     title: "14. 대기업 다니던 딸, 출산 중 지적장애 얻어…",
//   },
//   {
//     id: "15",
//     title: "15. 빅뱅 승리 오늘(9일) 오전 출소",
//   },
//   {
//     id: "16",
//     title: "16. 신정환, 라방 중 도박·뎅기열 언급하는...",
//   },
//   {
//     id: "17",
//     title: "17. '기부 요정' 한지민, 튀르키예·시리아...",
//   },
//   {
//     id: "18",
//     title: "18. 송민호 맞아? 몰라보게 달라진 충격 근황...",
//   },
//   {
//     id: "19",
//     title: "19. 유재석, 갈비뼈 실금 간 전소민에...",
//   },
//   {
//     id: "20",
//     title: "20. 조국 딸 600만 원 '유죄', 곽상도 아들 50억...",
//   },
// ];

// const styles = StyleSheet.create({
//   // 기사 제목 style
//   container: {
//     flex: 1,
//     width: width,
//   },
//   item: {
//     padding: 18,
//     marginHorizontal: 0,
//   },
//   separator: {
//     backgroundColor: "#e0e0e0",
//     height: 1,
//   },
//   title: {
//     fontSize: 16,
//     ...Platform.select({
//       ios: {
//         fontFamily: "Futura",
//       },
//       android: {
//         fontFamily: "monospace",
//       },
//     }),
//   },
// });

// const Container = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   background-color: ${({ theme }) => theme.background};
//   padding: 0 5px;
// `;

// const SportMain = ({ navigation }) => {
//   const insets = useSafeAreaInsets();

//   const date = new Date();
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1;
//   const todaydate = date.getDate();

//   return (
//     <Container insets={insets}>
//       <View>
//         <Text
//           style={{
//             fontWeight: "bold",
//             fontSize: 20,
//             marginBottom: 10,
//             marginTop: 10,
//           }}
//         >
//           {year}.{month}.{todaydate}
//         </Text>
//       </View>
//       <SearchBar />
//       <SafeAreaView
//         style={[styles.container, { borderWidth: 1, borderColor: "#e0e0e0" }]}
//       >
//         {/*기사 목록 FlatList로 띄움*/}
//         <FlatList
//           data={DATA}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item, index }) => (
//             <View>
//               <Button
//                 title={item.title}
//                 titleStyle={{
//                   color: "black",
//                   ...Platform.select({
//                     ios: {
//                       fontFamily: "Futura",
//                     },
//                     android: {
//                       fontFamily: "monospace",
//                     },
//                   }),
//                 }}
//                 onPress={() => navigation.navigate("SportContent")}
//                 buttonStyle={{

//                   backgroundColor: "white",

//                   //   margin: 10,
//                   alignSelf: "flex-start",
//                 }}
//               >
//                 <Text >{item.title}</Text>
//               </Button>
//               {index !== DATA.length - 1 && (
//                 <View
//                   style={{
//                     borderBottomColor: "#e0e0e0",
//                     borderBottomWidth: 1,
//                   }}
//                 />
//               )}
//             </View>
//           )}
//         />
//       </SafeAreaView>
//     </Container>
//   );
// };

// export default SportMain;
