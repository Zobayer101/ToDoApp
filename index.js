/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
PushNotification.configure({
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification
  },
  // eslint-disable-next-line no-undef
  requestPermissions: Platform.OS === 'ios',
});
AppRegistry.registerComponent(appName, () => App);
