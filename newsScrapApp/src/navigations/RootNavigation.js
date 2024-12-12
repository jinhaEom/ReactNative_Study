import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { NewsTabNavigation } from "./NewsTabNavigation";
import { NewsDetailScreen } from "../screens/NewsDetailScreen";
const Stack = createNativeStackNavigator();

export const RootNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="NewsTabNavigation" component={NewsTabNavigation} />
            <Stack.Screen name="NewsDetailScreen" component={NewsDetailScreen} />
        </Stack.Navigator>
    )
}