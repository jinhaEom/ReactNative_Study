import React from 'react';
import {StyleSheet, View} from 'react-native';

export const Divider: React.FC = () => {
  return <View style={styles.divider} />;
};
const styles = StyleSheet.create({
  divider: {
    alignSelf: 'stretch',
    borderWidth: 1,
    marginHorizontal: 24,
    borderColor: 'gray',
  },
});
