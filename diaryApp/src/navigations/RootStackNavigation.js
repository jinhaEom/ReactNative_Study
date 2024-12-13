import React from "react";
import { DiaryStackNavigation } from "./DiaryStackNavigation";
import { createStackNavigator } from "@react-navigation/stack";
import { AddDiaryScreen } from "../screens/AddDiaryScreen";

const Stack = createStackNavigator();
export const RootStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="DiaryStack"
      screenOptions={{ presentation: "containedModal", headerShown: false }}
    >
      <Stack.Screen name="DiaryStack" component={DiaryStackNavigation} />
      <Stack.Screen name="AddDiary" component={AddDiaryScreen} />
    </Stack.Navigator>
  );
};
