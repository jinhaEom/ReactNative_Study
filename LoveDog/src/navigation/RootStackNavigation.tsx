import React from 'react';
import { IntroScreen } from '../screens/IntroScreen';
import { MainScreen } from '../screens/MainScreen';
import { SignupNavigation, TypeSignUpNavigation } from './SignupNavigation';
import { HistoryListScreen } from '../screens/HistoryListScreen';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigation } from './BottomTabNavigation';

type TypeRootStackNavigation = {
    Intro: undefined;
    SignUp: NavigatorScreenParams<TypeSignUpNavigation>;
    Main: undefined;
    HistoryList: undefined;
}
const Stack = createNativeStackNavigator<TypeRootStackNavigation>();

export const RootStackNavigation : React.FC = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen name="SignUp" component={SignupNavigation} />
            <Stack.Screen name="Main" component={BottomTabNavigation} />
            <Stack.Screen name="HistoryList" component={HistoryListScreen} />
        </Stack.Navigator>
    );
};

export const useRootNavigation = <RouteName extends keyof TypeRootStackNavigation>() =>
    useNavigation<NativeStackNavigationProp<TypeRootStackNavigation, RouteName>>();

export const useRootRoute = <RouteName extends keyof TypeRootStackNavigation>() =>
    useRoute<RouteProp<TypeRootStackNavigation, RouteName>>();
