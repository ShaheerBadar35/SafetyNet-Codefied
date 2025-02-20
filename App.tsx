import CustomToastConfig from '@components/CustomToastConfig';
import GeofencingCrossedModal from '@components/geofencingCrossedModal';
import {SafeAreaInsetsProvider} from '@components/safeAreaInsets';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {resetUser} from '@redux/reducers/userReducer';
import {persistor, store} from '@redux/store';
import Routes from '@routes';
import {navigationRef} from '@services/NavService';
import {
  requestAllPermissions,
  requestNotificationsPermission,
} from '@services/PermissionService';
import {setupAxios} from '@utils/config';
import {NOTIFICATION_TYPES} from '@utils/enums';
import React, {useEffect, useState} from 'react';
import {Platform, StatusBar, UIManager} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import { Linking, Alert } from 'react-native';
function App(): React.JSX.Element {
  // const {user} = useSelector((state: any) => state.root.user);
  const [showGeofencingModal, setShowGeofencingModal] = useState(false);
  const [geofencingData, setGeofencingData] = useState<any>({});

  useEffect(() => {
    const handleDeepLink = (event : any) => {
      const url = event.url;
      if (url) {
        // Process the deep link URL
        const query = url.split('safetynet/')[1];
        if (query) {
          Alert.alert('Deep Link Triggered', `Keyword: ${query}`);
        }
      }
    };

    // Add event listener for deep links
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Check if the app was opened with a deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        const query = url.split('safetynet/')[1];
        if (query) {
          Alert.alert('App Opened via Deep Link', `Keyword: ${query}`);
        }
      }
    });

    // Cleanup the event listener on unmount
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    StatusBar.setHidden(true, 'none');
    requestAllPermissions();
    requestNotificationsPermission();
    setTimeout(() => {
      BootSplash.hide({fade: true});
      StatusBar.setHidden(false, 'slide');
    }, 5000);
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    setupAxios();
  }, []);

  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then((remoteMessage: any) => {
        if (remoteMessage) {
          // console.log(
          //   'Notification caused app to open from background state:',
          //   remoteMessage,
          // );

          const {data} = remoteMessage;
          const {id} = remoteMessage.data;
           // $&
          if (id == NOTIFICATION_TYPES.APP_UPDATE) {
            store.dispatch(resetUser());
          } else if (id == NOTIFICATION_TYPES.GEOFENCING_LIMIT_CROSSED) {
            setShowGeofencingModal(() => true);
            setGeofencingData(() => data);
          }
        }
      });

    const unsubscribe = messaging().onNotificationOpenedApp(
      (remoteMessage: any) => {
         // $&

        const {data} = remoteMessage;
        const {id} = remoteMessage.data;
         // $&
        if (id == NOTIFICATION_TYPES.APP_UPDATE) {
          store.dispatch(resetUser());
        } else if (id == NOTIFICATION_TYPES.GEOFENCING_LIMIT_CROSSED) {
           // $&
          setShowGeofencingModal(() => true);
          setGeofencingData(() => data);
        }
      },
    );

    return unsubscribe;
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaProvider>
            <SafeAreaInsetsProvider>
              <NavigationContainer ref={navigationRef}>
                <Routes />
                <Toast
                  position="top"
                  config={CustomToastConfig}
                  /* @ts-ignore */
                  swipeable={false}
                />
              </NavigationContainer>
            </SafeAreaInsetsProvider>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
      {showGeofencingModal && geofencingData?.contacts && (
        <GeofencingCrossedModal
          open={true}
          child_name={geofencingData?.child_name}
          location_name={geofencingData?.location_name}
          contacts={JSON.parse(geofencingData?.contacts)}
          onPressClose={() => setShowGeofencingModal(false)}
          onPressBtn={() => setShowGeofencingModal(false)}
        />
      )}
    </GestureHandlerRootView>
  );
}

export default App;
