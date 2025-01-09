import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type TypeIconName = string;

export const Icon: React.FC<{
    name: TypeIconName;
    size: number;
    color: string;
}> = props => {
    return <Ionicons name={props.name as any} size={props.size} color={props.color}/>;
};
