import {IOS, IS_ANDROID_33} from '@utils/constants';
import {Alert, Linking, NativeModules, Platform} from 'react-native';
import {
  PERMISSIONS,
  Permission,
  RESULTS,
  check,
  openSettings,
  request,
  requestMultiple,
} from 'react-native-permissions';
import Contacts from 'react-native-contacts';
import Geolocation from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';

const {CallModule, SmsModule} = NativeModules;

const requestAllPermissions = async () => {
  try {
    const permissions = [
      // PERMISSIONS.ANDROID.RECORD_AUDIO,
      PERMISSIONS.ANDROID.READ_CONTACTS,
      PERMISSIONS.ANDROID.SEND_SMS,
      // PERMISSIONS.ANDROID.CALL_PHONE,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
    ];

    const results: any = await requestMultiple(permissions);

    const deniedPermissions = Object.keys(results).filter(
      (key: any) =>
        results[key] === RESULTS.DENIED || results[key] === RESULTS.BLOCKED,
    );

    if (deniedPermissions.length > 0) {
      Alert.alert(
        'Permissions Required',
        'Some permissions are required for the app to function properly. Please grant them in the app settings.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open Settings',
            onPress: () => {
              if (Platform.OS === 'android') {
                Linking.openSettings();
              } else {
                Alert.alert(
                  'Settings',
                  'Please enable permissions in the Settings app.',
                );
              }
            },
          },
        ],
      );
    }
  } catch (error: any) {
    console.error('Error requesting permissions:', error);
  }
};

const requestNotificationsPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
     // $&
  }
};

const requestContactsPermission = async (permissionType: Permission) => {
  if (Platform.OS === 'android') {
    try {
      const result = await request(permissionType);
      if (result === RESULTS.GRANTED) {
         // $&
        // Access contacts or perform other actions
      } else {
         // $&
      }
    } catch (error) {
      console.error('Error requesting permission', error);
    }
  } else {
    // Handle iOS permissions if needed
  }
};

const hasReadContactsPermission = async () => {
  const permissionType = PERMISSIONS.ANDROID.READ_CONTACTS;
  const contactsPermissionStatus = await check(permissionType);
  if (contactsPermissionStatus === RESULTS.DENIED) {
    const requestType = PERMISSIONS.ANDROID.READ_CONTACTS;
    if (await requestPermission(requestType)) {
      return true;
    } else {
      return false;
    }
  } else if (contactsPermissionStatus === RESULTS.GRANTED) {
    return true;
  } else if (contactsPermissionStatus === RESULTS.BLOCKED) {
    openSettings();
  }
};

const hasWriteContactsPermission = async () => {
  const permissionType = PERMISSIONS.ANDROID.WRITE_CONTACTS;
  const contactsPermissionStatus = await check(permissionType);
  if (contactsPermissionStatus === RESULTS.DENIED) {
    const requestType = PERMISSIONS.ANDROID.WRITE_CONTACTS;
    if (await requestPermission(requestType)) {
      return true;
    } else {
      return false;
    }
  } else if (contactsPermissionStatus === RESULTS.GRANTED) {
    return true;
  } else if (contactsPermissionStatus === RESULTS.BLOCKED) {
    openSettings();
  }
};

const hasCallPermission = async () => {
  const permissionType = PERMISSIONS.ANDROID.CALL_PHONE;

  const contactsPermissionStatus = await check(permissionType);
   // $&
  if (contactsPermissionStatus === RESULTS.DENIED) {
    const requestType = PERMISSIONS.ANDROID.CALL_PHONE;
    if (await requestPermission(requestType)) {
      return true;
    } else {
      return false;
    }
  } else if (contactsPermissionStatus === RESULTS.GRANTED) {
    const url = `03107487772`;
    // const url = `tel:03107487772`;

    //this code directy calls
    try {
      await CallModule.makeCall(url);
       // $&
    } catch (error) {
      console.error('Failed to make call:', error);
    }

    //this code goes to the dialer
    // Linking.openURL(url)
    //   .then(supported => {
    //     if (supported) {
    //        // $&
    //       return Linking.openURL(url);
    //     } else {
    //        // $&
    //       //   Alert.alert('Error', 'Phone call is not supported on this device');
    //     }
    //   })
    //   .catch(err => console.error('An error occurred', err));

    return true;
  } else if (contactsPermissionStatus === RESULTS.BLOCKED) {
    openSettings();
  }
};

