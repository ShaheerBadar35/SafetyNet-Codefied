import {
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
} from 'react-native';

const {LocationServiceModule} = NativeModules;
const locationEvents = new NativeEventEmitter(LocationServiceModule);

export async function startLocationService() {
  try {
    // Request permissions
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'We need your location to provide accurate services.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
       // $&
      LocationServiceModule.startLocationService()
        .then((result: any) => {
           // $&
        })
        .catch((error: any) => {
          console.error(error);
        });
    } else {
       // $&
    }
  } catch (error) {
    console.error('Error requesting location permission:', error);
  }
}

// Listen for location updates
export function subscribeToLocationUpdates(callback: any) {
  const subscription = locationEvents.addListener('LocationUpdate', data => {
     // $&
    callback(data);
  });
  return () => subscription.remove();
}
