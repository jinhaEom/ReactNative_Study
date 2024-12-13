import { View } from "react-native";
import React from "react";

export const Spacer = ({ size, horizontal }) => {
  return horizontal ? (
    <View style={{ marginLeft: size }} />
  ) : (
    <View style={{ marginTop: size }} />
  );
};
