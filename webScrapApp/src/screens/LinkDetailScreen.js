import { View, Text } from 'react-native'
import React from 'react'
import { Header } from "../Header/Header";
import Spacer from '../components/Spacer';
import { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import WebView from 'react-native-webview';

const LinkDetailScreen = () => {
    const routes = useRoute();
    const navigation = useNavigation();
    const onPressBack = useCallback(() => {
        navigation.goBack();
    }, []);
  return (
      <View style={{ flex: 1 }}>
          <Header>
              <Header.Group>
                  <Header.Icon iconName="arrow-back" onPress={onPressBack} />
                  <Spacer space={12} />
                  <Header.Title title="LINK DETAIL" />
              </Header.Group>
          </Header>
          <WebView
          style={{flex:1}}
          source={{uri: routes.params.item.link}}
          />
    </View>
  )
}

export default LinkDetailScreen