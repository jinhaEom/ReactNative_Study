import { Image as RNImage } from 'react-native';
import React from 'react';

export const RemoteImage = (props) => {
    return ( 
        <RNImage
            source={{ uri: props.url }}
            style={[props.style,{width:props.width, height:props.height}]}
        />
    )
}