import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigation } from './src/navigation/RootStackNavigation';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WEB_CLIENT_ID } from './src/constants/Constants';

// Google 로그인 초기화
GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
});

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>

    </SafeAreaProvider>
  );
}
