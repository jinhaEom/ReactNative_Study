import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WEB_CLIENT_ID } from './src/constants/Constants';
import { Provider } from 'react-redux';
import store from './src/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  RootStackNavigation,
  TypeRootStackNavigationParams,
} from './src/navigation/RootStackNavigation';
// Google 로그인 초기화
GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
});

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <GestureHandlerRootView style={{flex:1}}>
          <NavigationContainer<TypeRootStackNavigationParams>
          linking={{
            prefixes:['mydog://'],
            config:{
              screens:{
                HistoryList : '/history',
                Main : {
                  path : '/',
                  screens:{
                    Main : '/main',
                    My : '/my',
                  },
                },
              },
            },
          }}>
            <RootStackNavigation />
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    </SafeAreaProvider>
  );
}