const hasSendTextPermission = async () => {
  const permissionType = PERMISSIONS.ANDROID.SEND_SMS;

  const textPermissionStatus = await check(permissionType);
   // $&
  if (textPermissionStatus === RESULTS.DENIED) {
    const requestType = PERMISSIONS.ANDROID.SEND_SMS;
    if (await requestPermission(requestType)) {
      return true;
    } else {
      return false;
    }
  } else if (textPermissionStatus === RESULTS.GRANTED) {
    const url = `03216609072`;
    // const url = `tel:03107487772`;

    //this code directy calls
    try {
      await SmsModule.sendSMS(url, 'Hello');
       // $&
    } catch (error) {
      console.error('Failed to make SMS:', error);
    }

    //this code goes to the dialer
    // Linking.openURL(url)
    //   .then(supported => {
    //     if (supported) {
    //        // $&
    //       return Linking.openURL(url);
    //     } else {
    //        // $&
    //       //   Alert.alert('Error', 'Phone call is not supported on this device');
    //     }
    //   })
    //   .catch(err => console.error('An error occurred', err));

    return true;
  } else if (textPermissionStatus === RESULTS.BLOCKED) {
    openSettings();
  }
};

const getCurrentLocation = () => {
  Geolocation.getCurrentPosition(
    position => {
       // $&
       // $&

      const location = position.coords;

      const {latitude, longitude} = location;
      let url = '';

      if (Platform.OS === 'ios') {
        url = `https://maps.apple.com/?q=${latitude},${longitude}`;
      } else {
        url = `https://www.google.com/maps/?q=${latitude},${longitude}`;
      }

       // $&
    },
    error => {
       // $&
       // $&
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
};

const hasLocationPermission = async () => {
  const permissionType = PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;

  const locationPermissionStatus = await check(permissionType);
   // $&
  if (locationPermissionStatus === RESULTS.DENIED) {
    const requestType = PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;
    if (await requestPermission(requestType)) {
      return true;
    } else {
      return false;
    }
  } else if (locationPermissionStatus === RESULTS.GRANTED) {
    const url = `03216609072`;
    // const url = `tel:03107487772`;

     // $&
    getCurrentLocation();

    //this code goes to the dialer
    // Linking.openURL(url)
    //   .then(supported => {
    //     if (supported) {
    //        // $&
    //       return Linking.openURL(url);
    //     } else {
    //        // $&
    //       //   Alert.alert('Error', 'Phone call is not supported on this device');
    //     }
    //   })
    //   .catch(err => console.error('An error occurred', err));

    return true;
  } else if (locationPermissionStatus === RESULTS.BLOCKED) {
    openSettings();
  }
};

const requestPermission = async (permissionType: Permission) => {
  const result = await request(permissionType);
  //   on request ANDROID return blocked
  if (result === RESULTS.GRANTED) {
    return true;
  } else if (result === RESULTS.BLOCKED) {
    openSettings().catch(() => console.warn('cannot open settings'));
  } else {
    return false;
  }
};
const hasCameraPermission = async () => {
  const permissionType = IOS
    ? PERMISSIONS.IOS.CAMERA
    : PERMISSIONS.ANDROID.CAMERA;

  const cameraPermissionStatus = await check(permissionType);
  if (cameraPermissionStatus === RESULTS.DENIED) {
    const requestType = IOS
      ? PERMISSIONS.IOS.CAMERA
      : PERMISSIONS.ANDROID.CAMERA;
    if (await requestPermission(requestType)) {
      return true;
    } else {
      return false;
    }
  } else if (cameraPermissionStatus === RESULTS.GRANTED) {
    return true;
  } else if (cameraPermissionStatus === RESULTS.BLOCKED) {
    openSettings();
  }
};
const hasLibraryPermission = async () => {
  const permissionType = IOS
    ? PERMISSIONS.IOS.PHOTO_LIBRARY
    : IS_ANDROID_33
    ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
    : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
  const libraryPermissionStatus = await check(permissionType);
  if (libraryPermissionStatus === RESULTS.DENIED) {
    const requestType = IOS
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : IS_ANDROID_33
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    if (await requestPermission(requestType)) {
      return true;
    } else {
      return false;
    }
  } else if (libraryPermissionStatus === RESULTS.GRANTED) {
    return true;
  } else if (libraryPermissionStatus === RESULTS.BLOCKED) {
    openSettings().catch(() => console.warn('cannot open settings'));
  }
};

const getLocationWithPermission = async () => {
  const permissionType =
    Platform.OS === 'android'
      ? IS_ANDROID_33
        ? PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
        : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
      : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

  // Check current permission status
  const locationPermissionStatus = await check(permissionType);
   // $&

  // Request permission if denied
  if (locationPermissionStatus === RESULTS.DENIED) {
    const requestResult = await request(permissionType);
    if (requestResult !== RESULTS.GRANTED) {
       // $&
      return null; // Return null or handle the error as needed
    }
  } else if (locationPermissionStatus !== RESULTS.GRANTED) {
     // $&
    return null; // Return null or handle the error as needed
  }

  // const response = await LocationServiceModule.startLocationService();
  //  // $&

  // Get the current location if permission is granted
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        resolve({latitude, longitude});
      },
      error => {
         // $&
        reject(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });
};

export {
  requestAllPermissions,
  requestNotificationsPermission,
  hasReadContactsPermission,
  hasWriteContactsPermission,
  hasCallPermission,
  hasSendTextPermission,
  hasLocationPermission,
  hasCameraPermission,
  hasLibraryPermission,
  requestPermission,
  getLocationWithPermission,
};
