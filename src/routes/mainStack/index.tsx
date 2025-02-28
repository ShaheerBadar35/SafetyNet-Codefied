import SettingsModal from '@components/settingsModal';
import firebase from '@react-native-firebase/app';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {resetUser, setIntegrationSettings} from '@redux/reducers/userReducer';
import BottomTabs from '@routes/bottomTabsStack';
import {handleIntegrationDevice} from '@screens/integrationSettings/helper';
import PrivacyPolicy from '@screens/privacyPolicy';
import TermsAndConditions from '@screens/termsAndConditions';
import {handleIntegrationSettingsWatchData} from '@services/IntegrationSettingsService';
import {INTEGRATION_SETTINGS_DEVICE, SKUS, TOAST_TYPES} from '@utils/constants';
import {monitorFitbitHeartMonitoring} from '@utils/helper';
import {ROUTES} from '@utils/routes';
import React, {createContext, useEffect, useState} from 'react';
import {Linking, NativeEventEmitter, NativeModules} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {NOTIFICATION_TYPES} from '@utils/enums';
import GeofencingCrossedModal from '@components/geofencingCrossedModal';
import * as RNIap from 'react-native-iap';
import {hitValidateSubscriptionAPI} from '@screens/plan/helper';
import SettingsScreen from '@components/settingsModal';
const Stack = createStackNavigator();

const {VoiceRecognitionModule} = NativeModules;
const voiceRecognitionEvents = new NativeEventEmitter(VoiceRecognitionModule);

// const firebaseConfig = {
//   apiKey: 'AIzaSyAW94GumXHvVJIbU0pTMdPFJRNHCEmSBuk',
//   // authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: 'safety-net-af7bd',
//   storageBucket: 'safety-net-af7bd.appspot.com',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: '1:725212882343:android:5fb680d696b68dff7c0282',
// };

export const ModalContext = createContext(undefined);

const getQueryParams = async (url: any) => {
  const params: any = {};
  const queryString = url.split('?')[1].split('#')[0]; // Get everything after "?" and before "#"
  const pairs = queryString.split('&'); // Split by '&' to get key-value pairs

  // Loop through each pair and store them in the params object
  pairs.forEach((pair: any) => {
    const [key, value] = pair.split('=');
    params[key] = decodeURIComponent(value);
  });

  return await params;
};

