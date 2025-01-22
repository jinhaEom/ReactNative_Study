import React, { useRef } from 'react';
import {Animated,Button,View} from 'react-native';


//y축 -100 -< 100 으로 이동하는 spring Animation
const AnimatedSpring: React.FC = () => {
    const translateYAnim = useRef(new Animated.Value(-100)).current;
    const onButtonPress = () => {
        translateYAnim.setValue(-100);
        Animated.spring(translateYAnim, {
            toValue: 100,

            // bounciness: 10, //탄력제어
            // speed :12, //속도제어

            friction : 2, //에너지 소비
            tension : 20, //스프링이 얼마나 많은 에너지를 가졌는가.

            // stiffness : 100, //스프링의 강도
            // damping : 10, // 마찰력
            // mass : 1, // 용수철 끝에 매달려있는 물체의 질량
            velocity : 20,
            useNativeDriver: true,
        }).start();
    };
    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button title="이동" onPress={onButtonPress} />
            <Animated.Text style={{fontSize: 70, transform: [{translateY: translateYAnim}]}}>🍎</Animated.Text>
        </View>
    );
};

export default AnimatedSpring;