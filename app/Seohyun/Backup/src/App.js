import React from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import { NavigationContainer } from "@react-navigation/native";
import Sidebar from "./navigations/Sidebar";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor={theme.background} barStyle="dark-content" />
      <NavigationContainer>
        <Sidebar />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
