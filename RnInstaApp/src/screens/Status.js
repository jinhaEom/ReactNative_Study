import { View, Text, Image, StatusBar, TouchableOpacity, Animated, Platform } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionic from 'react-native-vector-icons/Ionicons'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Status = ({route, navigation}) => {
  const {name, image} = route.params;
  const {top} = useSafeAreaInsets(); // Safe Area의 상단 inset
  const progress = useRef(new Animated.Value(0)).current;
  const progressAnimation = progress.interpolate({
    inputRange: [0, 5],
    outputRange: ['0%', '100%'],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.goBack();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 5,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'black',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
      }}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View
        style={{
          marginTop: top,
          height: 3,
          width: '100%',
          borderWidth: 1,
          backgroundColor: 'gray',
          position: 'absolute',
          top: 18,
        }}>
        <Animated.View
          style={{
            height: '100%',
            backgroundColor: 'white',
            width: progressAnimation,
          }}
        />
      </View>
      <View
        style={{
          marginTop: top,
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          top: 12,
          left: 0,
          width: '90%',
        }}>
        <View
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={image}
            style={{
              borderRadius: 100,
              backgroundColor: 'orange',
              width: '92%',
              height: '92%',
              resizeMode: 'cover',
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
          }}>
          <Text style={{color: 'white', fontSize: 15, paddingLeft: 10}}>
            {name}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionic name="close" style={{color: 'white', fontSize: 15}} />
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={image}
        style={{position: 'absolute', width: '100%', height: 500}}
      />
    </SafeAreaView>
  );
};

export default Status