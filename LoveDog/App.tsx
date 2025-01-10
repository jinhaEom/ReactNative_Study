import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigation } from './src/navigation/RootStackNavigation';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Google 로그인 초기화
GoogleSignin.configure({
  webClientId: '705409136322-dec5ojmbp57oba0niui4u4gqo069k4i4.apps.googleusercontent.com',
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
