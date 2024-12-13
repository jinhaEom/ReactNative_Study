import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Typography } from './components/Typography';

export const SplashView = (props) => {
    useEffect(() => {
        setTimeout(() => {
            props.onFinishLoaded();
        }, 2000);
    }, []);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Typography fontSize={24} fontWeight="bold">SPLASH</Typography>
        </View>
    );
};