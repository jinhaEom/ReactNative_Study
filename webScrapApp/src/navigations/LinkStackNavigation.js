import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LinkListScreen from "../screens/LinkListScreen";
import LinkDetailScreen from "../screens/LinkDetailScreen";
import AddLinkScreen from "../screens/AddLinkScreen";

const Stack = createNativeStackNavigator();

const LinkStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="LinkListScreen"
      screenOptions={{
        presentation: "card",
        headerShown: false,
      }}
    >
      <Stack.Screen name="LinkListScreen" component={LinkListScreen} />
      <Stack.Screen name="LinkDetailScreen" component={LinkDetailScreen} />
      <Stack.Screen name="AddLinkScreen" component={AddLinkScreen} />
    </Stack.Navigator>
  );
};

export default LinkStackNavigation;
