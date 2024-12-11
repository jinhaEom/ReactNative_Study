// Header/Header.js
import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Spacer from "../components/Spacer"
import { HeaderIcon } from "./HeaderIcon";
import HeaderTitle from "./HeaderTitle";
import HeaderGroup from "./HeaderGroup";


export const Header = (props) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  return (
    <View style={{ paddingTop: insets.top }}>
      <View
        style={{
          width: width,
          flexDirection: "row",
          height: 56,
          borderBottomColor: "blue",
          borderBottomWidth: 1,
          alignItems: "center",
        }}
      >
        <Spacer horizontal={true} space={12} />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {props.children}
        </View>
        <Spacer horizontal={true} space={12} />
      </View>
    </View>
  );
};
Header.Title = HeaderTitle;
Header.Icon = HeaderIcon;
Header.Group = HeaderGroup;



