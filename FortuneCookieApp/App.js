import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { getLocales } from "expo-localization";
import { useTranslation } from "./src/lang/use-translation";
import Button from "./src/Button";
import { useCookies } from "./src/use-cookies";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import LoadingView from "./src/LoadingView";
import LottieView from "lottie-react-native";
import { useFonts } from "expo-font";
const deviceLanguage = getLocales()[0].languageCode;

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { t, locale, setLocale, format } = useTranslation();
  const { cookieKey } = useCookies();
  const [isLoaded, setIsLoaded] = useState(false);
  const [fontsLoaded] = useFonts({
    "RIDIBatang": require("./assets/RIDIBatang.otf"),
  });
  const todayText = format(
    t("today_is"),
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  );
  const locales = ["ko", "en", "ja", "zh", "es"];
  useEffect(() => {
    if (cookieKey !== "") {
      setIsLoaded(true);
    }
  }, [cookieKey]);

  useEffect(() => {
    if (locale !== null ) {
      SplashScreen.hideAsync();
    }
  }, [locale]);

  if (!isLoaded) return <LoadingView />;
  return (
    <View style={styles.container}>
      <LottieView
        source={require("./assets/background.json")}
        autoPlay
        loop
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topContainer}>
          <Text style={styles.todayText}>{todayText}</Text>
          <Text style={styles.cookieText}>{t(cookieKey)}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.buttonsContainer}>
            {locales.map((item) => (
              <Button
                key={item}
                onPress={() => setLocale(item)}
                isSelected={locale === item}
                text = {item.toUpperCase()}
              />
            ))}
         
          </View>
        </View>
      </SafeAreaView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  todayText: {
    position: "absolute",
    top: 70,
    fontSize: 13,
    color: "#8b658f",
  },
  cookieText: {
    fontFamily: "RIDIBatang",
    fontSize: 22,
    color: "#372538",
    textAlign: "center",
    marginHorizontal: 30,
  },
  bottomContainer: {
    flex: 1,
    fontFamily: "RIDIBatang",

    justifyContent: "flex-end",
    marginBottom: 50,
  },

  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 25,
  },
});
