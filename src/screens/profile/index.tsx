import AccountRemovalModal from '@components/accountRemovalModal';
import AddFromContactModal from '@components/addFromContactModal';
import AddFromExistingContactModal from '@components/addFromExistingContactModal';
import AddNewContactModal from '@components/addNewContactModal';
import EmergencyContacts from '@components/emergencyContacts';
import EmergencyKeyword from '@components/emergencyKeyword';
import PlanExpiredModal from '@components/planExpiredModal';
import ProfileHeader from '@components/profileHeader';
import {useSafeArea} from '@components/safeAreaInsets';
import Wrapper from '@components/wrapper';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {navigate} from '@services/NavService';
import {COLORS} from '@theme/colors';
import {HP, RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {AppState, DeviceEventEmitter, Linking} from 'react-native';
import {
  isAccountRemoved,
  isPlanExpied,
  startListeningForSpeech,
} from '@utils/helper';
import {ROUTES} from '@utils/routes';
import React, {useEffect, useRef, useState} from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addContact,
  addEmergencyContacts,
  addEmergencyKeyword,
  checkGeofencingLocationsWithCurrentLocation,
  checkLocationServiceRefForChild,
  getContacts,
  handleNativeSms,
  handleTwilioCall,
  setLocationServiceRefForChild,
} from './helper';
import CustomFooter from '@components/customFooter';
import {PERMISSIONS, request} from 'react-native-permissions';
import Voice from '@react-native-voice/voice';
import {makeCall} from '@services/profileService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {POWER_BUTTON_LISTENER_KEY, TOAST_TYPES} from '@utils/constants';
import {authorize} from 'react-native-app-auth';
import CustomButton from '@components/customButton';
import axios from 'axios';
import {handleFitbitRefreshToken} from '@services/IntegrationSettingsService';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import Toast from 'react-native-toast-message';

const {VoiceRecognitionModule} = NativeModules;
const voiceRecognitionEvents = new NativeEventEmitter(VoiceRecognitionModule);

const {KeywordService} = NativeModules;
const keywordEvents = new NativeEventEmitter(KeywordService);

const {LocationServiceModule} = NativeModules;
const {FunctionServiceModule} = NativeModules;
// const eventEmitter = new NativeEventEmitter(LocationServiceModule);

// const {ScreenStateModule} = NativeModules;
// const screenStateEmitter = new NativeEventEmitter(ScreenStateModule);

// const {MyServiceModule} = NativeModules;

export const startFunctionService = async (interval: any) => {
  try {
    await FunctionServiceModule.startService(interval);
  } catch (error) {
    console.error(error);
  }
};

export const stopFunctionService = async () => {
  try {
    await FunctionServiceModule.stopService();
  } catch (error) {
    console.error(error);
  }
};

const functionServiceEventEmitter = new NativeEventEmitter(
  FunctionServiceModule,
);
export const subscribeToFunctionCall = (callback: any) => {
  return eventEmitter.addListener('FunctionCall', callback);
};

export const subscribeToVersionCall = (callback: any) => {
  return eventEmitter.addListener('VersionCall', callback);
};

const startLocationService = () => {
  LocationServiceModule.startLocationService()
    .then((result: any) => {
       // $& // Service started successfully
    })
    .catch((error: any) => {
      console.error(error); // Handle permission errors or other issues
    });
};

const stoptLocationService = () => {
  LocationServiceModule.stopLocationService()
    .then((result: any) => {
       // $& // Service started successfully
    })
    .catch((error: any) => {
      console.error(error); // Handle permission errors or other issues
    });
};

const {ScreenServiceModule} = NativeModules;
const eventEmitter = new NativeEventEmitter(ScreenServiceModule);

const config: any = {
  clientId: '23PRRX',
  clientSecret: 'e56c4286701f0634cf5528e367c20c46',
  redirectUrl:
    // 'com.safetynet.app://oauthredirect',
    'https://us-central1-safety-net-af7bd.cloudfunctions.net/fitbitCallback',
  scopes: ['heartrate', 'activity'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
    tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
    revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
  },
};

