import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Header } from '../../Header/Header'
import { useNavigation } from '@react-navigation/native';

export const AddDiaryScreen = () => {

    const navigation = useNavigation();

    const onPressBack = useCallback(() => {
        navigation.goBack();
    },[])

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Group>
                    <Header.Title title="Add Diary" />
                </Header.Group>
                <Header.Icon iconName="close" onPress={onPressBack} />
            </Header>
        </View>
    );
};
