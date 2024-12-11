import { View, Text, useWindowDimensions, Animated } from "react-native";
import Button from "./Button";
import React, { useCallback, useState } from "react";
import { RemoteImage } from "./RemoteImage";
import { useNavigation } from "@react-navigation/native";

const PhotoListItem = (props) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const [animValue] = useState(new Animated.Value(0));
  const onPressItem = useCallback(() => {
    navigation.navigate("ImageDetail", { url: props.url });
  }, []);

  const onPressIn = useCallback(() => {
    console.log("onPressIn call")
    Animated.timing(animValue, {
      duration: 200,
      toValue: 1
    }).start();
  });
  const onPressOut = useCallback(() => {
    console.log("onPressOut call")
    Animated.timing(animValue, {
      duration: 200,
      toValue: 0,
    }).start();
  });

  const scale = animValue.interpolate({
    inputRange: [0,1],
    outputRange:[1.0,0.95]
  })
  return (
    <Button
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPressItem}
      paddingHorizontal={20}
      paddingVertical={10}
    >
      <Animated.View style={{ transform: [{ scale: scale }] }}>
        <RemoteImage url={props.url} width={width - 40} height={width * 1.2} />
      </Animated.View>
    </Button>
  );
};

export default PhotoListItem;
