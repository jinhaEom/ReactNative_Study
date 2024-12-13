import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View, Text } from "react-native";
import { Header } from "../../Header/Header";
import { Spacer } from "../components/Spacer"
export const DiaryDetailScreen = () => {
  const navigation = useNavigation();
    const onPressBack = useCallback(() => {
        navigation.goBack();
  },[])
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Icon iconName="arrow-back" onPress={onPressBack} />
          <Spacer size={12} horizontal />
          <Header.Title title="DIARY DETAIL"></Header.Title>
        </Header.Group>
      </Header>
    </View>
  );
};
