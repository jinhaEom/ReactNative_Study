import React, { useRef } from 'react';
import {Animated,Button,Easing} from 'react-native';


//Easing ease / back/ bounce /elastic /circle
const AnimatedTiming: React.FC = () => {
    const translateXAnim = useRef(new Animated.Value(-100)).current;

    const onButtonPress = () => {
        translateXAnim.setValue(-100);
        // Animated.timing()
        Animated.timing(translateXAnim, {
            toValue: 100,
            duration: 1000,
            delay: 0,
            easing : Easing.in(Easing.bounce),
            useNativeDriver: true,
        }).start();
    };
    return (
        <>
        <Button title="왼쪽 -> 오른쪽" onPress={onButtonPress} />
          <Animated.Text style={{fontSize: 70, transform: [{translateX: translateXAnim}]}}>🍎</Animated.Text>
        </>    );
};

export default AnimatedTiming;
