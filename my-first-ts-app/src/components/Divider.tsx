import { View } from "react-native"
import React from 'react';

export const Divider: React.FC = () => {
    return (
        <View style = {{alignSelf : 'stretch', borderWidth: 0.5, marginHorizontal: 24, borderColor : 'gray'}}/>
    )
}