import React, { ReactElement } from 'react';
import {Pressable} from 'react-native';

export const Button: React.FC<{
  onPress: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  hitSlop?: {left: number; top: number; right: number; bottom: number};
  backgroundColor?: string;
  paddingHorizontal?: number;
  paddingVertical?: number;
  children: ReactElement | ReactElement[];
}> = props => {
  return (
    <Pressable
      {...props}
      onPress={props.onPress}
      onPressOut={props.onPressOut}
      onPressIn={props.onPressIn}
      hitSlop={props.hitSlop ?? {left: 0, right: 0, top: 0, bottom: 0}}
      style={{
        backgroundColor: props.backgroundColor,
        paddingHorizontal: props.paddingHorizontal,
        paddingVertical: props.paddingVertical,
      }}>
      {props.children}
    </Pressable>
  );
};
