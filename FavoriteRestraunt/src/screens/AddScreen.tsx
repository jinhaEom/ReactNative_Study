import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Header } from '../components/Header/Header.tsx';
import { useNavigation } from '@react-navigation/native';
import { Typography } from '../components/Typography.tsx';
import { Spacer } from '../components/Spacer.tsx';
import { useState } from 'react';
import { SingleLineInput } from '../components/SingleLineInput.tsx';
import { useRootNavigation, useRootRoute } from '../navigation/RootNavigation.tsx';
import MapView, { Marker } from 'react-native-maps';
import { Button } from '../components/Button.tsx';
import { saveNewRestaurant } from '../utils/RealTimeDataBaseUtils.tsx';
export const AddScreen: React.FC = () => {
  const routes = useRootRoute<'Add'>();
  const navigation = useRootNavigation<'Add'>();

  const [title, setTitle] = useState<string>('');

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const onPressSave = useCallback(async () => {
    if (title === '') {
      return;
    }
    console.log('button Pressed')

    await saveNewRestaurant({
      title: title,
      latitude: routes.params.latitude,
      longitude: routes.params.longitude,
      address: routes.params.address
    })
    navigation.goBack();
  }, [navigation, routes.params.address, routes.params.latitude, routes.params.longitude, title]);
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title={'Add'} />
        <Header.Icon iconName="close" onPress={onPressBack} />
      </Header>
      <View style={{ flex: 1, paddingTop: 24, paddingHorizontal: 24 }}>
        <Typography fontSize={16}>가계명</Typography>
        <Spacer space={8} />
        <SingleLineInput
          value={title}
          placeholder="이름을 입력해주세요"
          onChangeText={setTitle}
          onSubmitEditing={onPressSave}
        />
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

        <Button onPress={onPressSave}>
          <View
            style={{
              backgroundColor: title === '' ? 'gray' : 'black',
              paddingHorizontal: 24,
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography fontSize={20} color="white">
              저장하기
            </Typography>
          </View>
        </Button>
      </View>
    </View>
  );
};
