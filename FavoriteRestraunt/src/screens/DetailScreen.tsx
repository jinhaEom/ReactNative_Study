import React, {useCallback} from 'react';
import {View} from "react-native";
import {Header} from "../components/Header/Header.tsx";
import {Typography} from "../components/Typography.tsx";
import {Spacer} from "../components/Spacer.tsx";
import MapView, {Marker} from 'react-native-maps';
import {Button} from "../components/Button.tsx";
import {saveNewRestaurant} from "../utils/RealTimeDataBaseUtils.tsx";
import { useRootNavigation } from "../navigation/RootNavigation.tsx";
import { useRootRoute } from "../navigation/RootNavigation.tsx";
import KakaoShareLink from "react-native-kakao-share-link";
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";

export const DetailScreen = () => {
    const routes = useRootRoute<'Detail'>();
    const navigation = useRootNavigation();
    const onPressKakaoShare = useCallback(async () => {
        try {
            console.log('Kakao Share Button Pressed');
            console.log('Params:', {
                address: routes.params.address,
                title: routes.params.title,
                latitude: routes.params.latitude,
                longitude: routes.params.longitude
            });
            
            await KakaoShareLink.sendLocation({
                address: routes.params.address,
                addressTitle: routes.params.title,
                content: {
                    title: routes.params.title,
                    imageUrl: 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                    link: {
                        webUrl: `https://map.kakao.com/link/map/${routes.params.title},${routes.params.latitude},${routes.params.longitude}`,
                        mobileWebUrl: `https://map.kakao.com/link/map/${routes.params.title},${routes.params.latitude},${routes.params.longitude}`
                    },
                    description: routes.params.address
                },
            });
            console.log('Kakao Share Completed');
        } catch (error) {
            console.error('Kakao Share Error:', error);
        }
    }, [routes.params])
    const onPressBack = useCallback(() => {
        navigation.goBack()
    }, []);

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title='Detail'/>
                <Header.Icon iconName='close' onPress={onPressBack} />
            </Header>
            <View style={{ flex: 1 }}>
 
      <View style={{ flex: 1, paddingTop: 24, paddingHorizontal: 24 }}>
        <Typography fontSize={16}>가계명</Typography>
        <Spacer space={8} />
        <Typography fontSize={16}>{routes.params.title}</Typography>
     
        <Spacer space={24} />
        <Typography fontSize={16}>주소</Typography>
        <Spacer space={8} />
        <Typography fontSize={16}>{routes.params.address}</Typography>
        <Spacer space={24} />
        <Typography fontSize={16}>위치</Typography>
        <MapView
          style={{ height: 200 }}
          region={{
            latitude: routes.params.latitude,
            longitude: routes.params.longitude,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.003,
          }}>
          <Marker
            coordinate={{
              latitude: routes.params.latitude,
              longitude: routes.params.longitude,
            }}
          />
        </MapView>
        <Spacer space={48} />

        <Button onPress={onPressKakaoShare}>
          <View
            style={{
              backgroundColor: '#FEE500',
              paddingHorizontal: 24,
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography fontSize={20} color="black">
              카카오로 공유하기
            </Typography>
          </View>
        </Button>
      </View>
    </View>
        </View>
    )
}
