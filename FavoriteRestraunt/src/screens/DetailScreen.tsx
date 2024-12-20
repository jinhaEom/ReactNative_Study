import {useNavigation} from "@react-navigation/native";
import {useCallback} from "react";
import {View} from "react-native";
import {Header} from "../components/Header/Header.tsx";
import {Typography} from "../components/Typography.tsx";
import {Spacer} from "../components/Spacer.tsx";
import {SingleLineInput} from "../components/SingleLineInput.tsx";
import MapView, {Marker} from "react-native-maps";
import {Button} from "../components/Button.tsx";
import {useState} from "react";
import {saveNewRestaurant} from "../utils/RealTimeDataBaseUtils.tsx";
import { useRootNavigation } from "../navigation/RootNavigation.tsx";
import { useRootRoute } from "../navigation/RootNavigation.tsx";
export const DetailScreen = () => {
    const routes = useRootRoute<'Detail'>();
    const navigation = useRootNavigation();
    const onPressKakaoShare = useCallback(() => {
        console.log('button Pressed')
    },[])
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