const MainStack = () => {
  const {user} = useSelector((state: any) => state.root.user);
  const dispatch: any = useDispatch();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showGeofencingModal, setShowGeofencingModal] = useState(false);
  const [geofencingData, setGeofencingData] = useState<any>({});

  const handleDeepLink = async (event: any) => {
    const {url} = event;
    console.log('Deep link URL:', url);

    const urlParams = await getQueryParams(url);

    console.log('Access Token:', urlParams.access_token);
    console.log('Refresh Token:', urlParams.refresh_token);
    console.log('Expires In:', urlParams.expires_in);

    const currentTime = Date.now() * 1000;
    const expiryTime = Number(urlParams?.expires_in);
    const totalTime = currentTime + expiryTime;

    console.log(
      'TIME: ',
      new Date(new Date().getTime() + Number(urlParams?.expires_in) * 1000),
      new Date(),
    );

    const params: any = {
      email: user?.email,
      access_token: urlParams?.access_token,
      refresh_token: urlParams?.refresh_token,
      expires_in: new Date(
        new Date().getTime() + Number(urlParams?.expires_in) * 1000,
      ),
    };

    handleIntegrationSettingsWatchData(params)
      .then(({data}: any) => {
        Toast.show({
          type: TOAST_TYPES.LIGHT_SUCCESS,
          props: {
            title: 'OAuth successfull',
          },
        });
        dispatch(setIntegrationSettings(data?.data?.integration_settings));
        setTimeout(() => {
          handleIntegrationDevice(
            user?.email,
            INTEGRATION_SETTINGS_DEVICE?.FITBIT,
            dispatch,
          );
        }, 500);
      })
      .catch((error: any) => {
        console.log('Main Stack error is: ', error);
      });
  };
  // useEffect(() => {
  //   if (!VoiceRecognitionModule) {
  //     console.error('VoiceRecognitionModule is null');
  //     return;
  //   }

  //   // Setup the subscription to listen for speech recognition events
  //   const subscription = voiceRecognitionEvents.addListener(
  //     'SPEECH_RECOGNIZED',
  //     event => {
  //       console.log('Recognized Text:', event.recognizedText);
  //     },
  //   );

  //   // Cleanup the subscription when the component unmounts
  //   return () => {
  //     // subscription.remove();
  //   };
  // }, []);

  // const startService = () => {
  //   if (VoiceRecognitionModule) {
  //     VoiceRecognitionModule.startService()
  //       .then((result: any) => console.log(result))
  //       .catch((error: any) => console.error(error));
  //   } else {
  //     console.error('VoiceRecognitionModule is null');
  //   }
  // };

  // const stopService = () => {
  //   if (VoiceRecognitionModule) {
  //     VoiceRecognitionModule.stopService()
  //       .then((result: any) => console.log(result))
  //       .catch((error: any) => console.error(error));
  //   } else {
  //     console.error('VoiceRecognitionModule is null');
  //   }
  // };

  // useEffect(() => {
  //   startService();
  // }, []);

  useEffect(() => {
    if (user) {
      const isFitbit =
        user?.integration_settings?.heartbeat_monitoring?.device ==
        INTEGRATION_SETTINGS_DEVICE?.FITBIT;
      if (isFitbit) {
        const access_token: any =
          user?.integration_settings?.heartbeat_monitoring?.watch_data
            ?.access_token;
        const refresh_token: any =
          user?.integration_settings?.heartbeat_monitoring?.watch_data
            ?.refresh_token;
        const expires_in: any =
          user?.integration_settings?.heartbeat_monitoring?.watch_data
            ?.expires_in;
        monitorFitbitHeartMonitoring(access_token, refresh_token, expires_in);
      }
    }
  }, [user]);

  useEffect(() => {
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Cleanup listener when the component unmounts
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      console.log('Notification received in foreground:', remoteMessage);

      const {data} = remoteMessage;
      const {id} = remoteMessage?.data;
      const {title, body} = remoteMessage?.notification;
      console.log('id is: ', id);
      if (id == NOTIFICATION_TYPES.APP_UPDATE) {
        dispatch(resetUser());
      } else if (id == NOTIFICATION_TYPES.GEOFENCING_LIMIT_CROSSED) {
        setShowGeofencingModal(() => true);
        setGeofencingData(() => data);
      } else
        Toast.show({
          type: TOAST_TYPES.DARK_SUCCESS,
          props: {
            title: body,
          },
        });
      // Show a custom notification or update the app state
    });

    return unsubscribe;
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const subscriptions: any = await RNIap.getSubscriptions({skus: SKUS});
      console.log('Available subscriptions:', subscriptions);
      // console.log(
      //   'offer ====> ',
      //   subscriptions?.[1]?.['subscriptionOfferDetails'],
      // );
    } catch (err) {
      console.warn('Error fetching subscriptions:', err);
    }
  };

  useEffect(() => {
    let purchaseUpdateListener: any = null;
    let purchaseErrorListener: any = null;

    const initIAP = async () => {
      try {
        await RNIap.initConnection();

        purchaseUpdateListener = RNIap.purchaseUpdatedListener(
          async (purchase: any) => {
            Toast.show({
              type: TOAST_TYPES.DARK_SUCCESS,
              props: {
                title: 'Inside Purchase',
              },
            });
            const receipt = purchase?.[0]?.transactionReceipt;
            const params: any = {
              packageName: 'com.safetynet.app',
              email: user?.email,
              // transactionReceipt: purchase.transactionReceipt,
              productId: purchase?.[0]?.productId,
              purchaseToken: purchase?.[0]?.purchaseToken,
              response: purchase?.[0],
            };

            const response: any = await hitValidateSubscriptionAPI(params);

            if (response) {
              Toast.show({
                type: TOAST_TYPES.DARK_SUCCESS,
                props: {
                  title: 'Inside',
                },
              });
              await RNIap.acknowledgePurchaseAndroid(
                purchase?.[0]?.purchaseToken,
              );
            }
            if (receipt) {
              // Validate receipt on your backend with Google Play
              await RNIap.finishTransaction(purchase); // Mark the transaction as complete
            }
          },
        );

        purchaseErrorListener = RNIap.purchaseErrorListener(error => {
          // console.warn('Purchase Error:', error);
          // Toast.show({
          //   type: TOAST_TYPES.ERROR,
          //   props: {
          //     title: error || 'Purchase Error',
          //   },
          // });
        });
      } catch (err) {
        console.warn('Error initializing IAP:', err);
      }
    };

    initIAP();
    fetchSubscriptions();

    return () => {
      RNIap.endConnection();
      if (purchaseUpdateListener) {
        purchaseUpdateListener.remove();
      }
      if (purchaseErrorListener) {
        purchaseErrorListener.remove();
      }
    };
  }, []);

  return (
    <ModalContext.Provider
      value={{showSettingsModal, setShowSettingsModal} as any}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        initialRouteName={ROUTES.TABS}>
        <Stack.Screen name={ROUTES.TABS} component={BottomTabs} />
        <Stack.Screen name={ROUTES.PRIVACY_POLICY} component={PrivacyPolicy} />
        <Stack.Screen
          name={ROUTES.TERMS_AND_CONDITIONS}
          component={TermsAndConditions}
        />
        <Stack.Screen name={ROUTES.SETTINGS_STACK} component={SettingsScreen} />
      </Stack.Navigator>
      {/* <SettingsModal
        open={showSettingsModal}
        onPressCancel={() => setShowSettingsModal(false)}
      /> */}
      {showGeofencingModal && geofencingData?.contacts && (
        <GeofencingCrossedModal
          open={showGeofencingModal}
          child_name={geofencingData?.child_name}
          location_name={geofencingData?.location_name}
          contacts={JSON.parse(geofencingData?.contacts)}
          onPressClose={() => setShowGeofencingModal(false)}
          onPressBtn={() => setShowGeofencingModal(false)}
        />
      )}
    </ModalContext.Provider>
  );
};

export default MainStack;