const handleFitbitRefreshTokenApi = async () => {
  try {
    const params: any = {
      refresh_token:
        'e038e0a38348a5beecdfaa6fce89cde67e13976fbb6e791ef6d622c5b52e0879',
    };
    const response = await handleFitbitRefreshToken(params);
     // $&
  } catch (error: any) {
     // $&
  }
};

const handleFitbitOAuthApi = async () => {
  try {
    const authUrl = `${
      config.serviceConfiguration.authorizationEndpoint
    }?response_type=code&client_id=${
      config.clientId
    }&redirect_uri=${encodeURIComponent(
      config.redirectUrl,
    )}&scope=${config.scopes.join('%20')}`;
    await Linking.openURL(authUrl);
  } catch (error: any) {
     // $&
  }
};

const handleFitbitHeartRateMonitoringApi = async (user: any = {}) => {
  try {
    const date = 'today'; // or 'YYYY-MM-DD'
    const period = '1d'; // Retrieve 1-day data

    const response = await axios.get(
      `https://api.fitbit.com/1/user/-/activities/heart/date/${date}/${period}.json`,
      {
        headers: {
          Authorization: `Bearer ${user?.integration_settings?.heartbeat_monitoring?.watch_data?.access_token}`,
        },
      },
    );
    Toast.show({
      type: TOAST_TYPES.LIGHT_SUCCESS,
      props: {
        title: `Google fit heart rate: length -> ${response?.data?.['activities-heart-intraday']?.dataset?.length} ${response?.data?.['activities-heart-intraday']?.dataset}`,
      },
    });
     // $&
  } catch (error: any) {
    //  // $&
  }
};

const googleWatchAuthorization = async () => {
  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_BODY_READ,
      Scopes.FITNESS_HEART_RATE_READ,
    ],
  };

   // $&

  if (GoogleFit.isAuthorized) {
     // $&
  } else {
     // $&
  }

  GoogleFit.authorize(options)
    .then(res => {
      if (res.success) {
         // $&
      } else {
        console.error('Authorization failed:', res.message);
      }
    })
    .catch(err => console.error('Google Fit error:', err));
};

const getGoogleWatchHeartRateData = async () => {
  try {
    // const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // One week ago
    // const endDate = new Date(); // Now

    const startDate = new Date(Date.now() - 18 * 60 * 60 * 1000); // 2 hours ago
    const endDate = new Date(); // Current time

    GoogleFit.getHeartRateSamples({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    })
      .then(results => {
        Toast.show({
          type: TOAST_TYPES.LIGHT_SUCCESS,
          props: {
            title: `Google watch heart data: ${results?.length} ${results}`,
          },
        });
         // $&
      })
      .catch(err => console.error('Error fetching heart rate data:', err));
  } catch (error: any) {
     // $&
  }
};

