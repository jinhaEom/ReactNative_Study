import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ImageStyle,
  TextStyle,
  Text,
} from 'react-native';
import { useMemo } from 'react';
import Colors from '../components/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GRAY,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

interface ProfileProps {
  size?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  imageUrl?: string;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
}

const Profile = ({
  size = 48,
  style: containerStyleProp,
  onPress,
  imageUrl,
  text,
  textStyle,
}: ProfileProps) => {
  const containerStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return [
      styles.container,
      { width: size, height: size, borderRadius: size / 2 },
      containerStyleProp,
    ];
  }, [size, containerStyleProp]);

  const imageStyle = useMemo<StyleProp<ImageStyle>>(
    () => ({ width: size, height: size }),
    [size],
  );

  return (
    <TouchableOpacity disabled={onPress == null} onPress={onPress}>
      <View style={containerStyle}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={imageStyle} />
        ) : text ? (
          <Text style={[styles.defaultText, textStyle]}>{text}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
export default Profile;
