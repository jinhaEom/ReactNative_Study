import { AdMobRewarded } from "expo-ads-admob";
import { Platform } from "react-native";
const UNIT_ID = Platform.select({
    ios :  "ca-app-pub-6075067783944523/7509452836",
    android :  "ca-app-pub-6075067783944523/4284523690"
})



export const useRewardAd = () => {
    const loadRewardAd = async () => {
        await AdMobRewarded.setAdUnitID(UNIT_ID);
        await AdMobRewarded.requestAdAsync();
        await AdMobRewarded.showAdAsync();
    }
    return {
      loadRewardAd,
    };
}