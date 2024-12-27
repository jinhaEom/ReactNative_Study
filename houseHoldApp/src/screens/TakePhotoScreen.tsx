import React, {useCallback, useEffect, useRef} from 'react';
import {View, Platform} from 'react-native';
import {Header} from '../components/Header/Header';
import {useRootNavigation, useRootRoute} from '../navigations/RootNavigation';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import { Button } from '../components/Button';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

export const TakePhotoScreen = () => {
  const navigation = useRootNavigation<'TakePhoto'>();
  const routes = useRootRoute<'TakePhoto'>();
  const cameraRef = useRef<Camera>(null);
  const device = useCameraDevice('back');


  useEffect(() => {
    Camera.requestCameraPermission();
  }, [])
  const onPressTakePhoto = useCallback(async () => {
    const result = await cameraRef.current?.takePhoto();
    if(result){
        const path = `${Platform.OS === 'android' ? 'file://' : ''}${result.path}`;
        const saveResult = await CameraRoll.saveAsset(path, { type: 'photo', album: 'AccountBook' });
        routes.params.onTakePhoto(saveResult.node.image.uri);
        navigation.goBack();
    }
  }, [routes.params, navigation]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="사진 찍기" />
        <Header.Icon
          iconName="close"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </Header>
      <View style={{flex: 1}}>
        <View style={{flex: 2}}>
          {device != null && (
            <Camera
              ref={cameraRef}
              style={{flex: 1}}
              device={device}
              isActive={true}
              photo
            />
          )}
        </View>
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <Button onPress={onPressTakePhoto}>
                <View style={{width : 100, height : 100, borderRadius:50, backgroundColor : 'black', alignItems:'center', justifyContent: 'center'}}>
                    <View style={{width:80, height : 80, borderRadius:40, backgroundColor:'white'}} />
                </View>
            </Button>
        </View>
      </View>
    </View>
  );
};
