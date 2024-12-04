import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import HistoryListScreen from '../screens/HistoryListScreen';
import {TabIcon} from '../components/TabIcon'
const Tab = createBottomTabNavigator();

const BottomTabNavigations = () => {
  return (
      <Tab.Navigator screenOptions={({ route }) => {
          return {
              headerShown: false,
              tabBarIcon: ({ color }) => {
                  const getIconName = () => {
                      if (route.name == 'History') {
                          return 'time'
                      }
                      return 'home'
                  }
                  const iconName = getIconName()
                  return <TabIcon iconName={iconName} iconColor={color} />;
              }
          }
      }}>
      <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>
      <Tab.Screen name="History" component={HistoryListScreen}></Tab.Screen>
    </Tab.Navigator>
  );
}

export default BottomTabNavigations