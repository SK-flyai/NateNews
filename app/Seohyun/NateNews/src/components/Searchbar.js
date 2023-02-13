import React, { useState } from "react";
import styled from "styled-components/native";

const SearchBarWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: #efefef;
  border: #fa5858;
  border-radius: 4px;
  padding: 10px 14px 10px 12px;
  margin-top: 0px;
  margin-bottom: 30px;
  display: flex;
`;

const SearchInput = styled.TextInput`
  margin-left: 10px;
  padding: 0px;
`;

const SearchIcon = styled.Image`
  width: 18px;
  height: 18px;
`;

export default function SearchBar() {
  const [value, setValue] = useState("");

  return (
    <SearchBarWrapper>
      <SearchIcon source={require("../../assets/search.png")} />
      <SearchInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setValue}
        placeholder="검색어를 입력해 주세요."
        returnKeyType="search"
        returnKeyLabel="search"
        value={value}
      />
    </SearchBarWrapper>
  );
}