const Profile = () => {
  const {user} = useSelector((state: any) => state.root.user);
  const appStateSubscriptionRef = useRef<any>(null);
  const [emergencyKeyword, setEmergencyKeyword] = useState(
    user?.user_emergency_keyword || '',
  );
  const emergencyKeywordRef = useRef<any>(user?.user_emergency_keyword || '');
  const [contactsList, setContactsList] = useState([]);
  const [selectedContactsList, setSelectedContactsList] = useState(
    user?.emergency_contacts || [],
  );
  const selectedContactsListRef = useRef<any>(user?.emergency_contacts || []);
  const gestureEmergencyAlertsRef = useRef<any>(
    user?.gesture_emergency_alerts || false,
  );
  const powerButtonListenerRef = useRef<any>(null);
  const [modal, setModal] = useState({
    addFromContacts: false,
    addFromExistingContact: false,
    addNewContact: false,
  });
  const [selectedContactOption, setSelectedContactOption] = useState<any>('');
  const insets: any = useSafeArea();
  const [disabled, setDisabled] = useState(
    user?.is_child_account == 1 ? true : false,
  );
  const [showAccountRemovalModal, setShowAccountRemovalModal] = useState(
    isAccountRemoved(user) || false,
  );
  const [showPlanExpiredModal, setShowPlanExpiredModal] = useState(
    isPlanExpied(user) || false,
  );
  const isLocationServiceStartedRef: any = useState(false);
  const tabBarHeight: any = useBottomTabBarHeight();
  const dispatch: any = useDispatch();

  const toggleModal = (modalName: string, isVisible: boolean) => {
    setModal(prevModals => ({...prevModals, [modalName]: isVisible}));
  };

  const startListening = async () => {
    const result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    try {
      await Voice.start('en-US');
    } catch (e: any) {
       // $&
    }
  };

   // $&
  const addSelectedContact = (contacts: any) => {
    addEmergencyContacts(
      {
        email: user?.email,
        emergency_contacts: contacts,
      },
      dispatch,
      'Contact added Successfully',
    );
    //  // $&
  };

  const deleteSelectedContact = (contacts: any) => {
    addEmergencyContacts(
      {
        email: user?.email,
        emergency_contacts: contacts,
      },
      dispatch,
      'Contact deleted Successfully',
    );
  };

  useEffect(() => {
    setSelectedContactsList(user?.emergency_contacts || []);
  }, [user?.emergency_contacts]);

  const onSpeechResults = async (event: any) => {
    const find_value = emergencyKeywordRef.current?.toLowerCase();
    const found = event?.value?.[0]?.toLowerCase();
    if (
      user?.user_emergency_keyword?.length > 0 &&
      find_value &&
      found?.includes(find_value)
    ) {
      makeCall(selectedContactsListRef?.current || []);
    }
  };

  const onSpeechError = (event: any) => {
    console.error('Speech Error:', event.error.message);
    startListening();
  };

  const onSpeechStart = () => {
     // $&
  };

  const onSpeechEnd = () => {
     // $&
    startListening();
  };

  useEffect(() => {
    const cleanupListeners = () => {
      Voice.removeAllListeners(); // Clean up existing listeners
    };

    cleanupListeners();
    // startListening();

    // Voice.onSpeechPartialResults = onSpeechResults;
    // Voice.onSpeechError = onSpeechError;
    // Voice.onSpeechStart = onSpeechStart;
    // Voice.onSpeechEnd = onSpeechEnd;

    return () => {
      cleanupListeners();
    };
  }, [user?.user_emergency_keyword]);

  useEffect(() => {
    // user?.handle_emergency_keyword && startListening();
    !user?.handle_emergency_keyword &&
      Voice.destroy().then(Voice.removeAllListeners);
  }, [user?.handle_emergency_keyword]);

  useEffect(() => {
    if (modal?.addFromExistingContact) getContacts(setContactsList);
  }, [modal?.addFromExistingContact]);

  useEffect(() => {
    emergencyKeywordRef.current = emergencyKeyword;
  }, [emergencyKeyword]);

  useEffect(() => {
    selectedContactsListRef.current = selectedContactsList;
  }, [selectedContactsList]);

  useEffect(() => {
    if (
      (user?.user_emergency_keyword != 'undefined' &&
        user?.user_emergency_keyword != emergencyKeyword) ||
      (user?.user_emergency_keyword == 'undefined' &&
        emergencyKeyword?.length > 0)
    )
      addEmergencyKeyword(
        {
          email: user?.email,
          user_emergency_keyword: emergencyKeyword,
        },
        dispatch,
      );
  }, [emergencyKeyword]);

  // useEffect(() => {
  //    // $&
  //   if (
  //     (typeof user?.emergency_contacts == 'undefined' &&
  //       selectedContactsList?.length > 0) ||
  //     selectedContactsList?.length != user?.emergency_contacts?.length
  //   ) {
  //     addEmergencyContacts(
  //       {
  //         email: user?.email,
  //         emergency_contacts: selectedContactsList,
  //       },
  //       dispatch,
  //     );
  //   }

  // }, [selectedContactsList]);

  ScreenServiceModule.startScreenService();

  useEffect(() => {
    gestureEmergencyAlertsRef.current = user?.gesture_emergency_alerts || false;
    const handleAppStateChange = async (nextAppState: any) => {
       // $&
      const isListenerSet = await AsyncStorage.getItem(
        POWER_BUTTON_LISTENER_KEY,
      );
      if (!isListenerSet) {
        await AsyncStorage.setItem(POWER_BUTTON_LISTENER_KEY, 'true');
        powerButtonListenerRef.current = eventEmitter.addListener(
          'PowerButtonPressed',
          event => {
             // $&
            gestureEmergencyAlertsRef.current &&
              handleTwilioCall(user?.emergency_contacts || []);
            gestureEmergencyAlertsRef.current &&
              handleNativeSms(user?.emergency_contacts || []);
            // Handle the power button press
          },
        );
      }
      if (nextAppState === 'active') {
        // Handle the power button press if required
        if (powerButtonListenerRef.current) {
          // You can handle the power button press here if needed
        }
      }
    };

    // Check if gesture_emergency_alerts is true
    if (user?.gesture_emergency_alerts) {
      //       const isListenerSet = await AsyncStorage.getItem(
      //         POWER_BUTTON_LISTENER_KEY,
      //       );
      // If the app state subscription has not been created yet
      // if (!appStateSubscriptionRef.current) {
      appStateSubscriptionRef.current = AppState.addEventListener(
        'change',
        handleAppStateChange,
      );
      // }
      // // If the power button listener is not created, add it
      // if (!powerButtonListenerRef.current) {
      //   powerButtonListenerRef.current = eventEmitter.addListener(
      //     'PowerButtonPressed',
      //     event => {
      //        // $&
      //       // Handle the power button press
      //     },
      //   );
      // }
    } else {
      // Remove listener when gesture_emergency_alerts is false
      if (powerButtonListenerRef.current) {
        powerButtonListenerRef.current.remove();
        powerButtonListenerRef.current = null; // Clear reference after removal
      }
      async function removeLocalStorage() {
        await AsyncStorage.removeItem(POWER_BUTTON_LISTENER_KEY);
      }
      removeLocalStorage();
      ScreenServiceModule.stopScreenService();
    }

    // Cleanup function to remove the app state listener on component unmount
    return () => {
      if (appStateSubscriptionRef.current) {
        appStateSubscriptionRef.current.remove(); // Cleanup the app state listener
        appStateSubscriptionRef.current = null; // Clear reference after removal
      }
    };
  }, [user?.gesture_emergency_alerts]);

  useEffect(() => {
    // const locationSubscription = DeviceEventEmitter.addListener(
    //   'LocationUpdate',
    //   (data: any) => {
    //      // $&
    //   },
    // );

    // startLocationService();

    // stoptLocationService();

    return () => {
      // locationSubscription.remove();
    };
  }, []);

  const handleChildLocationService = async () => {
    const checkRef: any = await checkLocationServiceRefForChild();
     // $&
    if (checkRef) {
       // $&
      startLocationService();
      // eventEmitter.addListener('LocationUpdate', data => {
      //    // $&
      //   // Handle the location data (latitude, longitude)
      // });
    } else {
       // $&
      setLocationServiceRefForChild(
        user?.geofencing?.handle_geofencing == true,
      );
      startLocationService();
      // eventEmitter.addListener('LocationUpdate', data => {
      //    // $&
      //   // Handle the location data (latitude, longitude)
      // });
    }
  };

  useEffect(() => {
    const currentDateInSeconds = Math.floor(Date.now() / 1000);
    if (
      user?.is_child_account == 1 &&
      user?.is_plan_purchased == 1 &&
      user?.expiry_date?.seconds >= currentDateInSeconds
    ) {
       // $&
      if (user?.geofencing?.handle_geofencing == true) {
        handleChildLocationService();
      } else {
         // $&
        stoptLocationService();
      }
       // $&);
    }
  }, [user]);

  useEffect(() => {
    eventEmitter.addListener('LocationUpdate', data => {
       // $&
      const currentDateInSeconds = Math.floor(Date.now() / 1000);
      if (
        user?.is_child_account == 1 &&
        user?.is_plan_purchased == 1 &&
        user?.expiry_date?.seconds >= currentDateInSeconds &&
        user?.geofencing?.handle_geofencing
      ) {
        checkGeofencingLocationsWithCurrentLocation(
          user?.geofencing?.safe_locations,
          user?.geofencing?.safe_zone,
          data?.latitude,
          data?.longitude,
          user?.emergency_contacts,
        );
      }
      // Handle the location data (latitude, longitude)
    });

    return () => {};
  }, []);

  useEffect(() => {
    startFunctionService(5000); // Calls the function every 5 seconds

    const subscription = subscribeToFunctionCall(() => {
      handleFitbitHeartRateMonitoringApi(user);
      //  // $&
    });

    return () => {
      // stopFunctionService();
      // subscription.remove();
    };
  }, []);

   // $&

  return (
    <Wrapper barStyle="dark-content" noPaddingTop noPaddingBottom>
      <ProfileHeader
        title={user?.profile?.name}
        profile={user?.profile?.profileImage}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          styles.container,
          {
            paddingBottom: insets?.bottom + tabBarHeight + RF(12),
          },
        ]}>
        <EmergencyKeyword
          disableAll={disabled}
          text={emergencyKeyword}
          setText={setEmergencyKeyword}
          containerStyle={{...SPACING.mb6}}
        />
        {/* <CustomButton
          title="Fitbit Refresh"
          onPress={handleFitbitRefreshTokenApi}
        />
        <CustomButton title="Fitbit OAuth" onPress={handleFitbitOAuthApi} />
        <CustomButton
          title="Fitbit HeartRate"
          onPress={() => handleFitbitHeartRateMonitoringApi(user)}
        />
        <CustomButton
          title="Google Watch OAuth"
          onPress={googleWatchAuthorization}
        />
        <CustomButton
          title="Google Watch"
          onPress={getGoogleWatchHeartRateData}
        /> */}
        <EmergencyContacts
          contacts={selectedContactsList}
          setContacts={setSelectedContactsList}
          modal={modal}
          setModal={setModal}
          deleteContact={deleteSelectedContact}
          toggleModal={toggleModal}
          diableAll={disabled}
          containerStyle={{}}
        />
        <AddFromContactModal
          open={modal?.addFromContacts}
          selected={selectedContactOption}
          setSelected={setSelectedContactOption}
          onPressClose={() => toggleModal('addFromContacts', false)}
          onPressBtn={() => {
            toggleModal('addFromContacts', false);
            setTimeout(() => {
              selectedContactOption &&
                selectedContactOption == 1 &&
                toggleModal('addFromExistingContact', true);
              selectedContactOption &&
                selectedContactOption == 2 &&
                toggleModal('addNewContact', true);
            }, 1000);
          }}
        />
        <AddFromExistingContactModal
          open={modal?.addFromExistingContact}
          selectedContactsList={selectedContactsList}
          setSelectedContactsList={addSelectedContact}
          onPressClose={() => toggleModal('addFromExistingContact', false)}
          onPressBtn={() => toggleModal('addFromExistingContact', false)}
          contacts={contactsList}
          emergencyContacts={user?.emergency_contacts}
        />
        <AddNewContactModal
          open={modal?.addNewContact}
          disabled={selectedContactsList?.length == 4}
          contactList={contactsList}
          onPressClose={() => toggleModal('addNewContact', false)}
          onPressBtn={(contact: any) => {
            addContact(setContactsList, setSelectedContactsList, contact);
            toggleModal('addNewContact', false);
          }}
        />
        <AccountRemovalModal
          open={showAccountRemovalModal}
          onPressClose={() => setShowAccountRemovalModal(false)}
          onPressBtn={() => navigate(ROUTES.Plan_STACK)}
        />
        <PlanExpiredModal
          open={showPlanExpiredModal}
          onPressClose={() => setShowPlanExpiredModal(false)}
          onPressBtn={() => navigate(ROUTES.Plan_STACK)}
        />
      </ScrollView>
      <CustomFooter
        containerStyle={{
          bottom: tabBarHeight + RF(25),
          paddingBottom: tabBarHeight,
        }}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: HP(78),
    paddingHorizontal: WP(8),
    ...SPACING.pt6,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
});

export default Profile;
