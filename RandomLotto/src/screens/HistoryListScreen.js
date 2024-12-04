import { View, Text, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { Header } from "../Header/Header";
import { Typography } from "../components/Typography";
import { LottoNumberView } from "../../assets/LottoNumberView";
import { useSelector } from "react-redux";

const HistoryListScreen = (props) => {
const history = useSelector((state)=> state.numbers.history)



  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="HISTORY"></Header.Title>
      </Header>
      <FlatList
        key={Math.random()}
        style={{ flex: 1 }}
        data={history}
        contentContainerStyle={{ paddingTop: 24, paddingBottom: 24 }}
        renderItem={({ item }) => {
          return (
            <View
              key={Math.random()}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 12,
                marginHorizontal: 24,
                height: 120,
                backgroundColor: "white",
              }}
            >
              <Typography fontSize={16}>
                {item.date}
              </Typography>
              <LottoNumberView numbers={item.numbers} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default HistoryListScreen;
