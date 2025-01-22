import React, { useRef } from 'react';
import {Animated,Button,Text} from 'react-native';

//Animated 사칙연산 메소드 -> add, subtract, divide, multiply
//Animated 핸들러 메소드 -> start, reset, loop(반복)
const AnimatedOtherMethod: React.FC = () => {
    // const value1 = new Animated.Value(100);
    // const value2 = new Animated.Value(30);

    // console.log(
    //     Animated.add(value1, value2),
    //     Animated.subtract(value1, value2),
    //     Animated.divide(value1, value2),
    //     Animated.multiply(value1, value2),
    // );

    // Animated.timing(value1,{
    //     toValue : Animated.add(value1, value2),
    //     useNativeDriver: true,
    //     duration: 1000,
    // }).start();

    const opacityAnim = useRef(new Animated.Value(1)).current;

    const onButtonPress = () => {
        Animated.timing(opacityAnim, {
            toValue: 0,
            useNativeDriver: true,
        }).start(finished => {
            if(finished) {
                setTimeout(() => {
                    opacityAnim.resetAnimation();
                    // Animated.timing(opacityAnim ,{
                    //     toValue : 0,
                    //     useNativeDriver : true,
                    // }).reset();
                },2000);
            }
        });
    };
    return (
        <>
            <Button title="button" onPress={onButtonPress} />
        <Animated.Text style={{fontSize: 70, opacity :opacityAnim}}>🍎</Animated.Text>
        </>
    );
};

export default AnimatedOtherMethod;
