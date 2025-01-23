import React, { useRef } from 'react';
import { View, Text, Animated, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {collapseData} from '../utils/data';
const Collapse:React.FC = () => {

    return <SafeAreaView style={{flex:1}}>
        {collapseData.map((value,index) => {
            let isOpend = false;
            const interpolateAnim = useRef(new Animated.Value(0)).current;

            const onPress = () => {
                Animated.timing(interpolateAnim,{
                    toValue: isOpend ? 0 : 1,
                    duration:200,
                    useNativeDriver:false,
                }).start(() => {
                    isOpend = !isOpend;
                });
            };
            return <View key={index}>
                <TouchableWithoutFeedback onPress={onPress}>

                <View style={{backgroundColor:'#4c5ced',padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={{color:'yellow',fontWeight:'bold',fontSize:16,flexShrink:1}}>{value.q}</Text>
                <Animated.View style={{
                    flexShrink:1,
                    marginLeft:10,
                    transform: [{
                        rotate: interpolateAnim.interpolate({
                            inputRange: [0,1],
                            outputRange: ['0deg','-180deg'],
                        }),
                    }],
                }}>
                <Icon name="expand-more" size={30} color="yellow" />
                </Animated.View>
                </View>
                </TouchableWithoutFeedback>

                <Animated.View style={{height: interpolateAnim.interpolate({
                    inputRange: [0,1],
                    outputRange: [0,100],
                }), paddingHorizontal:40,justifyContent:'center',borderBottomColor: '#4c5ced',borderBottomWidth:0.5}}>
                <Text style={{fontSize:14}}>{value.a}</Text>
                </Animated.View>

            </View>;
        })}
    </SafeAreaView>;
};

export default Collapse;
