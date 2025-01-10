import React from 'react';
import {Image as RNImage, StyleProp, ImageStyle} from 'react-native';

export const RemoteImage: React.FC<{
  testID?: string;
  url: string;
  width: number;
  height: number;
  style?: StyleProp<ImageStyle>;
}> = props => (
  <RNImage
    testID={props.testID}
    source={{uri: props.url}}
    style={[props.style, {width: props.width, height: props.height}]}
  />
);