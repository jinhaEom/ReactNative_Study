import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { ITEM_WIDTH } from "./util";
import AntDesign from "@expo/vector-icons/AntDesign";

export default ({
  value,
  onChangeText,
  placeholder,
  onPressAdd,
  onSubmitEditing,
  onFocus
}) => {
  return (
    <View
      style={{ flexDirection: "row", width: ITEM_WIDTH, alignItems: "center" }}
    >
      <TextInput
        style={{ padding: 5, flex: 1, color: "#595959" }}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onFocus={onFocus}
        blurOnSubmit={false}
      />
      <TouchableOpacity onPress={onPressAdd} style={{ padding: 5 }}>
        <AntDesign name="plus" size={18} color="#595959" />
      </TouchableOpacity>
    </View>
  );
};
