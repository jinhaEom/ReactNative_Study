import { useEffect } from 'react';
import { PermissionsAndroid, Platform, ScrollView, StatusBar, View , Text} from 'react-native';
import PushNotification from 'react-native-push-notification';
import { SafeAreaView } from 'react-native-safe-area-context';
import Posts from '../components/Home/Post/Posts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Stories from '../components/Home/Stories';

const Home = () => {
  useEffect(() => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      ).then(result => {
        if (result === 'granted') {
          console.log('알림 권한 허용됨');
        } else {
          console.log('알림 권한 거부됨');
        }
      });
    }
  }, []);

  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'insta-channel',
      channelName: 'insta Channel',
    });
  };
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 15,
          alignItems: 'center',
        }}>
        <View>
          <Text style={{fontSize: 25, fontWeight: '500'}}>Instargram</Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FontAwesome
            name="plus-square-o"
            style={{fontSize: 24, paddingHorizontal: 15}}
          />
          <Feather name="navigation" style={{fontSize: 24}} />
        </View>
      </View>
      <ScrollView>
        <Stories />
        <Posts />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
