import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default (props) => {
  const { onPress, isSelected, text } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        isSelected ? styles.selectedButton : styles.nonSelectedButton,
      ]}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "gray",
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginHorizontal: 5,
  },
  selectedButton: {
    borderColor: "white",
    fontSize: 16,
  },
  nonSelectedButton: {
    borderColor: "transparent",
    fontSize: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
