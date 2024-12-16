import { View } from "react-native";
import React from "react";

export const Spacer: React.FC<{
  space: number,
  horizontal?: boolean
}> = (props) => {
  if (props.horizontal) {
    return <View style={{ marginLeft: props.space }} />
  }
  return <View style={{ marginTop: props.space }} />
};