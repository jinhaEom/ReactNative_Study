import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainScreen } from "../screens/MainScreen";
import { DetailScreen } from "../screens/DetailScreen";
import { AddUpdateScreen } from "../screens/AddUpdateScreen";
import { MonthlyScreen } from "../screens/MonthlyScreen";
import { AccountBookHistory } from "../data/AccountBookHistory";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { CalenderSelectScreen } from "../screens/CalenderSelectScreen";
import { TakePhotoScreen } from '../screens/TakePhotoScreen';

export type ScreenParams = {
    Add: undefined;
    Main: undefined;
    Update: { item: AccountBookHistory; onChangeData:(nextItem:AccountBookHistory) => void};
    Detail: { item: AccountBookHistory };
    Monthly: undefined;
    CalenderSelect:{onSelectDay: (date: number) => void}
    TakePhoto: {
        onTakePhoto: (uri: string) => void;
    };
}

const Stack = createNativeStackNavigator<ScreenParams>();

export const RootNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, presentation: 'containedModal' }}>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="Add" component={AddUpdateScreen} />
            <Stack.Screen name="Update" component={AddUpdateScreen} />
            <Stack.Screen name="Monthly" component={MonthlyScreen} />
            <Stack.Screen name="CalenderSelect" component={CalenderSelectScreen} />
            <Stack.Screen name="TakePhoto" component={TakePhotoScreen} />
        </Stack.Navigator>
    );
};

export const useRootNavigation =  <RouteName extends keyof ScreenParams>() =>
     useNavigation<NativeStackNavigationProp<ScreenParams, RouteName>>();

export const useRootRoute = <RouteName extends keyof ScreenParams>() =>
     useRoute<RouteProp<ScreenParams, RouteName>>();
