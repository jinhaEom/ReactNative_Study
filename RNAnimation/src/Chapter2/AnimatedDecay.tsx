import React, { useRef } from 'react';
import {Animated,Button,View} from 'react-native';


//y축 -100 -< 100 으로 이동하는 decay Animation
const AnimatedDecay: React.FC = () => {
    const translateXAnim = useRef(new Animated.Value(-100)).current;
    const onButtonPress = () => {
        //decay Animation
        Animated.decay(translateXAnim,{
            velocity : 1,
            deceleration : 0.995,
            useNativeDriver: true,
        }).start();

    };
    return (
        <>
            <Button title="이동" onPress={onButtonPress} />
            <Animated.Text style={{fontSize: 70, transform: [{translateX: translateXAnim}]}}>🚗</Animated.Text>
        </>
 
    );
};

export default AnimatedDecay;
