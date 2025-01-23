import React,{useEffect,useRef} from 'react';
import { View, Text, Animated, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
const SnowAnimation:React.FC = () => {

    return(
        <View style={{backgroundColor:'#121723', flex:1}}>
            {[...Array(20)].map((value,index)=> {
                 const interpolateAnim = useRef(new Animated.Value(0)).current;
                 useEffect(() => {
                    Animated.loop(Animated.timing(interpolateAnim,{
                         toValue:1,
                         delay: index * 150,
                         duration:5000,
                         useNativeDriver:false,
                     })).start();
                 },[index,interpolateAnim]);
                return (
                    <Animated.View
                    key={index}
                    style={{
                        position:'absolute',
                        top : interpolateAnim.interpolate({
                            inputRange : [0,1],
                            outputRange : ['-10%','110%'],
                        }),
                        left : `${Math.floor(Math.random() * 100)}%`,
                    }}>
                        <Icon name="snowflake-2" size={16} color="white"/>
                    </Animated.View>
                );
            })}
            </View>
    );

};

export default SnowAnimation
;
