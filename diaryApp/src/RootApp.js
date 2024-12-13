import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigation } from './navigations/RootStackNavigation';
import { SplashView } from './SplashView';

export const RootApp = () => {
  const [initialized, setInitialized] = useState(false);

  if (!initialized) {
    return (
      <SplashView onFinishLoaded={() => setInitialized(true)} />  
    )
  }
  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
};
