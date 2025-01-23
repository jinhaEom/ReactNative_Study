import React,{useRef} from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button,Animated, Easing } from 'react-native';

const ProgressBar:React.FC = () => {
    const interpolateAnim = useRef(new Animated.Value(0)).current;
    let clickCount = 0;
    const onRunPress = () => {
        if(clickCount < 5){
        clickCount = clickCount + 1;
        Animated.spring(interpolateAnim,{
            toValue: clickCount * 20,
            friction: 7,
            tension : 40,
            useNativeDriver: false,
        }).start();
    }
    };
    const onAutoRunPress = () => {
        Animated.sequence([
            Animated.spring(interpolateAnim,{
                toValue: 20,
                friction: 7,
                tension : 40,
                useNativeDriver: false,
            }),
            Animated.spring(interpolateAnim,{
                toValue: 70,
                friction: 7,
                tension : 40,
                delay:150,
                useNativeDriver: false,
            }),
            Animated.spring(interpolateAnim,{
                toValue: 100,
                friction: 7,
                tension : 40,
                useNativeDriver: false,
            })
        ]).start();
    };
    const onResetPress = () => {
        clickCount = 0;
        Animated.spring(interpolateAnim,{
            toValue: 0,
            useNativeDriver: false,
        }).start();
    }
    return <SafeAreaView style={{flex:1,marginTop : 300}}>

        <Button title="run" onPress={onRunPress}/>
        <Button title="AutoRun" onPress={onAutoRunPress}/>
        <Button title="reset" onPress={onResetPress}/>
        <View style={{position:'relative', margin:30, justifyContent:'center'}}>
            <View style={{backgroundColor:'#222',height : 10, borderRadius: 10}}/>
            <Animated.View style={{backgroundColor:'blue' ,height: 16,width:interpolateAnim.interpolate({
                inputRange: [0,100],
                outputRange: ['0%','100%'],
            }), borderRadius: 100, position:'absolute'}}/>
        </View>
    </SafeAreaView>;
};

export default ProgressBar;
