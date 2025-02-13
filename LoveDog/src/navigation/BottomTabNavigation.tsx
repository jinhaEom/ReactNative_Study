import React from 'react';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainScreen } from '../screens/MainScreen';
import { MyScreen } from '../screens/MyScreen';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { TabIcon } from '../components/TabIcon';
type TypeBottomTabNavigation = {
    Main: undefined;
    My: undefined;
}
const BottomTab = createBottomTabNavigator<TypeBottomTabNavigation>();

export const BottomTabNavigation : React.FC = () => {
    return(
        <BottomTab.Navigator screenOptions={({route}) => {
            const getIconName = () : string => {
                if(route.name === 'My'){
                    return 'person';
                }
                return 'home';
            }
            const routeIconName = getIconName();
            return {headerShown:false, tabBarIcon:({color}) => {
                return (
                    <TabIcon
                        iconName={routeIconName}
                        iconColor={color}
                        visibleBadge={false}
                    />
                )
            }}
        }}>
            <BottomTab.Screen name="Main" component={MainScreen} />
            <BottomTab.Screen name="My" component={MyScreen} />
        </BottomTab.Navigator>
    );
};

export const useBottomTabNavigation = <RouteName extends keyof TypeBottomTabNavigation>() =>
    useNavigation<BottomTabNavigationProp<TypeBottomTabNavigation, RouteName>>();

export const useBottomTabRoute = <RouteName extends keyof TypeBottomTabNavigation>() =>
    useRoute<RouteProp<TypeBottomTabNavigation, RouteName>>();
