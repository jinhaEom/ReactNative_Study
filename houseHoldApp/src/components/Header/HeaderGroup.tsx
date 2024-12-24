import React from 'react';
import { View } from 'react-native';

export const HeaderGroup: React.FC<{
    children: React.ReactElement[];
}> = props => {
    return ( 
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {props.children}
        </View>
    )
}