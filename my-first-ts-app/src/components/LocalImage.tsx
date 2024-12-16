import React from "react";
import { Image as RNImage, ImageProps, StyleProp } from "react-native";

export const LocalImage: React.FC<{
  localAsset: number,
  style?: StyleProp<ImageProps>,
  width?: number,
  height?: number,
} > =   (props) => {
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
