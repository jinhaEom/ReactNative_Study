import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

export const MultiLineInput: React.FC<{
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  fontSize?: number;
  onSubmitEditing: () => void;
  height?: number;
}> = props => {
  const [focused, setFocused] = useState(false);
  return (
    <View
      style={[styles.container, {borderColor: focused ? 'black' : '#gray'}]}>
      <TextInput
        autoCorrect={false}
        autoCapitalize={'none'}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        onSubmitEditing={props.onSubmitEditing}
        style={{fontSize: props.fontSize ?? 20, height: props.height ?? 200}}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
});
