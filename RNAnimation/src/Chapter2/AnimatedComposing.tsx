import React, { useRef } from 'react';
import {Animated,Button} from 'react-native';


//sequence(각기 따로 움직여야할때), delay, parallel(같이 묶어서 이동할때) ,stagger(delay 주고 움직여야할때)
// 1) y : -200 : 0 timing
// 2) x : 0 -> 100 timing
const AnimatedComposing: React.FC = () => {
    const translatexAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(-200)).current;

    const onButtonPress = () => {
        // Animated.sequence([
        //     Animated.timing(translateYAnim,{
        //         toValue : 0,
        //         useNativeDriver: true,
        //         duration: 1000,
        //     }),
        //     // Animated.delay(1000),
        //     Animated.timing(translatexAnim,{
        //         toValue : 100,
        //         useNativeDriver: true,
        //         duration: 1000,
        //     }),
        // ]).start();
        Animated.stagger(1000,[
            Animated.timing(translateYAnim,{
                toValue : 0,
                useNativeDriver: true,
                duration: 1000,
            }),
            Animated.timing(translatexAnim,{
                toValue : 100,
                useNativeDriver: true,
                duration: 1000,
            }),
        ]).start();
    };
    return (
        <>
        <Button title="Button" onPress={onButtonPress}/>
        <Animated.Text style={{fontSize: 70,
            transform: [{translateX: translatexAnim}, {translateY: translateYAnim}]
        }}>🍎</Animated.Text>
        </>
    );
};

export default AnimatedComposing;
