import React, { useEffect } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Header } from '../components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { TypeRootReducer } from '../store';
import { TypeDog } from '../data/TypeDog';
import { getDog, likeDog, TypeDogDispatch } from '../actions/dog';
import { RemoteImage } from '../components/RemoteImage';
import { Spacer } from '../components/Spacer';
import { useCallback } from 'react';
import { Button } from '../components/Button';
import { Icon } from '../components/Icons';
import { Typography } from '../components/Typography';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { runOnJS } from 'react-native-reanimated';
export const MainScreen : React.FC = () => {
    const {width} = useWindowDimensions();


    const dog = useSelector<TypeRootReducer,TypeDog | null>(
        state => state.dog.currentDog
    );
    const dispatch = useDispatch<TypeDogDispatch>();

    const onPressLike = useCallback(() => {
        if(dog === null) {
            return;
        }
        dispatch(likeDog(dog));
        dispatch(getDog());

    },[dispatch,dog]);
    const onPressDislike = useCallback(() => {
        dispatch(getDog());

    },[dispatch]);

    useEffect(() => {
        dispatch(getDog());
    },[dispatch]);

    const gesture = Gesture.Pan().runOnJS(true)
    .onBegin(() => {
    }).onUpdate((event)=> {
        console.log('onUpdate',event);
        offset.value = {
            x : event.translationX + start.value.x,
            y : offset.value.y,
        }
    })
    .onFinalize(()=>{
        if(offset.value.x < -150){
            //왼쪽으로 넘어간 상태
            runOnJS(onPressDislike)();
        }else if(offset.value.x > 150){
            //오른쪽으로 넘어간 상태
            runOnJS(onPressLike)();
        }
        offset.value = {
            x : 0,
            y : 0,
        };
    });

    const start = useSharedValue({x:0,y:0});
    const offset = useSharedValue({x:0,y:0});

    const animatedStyle = useAnimatedStyle(() => {
        return {
             transform : [
                {
                    translateX : interpolate(offset.value.x, [-200 , 0 ,200], [-100,0,100]),
                },
                {translateY : interpolate(offset.value.x,[-200,0,200],[-50,0,-50])},
                {
                    rotate:`${interpolate(offset.value.x,[-200,0,200],[30,0,-30])}deg`,
                },
                {
                    scale : interpolate(offset.value.x,[-200,0,200],[0.8,1,0.8]),
                },
             ],
        };
    });
    return(
        <View style={{flex:1}}>
            <Header>
                <Header.Title title="MainScreen"/>
            </Header>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                {dog !== null && (
                    <View style={{width : width * 0.85}}>
                        <GestureDetector gesture={gesture}>

                        <Animated.View style={{alignItems:'center', justifyContent:'center'}}>
                            <Animated.View style={animatedStyle}>
                            <RemoteImage url={dog.photoUrl} width={width * 0.7} height={width * 0.7}/>
                            </Animated.View>
                    </Animated.View>
                    </GestureDetector>
                    <Spacer space={64}/>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1, marginRight : 4}}>
                            <Button onPress={onPressLike}>
                                <View style={{paddingVertical: 12, backgroundColor:'red',alignItems:'center', justifyContent:'center',borderRadius:4}}>
                                    <Icon name="thumbs-up" size={16} color="white"/>
                                    <Typography fontSize={20} color="white">
                                        LIKE
                                    </Typography>
                                </View>
                            </Button>
                        </View>
                        <View style={{flex:1, marginLeft : 4}}>
                        <Button onPress={onPressDislike}>
                                <View style={{paddingVertical: 12, backgroundColor:'blue',alignItems:'center', justifyContent:'center',borderRadius:4}}>
                                    <Icon name="thumbs-down" size={16} color="white"/>
                                    <Typography fontSize={20} color="white">
                                        DISLIKE
                                    </Typography>
                                </View>
                            </Button>
                        </View>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};
