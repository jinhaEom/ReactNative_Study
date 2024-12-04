import React, { useCallback, useState } from "react";
import { View, Animated } from "react-native";
import { Typography } from "../src/components/Typography";
import { useEffect } from "react";

export const LottoNumberView = (props) => {
  const [viewHeight, setViewHeight] = useState(0);
  const [animatedValue] = useState(new Animated.Value(1))
  const getNumberBackgroundColor = useCallback(() => {
    const randomNumber = Math.floor(Math.random() * 6); // 0부터 5까지의 정수 생성
    switch (randomNumber) {
      case 0:
        return "red";
      case 1:
        return "blue";
      case 2:
        return "green";
      case 3:
        return "purple";

      default:
        return "black";
    }
  });
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange : [-viewHeight * 0.6 , 0]
  })
  useEffect(() => {
    animatedValue.setValue(0);
    
    Animated.timing(animatedValue, {
      duration: 1000,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [props.numbers])
  
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        overflow: "hidden",
        justifyContent: "space-between",
      }}
      onLayout={({ nativeEvent }) => {
        console.log(nativeEvent);
        setViewHeight(nativeEvent.layout.height);
      }}
    >
      {props.numbers.map((item,index) => {
        return (
          <Animated.View
            key={index}
            style={{
              backgroundColor: getNumberBackgroundColor(),
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              transform: [
                {
                  translateY: translateY,
                },
              ],
            }}
          >
            <Typography fontSize={20} color="white">
              {`${item}`}
            </Typography>
          </Animated.View>
        );
      })}
    </View>
  );
};
