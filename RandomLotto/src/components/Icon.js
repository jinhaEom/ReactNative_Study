import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import React from "react";

const Icon = (props) => {
  return <Ionicons name={props.name} size={props.size} color={props.color} />;
};

export default Icon;
