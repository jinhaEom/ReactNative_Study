import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import { Header } from "../Header/Header";
import Spacer from "../components/Spacer";
import Button from "../components/Button";
import { Typography } from "../components/Typography";
import { LottoNumberView } from "../../assets/LottoNumberView";
import { getRandomSixNumber } from "../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { createNewNumbers } from "../actions/LottoNumbers";

const HomeScreen = (props) => {
  const numbers = useSelector((state)=> state.numbers.currentNumber)
  const dispatch = useDispatch();
  const onPressGetNumber = useCallback(() => {
    // const randomNumbers = getRandomSixNumber();
    //setNumbers(randomNumbers);

    dispatch(createNewNumbers());
  });

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="HOME"></Header.Title>
      </Header>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 24,
        }}
      >
        <View
          style={{
            height: 250,
            flexDirection: "column",
            paddingHorizontal: 12,
            backgroundColor: "white",
            borderColor: "gray",
          }}
        >
          {numbers.length === 6 && <LottoNumberView numbers={numbers} />}
        </View>
        <Spacer space={20} />

        <Button onPress={onPressGetNumber}>
          <View
            style={{
              backgroundColor: "black",
              paddingVertical: 24,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography color="white" fontSize={18}>
              로또 번호 추출하기
            </Typography>
          </View>
        </Button>
      </View>
    </View>
  );
};

export default HomeScreen;
