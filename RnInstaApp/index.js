/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios';


AppRegistry.registerComponent(appName, () => App);

PushNotification.configure({
  onNotification: function (notification) {
        console.log('Notification', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});