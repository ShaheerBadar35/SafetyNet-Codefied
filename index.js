/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {store} from '@redux/store';
import {resetUser} from '@redux/reducers/userReducer';
import {NOTIFICATION_TYPES} from '@utils/enums';

messaging().setBackgroundMessageHandler(async remoteMessage => {
   // $&
  const {id} = remoteMessage.data;
  if (id == NOTIFICATION_TYPES.APP_UPDATE) {
    store.dispatch(resetUser());
  }
   // $&
});

AppRegistry.registerComponent(appName, () => App);
