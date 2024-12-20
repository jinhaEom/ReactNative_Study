import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

export const SingleLineInput: React.FC<{
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  onSubmitEditing: () => void;
  fontSize?: number;
}> = props => {
  const [focused, setFocused] = useState(false);
  return (
    <View style={[styles.container, {borderColor: focused ? '#000000' : '#808080'}]}>
      <TextInput
        autoCorrect={false}
        autoCapitalize={'none'}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        onSubmitEditing={props.onSubmitEditing}
        style={{fontSize: props.fontSize ?? 20}}
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
