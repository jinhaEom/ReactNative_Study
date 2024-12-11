import { View, Text } from "react-native";
import React from "react";

const Spacer = (props) => {
  return props.horizontal ? (
    <View style={{ marginLeft: props.space }} />
  ) : (
    <View style={{ marginTop: props.space }} />
  );
    
    
};

export default Spacer;
