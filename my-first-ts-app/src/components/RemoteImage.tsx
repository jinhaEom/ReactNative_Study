import { Image as RNImage, StyleProp, ImageProps } from 'react-native';
import React from 'react';

export const RemoteImage: React.FC<{
  url: string,
  style?: StyleProp<ImageProps>,
  width?: number,
  height?: number,
}> = (props) => {
    return ( 
        <RNImage
            source={{ uri: props.url }}
            style={[props.style,{width:props.width, height:props.height}]}
        />
    )
}