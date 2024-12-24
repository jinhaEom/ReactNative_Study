import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, useColorScheme } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootNavigation } from "./src/navigations/RootNavigation";

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle ={ 
    backgroundColor : isDarkMode ? '#f8f8f8' : '#e9e9e9',
  };
  return(
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      backgroundColor={backgroundStyle.backgroundColor}/>

      <NavigationContainer>
        <RootNavigation/>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}