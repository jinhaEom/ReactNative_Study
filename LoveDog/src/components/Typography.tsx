import React from 'react';
import {Text as RNText} from 'react-native';

export const Typography : React.FC<{
    color?: string;
    fontSize?: number;
    numberOfLines? : number;
    children : React.ReactNode | string;
}> = props => (
    <RNText style={{color: props.color, fontSize: props.fontSize}} numberOfLines={props.numberOfLines}>
        {props.children}
    </RNText>
);
