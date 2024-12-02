import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ImageDetailScreen from '../screen/ImageDetailScreen';
import {BottomTabNavigations} from "./BottomTabNavigations";
const Stack = createNativeStackNavigator();
const RootStackNavigations = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTab" component={BottomTabNavigations} />
      <Stack.Screen name="ImageDetail" component={ImageDetailScreen} />
    </Stack.Navigator>
  );
}

export default RootStackNavigations