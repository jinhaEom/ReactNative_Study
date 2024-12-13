import { createStackNavigator } from '@react-navigation/stack';
import { DiaryListScreen } from '../screens/DiaryListScreen';
import { DiaryDetailScreen } from '../screens/DiaryDetailScreen';
import { SettingsScreen } from '../screens/SettingsScreens';
import React from 'react';

const Stack = createStackNavigator();

export const DiaryStackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="DiaryList" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DiaryList" component={DiaryListScreen} />
            <Stack.Screen name="DiaryDetail" component={DiaryDetailScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    )
}