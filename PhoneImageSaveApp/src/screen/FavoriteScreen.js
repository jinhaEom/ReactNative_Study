import { View, Text } from "react-native";
import React from "react";
import { Typography } from "../components/Typography";
const FavoriteScreen = (props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Typography fontSize={20}>FavoriteScreen </Typography>
    </View>
  );
};

export default FavoriteScreen;
