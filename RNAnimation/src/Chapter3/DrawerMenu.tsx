import React, { useRef } from 'react';
import { Easing } from 'react-native';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableHighlight,
  Touchable,
  TouchableWithoutFeedback,
  Animated,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const DrawerMenu:React.FC = () => {
    const interpolateAnim = useRef(new Animated.Value(0)).current;
    const width = Dimensions.get('window').width;
  const onOpenPress = () => {
    Animated.timing(interpolateAnim,{
        toValue:1,
        duration:500,
        easing : Easing.out(Easing.circle),
        useNativeDriver:true,
    }).start();
  };
  const onClosePress = () => {
    Animated.timing(interpolateAnim,{
        toValue:0,
        duration:500,
        easing : Easing.in(Easing.circle),
        useNativeDriver:true,
    }).start();
  };
  return (
    <>
      <Animated.View
        style={{
          position: 'absolute',
          width: '90%',
          height: '100%',
          backgroundColor: '#ffffff',
          top: 0,
          zIndex: 10,
          transform:[{
            translateX:interpolateAnim.interpolate({
                inputRange:[0,1],
                outputRange:[-width * 0.9 ,0],
            }),
          }],
        }}>
        <SafeAreaView style={{padding: 10, flexDirection: 'row',justifyContent:'space-between'}}>
          <View>
            <Text style={{padding: 10, fontSize: 22}}>Menu1</Text>
            <Text style={{padding: 10, fontSize: 22}}>Menu2</Text>
            <Text style={{padding: 10, fontSize: 22}}>Menu3</Text>
          </View>
          <View>
          <TouchableHighlight
            underlayColor="#aff10050"
            onPress={onClosePress}
            style={{borderRadius: 100}}>
            <View style={{padding: 24}}>
              <Icon name="close" size={30} color="#222" />
            </View>
          </TouchableHighlight>
          </View>
        </SafeAreaView>
      </Animated.View>
      <TouchableWithoutFeedback onPress={onClosePress}>
      <Animated.View style={{position:'absolute',top:0, width:'100%', height:'100%',backgroundColor:interpolateAnim.interpolate({
        inputRange:[0,1],
        outputRange:['#00000000','#00000090'],
      }),zIndex: interpolateAnim.interpolate({
        inputRange:[0,1],
        outputRange:[0,2],
      })}}/>

      </TouchableWithoutFeedback>
      <View style={{flex: 1, backgroundColor: '#aff100'}}>
        <SafeAreaView style={{alignItems: 'flex-start'}}>
          <TouchableHighlight
            underlayColor="#ffffff50"
            onPress={onOpenPress}
            style={{borderRadius: 100}}>
            <View style={{padding: 24}}>
              <Icon name="menu" size={30} color="#222" />
            </View>
          </TouchableHighlight>
        </SafeAreaView>
      </View>
    </>
  );
};

export default DrawerMenu;
