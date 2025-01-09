import React,{ReactElement} from 'react';
import {Pressable} from 'react-native';

export const Button : React.FC<{
    testID ?: string;
    onPressIn?: () => void;
    onPressOut?: () => void;
    onPress? : () => void;
    hitSlop? : {left: number, top: number, right: number, bottom: number};
    backgroundColor? : string;
    paddingHorizontal? : number;
    paddingVertical? : number;
    children : ReactElement;
}> = props => (
    <Pressable
    {...props}
    testID={props.testID}
    onPressIn={props.onPressIn}
    onPressOut={props.onPressOut}
    onPress={props.onPress}
    hitSlop={props.hitSlop ?? {left: 0, top: 0, right: 0, bottom: 0}}
    style={{
        backgroundColor : props.backgroundColor,
        paddingHorizontal : props.paddingHorizontal,
        paddingVertical : props.paddingVertical,
    }}
    >
        {props.children}
    </Pressable>
);
