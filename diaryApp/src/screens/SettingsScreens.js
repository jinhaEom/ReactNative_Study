import React, { useCallback } from 'react';
import { Header } from "../../Header/Header";
import { useNavigation } from '@react-navigation/native';
import {Spacer} from "../components/Spacer";
import { View } from 'react-native';
export const SettingsScreen = () => {
    const navigation = useNavigation();
    const onPressBack = useCallback(() => {
        navigation.goBack();
    },[])
    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Group>
                    <Header.Icon iconName="arrow-back" onPress={onPressBack} />
                    <Spacer size={12} horizontal />
                    <Header.Title title="SETTINGS" />
                </Header.Group>
            </Header>
        </View>
    )
}