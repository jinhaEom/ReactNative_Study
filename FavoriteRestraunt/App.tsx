import React from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {NavigationContainer} from "@react-navigation/native";
import {RootNavigation} from "./src/navigation/RootNavigation.tsx";
export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
        <NavigationContainer>
            <RootNavigation/>
        </NavigationContainer>
    </SafeAreaView>
  );
}
