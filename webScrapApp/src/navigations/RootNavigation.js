import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LinkStackNavigation from "./LinkStackNavigation";
import AddLinkScreen from "../screens/AddLinkScreen";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="LinkStackNavigation"
      screenOptions={{
        presentation: "containedModal",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="LinkStackNavigation"
        component={LinkStackNavigation}
      />
      <Stack.Screen name="AddLinkScreen" component={AddLinkScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
