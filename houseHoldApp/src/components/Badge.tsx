import React, {ReactElement} from 'react';
import {StyleSheet, View} from 'react-native';
import {Typography} from './Typography';

export const Badge: React.FC<{
  children: ReactElement;
  count?: number;
}> = props => {
  return (
    <View>
      {props.children}
      <View
        style={[
          styles.BadgeStyle,
          styles.BadgeStyle2,
        ]}>
        {props.count && (
          <Typography fontSize={10} color="white">
            {props.count.toString()}
          </Typography>
        )}
      </View>
    </View>
  );
    };

const styles = StyleSheet.create({
  BadgeStyle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BadgeStyle2: {
    position: 'absolute',
    right: -5,
    top: -5,
  },
});
