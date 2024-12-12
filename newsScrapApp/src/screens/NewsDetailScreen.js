import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { Header } from "../Header/Header";

import { useNavigation, useRoute } from '@react-navigation/native';
import WebView from 'react-native-webview';
import Spacer from '../components/Spacer';
import { useDispatch, useSelector } from 'react-redux';
import { clipNewsItem } from '../actions/news';
export const NewsDetailScreen = (route) => {
    const navigation = useNavigation();
    const routes = useRoute();
    const dispatch = useDispatch();
    const onPressBack = useCallback(() => {
        navigation.goBack();
    })
      const onPressFavorite = useCallback(() => {
        dispatch(clipNewsItem(routes.params.newsItem));
      });
    const isClipped  = useSelector((state) => state.news.favoriteNews.filter((item) => item.link === routes.params.newsItem.link)).length > 0
  
    return (
      <View style={{ flex: 1 }}>
        <Header>
          <Header.Group>
            <Header.Icon
              iconName="arrow-back"
              size={24}
              onPress={onPressBack}
            />
            <Spacer horizontal space={12} />
            <View style={{maxWidth : 200}}>
              <Header.Title title="News Detail" />
            </View>
                </Header.Group>
                <Header.Icon iconName={isClipped ? "heart" : "heart-outline"} onPress={onPressFavorite} />
        </Header>
        <WebView style={{flex:1}} source={{ uri: routes.params.newsItem.link }} />
      </View>
    );
}