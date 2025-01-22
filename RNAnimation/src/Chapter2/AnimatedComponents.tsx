import React from 'react';
import {Animated,Button} from 'react-native';
import {useRef} from 'react';


//opacity 1 -> 0 timing animation
const AnimatedComponents: React.FC = () => {
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const onButtonPress = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  return (
    <>
        <Button title="사라지다." onPress={onButtonPress} />
        <Animated.Text style={{fontSize: 70, opacity: opacityAnim}}>
          🍎
      </Animated.Text>
    </>
  );
};

export default AnimatedComponents;
