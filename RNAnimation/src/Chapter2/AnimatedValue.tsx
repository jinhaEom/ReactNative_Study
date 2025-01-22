import React, { useRef, useEffect } from 'react';
import {Animated,Text,Button} from 'react-native';


/**
 *
 * setValue();
 * addListener(callback);
 * removeAllListener();
 * stopAnimation();
 * resetAnimation();
 * setOffset();
 * flattenOffset();
 * extractOffset();
 */

//왼쪽 -> 오른쪽 x값이 변화하는 Anim
const AnimatedValue: React.FC = () => {
    const translateXAnim = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        return () => {
            translateXAnim.removeAllListeners();
        };
    });

    const onButtonPress = () => {
        translateXAnim.setValue(-100);
        translateXAnim.removeAllListeners();
        translateXAnim.addListener(({value}) => console.log(value));
        setTimeout(() => {
            //  translateXAnim.stopAnimation();
            translateXAnim.resetAnimation();
        }, 500);

        Animated.timing(translateXAnim, {
            toValue: 100,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };
  return (
    <>
    <Button title="왼쪽 -> 오른쪽" onPress={onButtonPress} />
      <Animated.Text style={{fontSize: 70, transform: [{translateX: translateXAnim}]}}>🍎</Animated.Text>
    </>
  );
};

export default AnimatedValue;
