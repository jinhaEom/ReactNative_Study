import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { InputEmailScreen } from '../screens/InputEmailScreen';
import { InputNameScreen } from '../screens/InputNameScreen';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
export type TypeSignUpNavigation = {
    InputEmail: {
        uid : string;
        preInput : {
            email : string;
            name : string;
            profileImage : string;
        }
    };
    InputName: {
        uid : string;
        preInput : {
            email : string;
            name : string;
            profileImage : string;
        },
        inputEmail : string;
    };
}
const Stack = createNativeStackNavigator<TypeSignUpNavigation>();
export const SignupNavigation : React.FC = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="InputEmail" component={InputEmailScreen} />
            <Stack.Screen name="InputName" component={InputNameScreen} />
        </Stack.Navigator>
    );
};

export const useSignUpNavigation = <RouteName extends keyof TypeSignUpNavigation>() =>
    useNavigation<NativeStackNavigationProp<TypeSignUpNavigation, RouteName>>();

export const useSignUpRoute = <RouteName extends keyof TypeSignUpNavigation>() =>
    useRoute<RouteProp<TypeSignUpNavigation, RouteName>>();
