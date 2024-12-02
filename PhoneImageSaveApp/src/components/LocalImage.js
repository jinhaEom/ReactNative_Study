import React from "react";
import { View, Image as RNImage } from "react-native";

const LocalImage = (props) => {
  return (
    <RNImage
      source={props.localAsset}
      style={[
        props.style,
        { width: props.width, height: props.height },
      ]}
    />
  );
};

export default LocalImage;
