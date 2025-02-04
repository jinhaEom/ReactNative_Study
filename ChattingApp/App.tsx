import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback, useContext } from 'react';
import { RootStackParamList } from './src/types';
import SignUpScreen from './src/SignUpScreen/SignUpScreen';
import AuthProvider from './src/components/AuthProvider';
import SignInScreen from './src/SignInScreen/SignInScreen';
import AuthContext from './src/components/AuthContext';
import HomeScreen from './src/HomeScreen/HomeScreen';
import LoadingScreen from './src/LoadingScreen/LoadingScreen';
import ChatScreen from './src/ChatScreen/ChatScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();

const Screens = () => {
  const { user, processingSignIn, processingSignUp, initialized } = useContext(AuthContext);
  const renderRootStack = useCallback(() => {
    if(!initialized){
      return <Stack.Screen name="Loading" component={LoadingScreen} />;
    }
    if (user != null && !processingSignIn && !processingSignUp) {
      //login 된 상태
      return (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </>
      );
    }
    return (
      //로그아웃된 상태
      <>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
      </>
    );
  }, [user, processingSignIn, processingSignUp, initialized]);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {renderRootStack()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Screens />
    </AuthProvider>
  );
};

export default App;
