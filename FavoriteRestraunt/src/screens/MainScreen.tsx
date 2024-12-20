import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { getAddressFromCoords, getCoordsFromAddress, getCoordsFromKeyword } from '../utils/GeoUtils.tsx';
import { SingleLineInput } from '../components/SingleLineInput.tsx';
import { useNavigation } from '@react-navigation/native';
import { getRestaurantList } from '../utils/RealTimeDataBaseUtils.tsx';
import { useRootNavigation } from '../navigation/RootNavigation.tsx';

export const MainScreen: React.FC = () => {
  const navigation = useRootNavigation<'Main'>();
  const [query, setQuery] = useState<string>('');
  const [isMapReady, setIsMapReady] = useState<boolean>(false)
  const [markerList, setMarkerList] = useState<{ latitude: number, longitude: number, title: string, address: string }[]>([]);

  const [currentRegion, setCurrentRegion] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 37.560214,
    longitude: 126.9775521,
  });
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);

  const onMapReady = useCallback(async () => {
    setIsMapReady(true);
    const restrauntList = await getRestaurantList();
    setMarkerList(restrauntList);
  }, [])
  const onPressBottomAddress = useCallback(() => {
    if (currentAddress === null) {
      return;
    }
    navigation.push('Add', {
      latitude: currentRegion.latitude,
      longitude: currentRegion.longitude,
      address: currentAddress
    })

  }, [currentAddress, currentRegion.latitude, currentRegion.longitude, navigation]);
  const onChangeLocation = async (item: {
    latitude: number;
    longitude: number;
  }) => {
    setCurrentRegion({
      latitude: item.latitude,
      longitude: item.longitude,
    });
    const address = await getAddressFromCoords(item.latitude, item.longitude);
    setCurrentAddress(address);
  };

  const getMyLocation = useCallback(() => {
    Geolocation.getCurrentPosition(position => {
      onChangeLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    getMyLocation();
  }, [getMyLocation]);

  const onFindAddress = useCallback<() => Promise<void>>(async () => {

    const keywordResult = await getCoordsFromKeyword(query);

    if (keywordResult !== null) {
      setCurrentAddress(keywordResult.address);
      setCurrentRegion({
        latitude: parseFloat(keywordResult.latitude.toString()),
        longitude: parseFloat(keywordResult.longitude.toString()),
      });
      return;
    }
    const addressResult = await getCoordsFromAddress(query);

    if (addressResult === null) {
      console.error('주소를 찾을 수 없습니다.');
      return;
    }
    setCurrentAddress(addressResult.address);
    setCurrentRegion({
      latitude: parseFloat(addressResult.latitude.toString()),
      longitude: parseFloat(addressResult.longitude.toString()),
    })
  }, [query])
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: currentRegion.latitude,
          longitude: currentRegion.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
        onLongPress={event => {
          onChangeLocation(event.nativeEvent.coordinate);
        }}
        onMapReady={onMapReady}
      >
        {isMapReady && (
          <Marker
            coordinate={{
              latitude: currentRegion.latitude,
              longitude: currentRegion.longitude,
            }}
          />
        )}
        {isMapReady && markerList.map(item => {
          return (
            <Marker
              key={item.title}
              title={item.title}
              description={item.address}
              coordinate={{ latitude: item.latitude, longitude: item.longitude }}
              pinColor='blue'
              onCalloutPress={() => navigation.push('Detail', { title: item.title, address: item.address, latitude: item.latitude, longitude: item.longitude })}
            />)
        })}

      </MapView>
      <View style={{ position: 'absolute', top: 24, right: 24, left: 24 }}>
        <View style={{ backgroundColor: 'white' }}>
          <SingleLineInput
            value={query}
            placeholder="주소를 입력해주세요."
            onChangeText={setQuery}
            onSubmitEditing={onFindAddress}
          />
        </View>
      </View>
      {currentAddress !== null && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Pressable
            onPress={onPressBottomAddress}
            style={{
              backgroundColor: 'gray',
              paddingHorizontal: 24,
              paddingVertical: 24,
              borderRadius: 30,
            }}>
            <Text style={{ fontSize: 16, color: 'white' }}>{currentAddress}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
