import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  setUserEmergencyContacts,
  setUserEmergencyKeyword,
} from '@redux/reducers/userReducer';
import {addUserEmergencyContacts} from '@services/ContactService';
import {addUserEmergencyKeyword} from '@services/KeywordService';
import {
  getLocationWithPermission,
  hasReadContactsPermission,
  hasWriteContactsPermission,
} from '@services/PermissionService';
import {makeTwilioCall} from '@services/TwilioService';
import {
  GEOFENCING_SAFE_ZONE_DATA,
  LOCATION_SERVICE_STARTED_CHILD_REF,
  TOAST_TYPES,
  TWILIO_NUMBER,
} from '@utils/constants';
import {NativeModules} from 'react-native';
import Contacts from 'react-native-contacts';
import Toast from 'react-native-toast-message';

const {SmsServiceModule} = NativeModules;

const fetchContacts = (setContacts: any = () => {}) => {
  Contacts.getAll()
    .then((contacts: any) => {
      let tempContact: any = [];
      contacts?.map((item: any) => {
        const temp = {
          id: item?.rawContactId,
          name: item?.displayName,
          number: item?.phoneNumbers?.[0]?.number,
        };
        tempContact = [...tempContact, temp];
      });
      setContacts(tempContact);
    })
    .catch((e: any) => {
      // $&
    });
};

const getContacts = async (setContacts: any = () => {}) => {
  const permission = await hasReadContactsPermission();
  if (permission) {
    fetchContacts(setContacts);
  }
};

const addContact = async (
  setContacts: any = () => {},
  setSelectedContactsList: any = () => {},
  contact: any,
) => {
  const permission = await hasWriteContactsPermission();
  if (permission) {
    const temp = {
      familyName: contact?.name,
      phoneNumbers: [
        {
          label: 'mobile',
          number: contact?.number,
        },
      ],
    };
    Contacts.addContact(temp)
      .then((res: any) => {
        const temp = {
          id: res?.rawContactId,
          name: res?.displayName,
          number: res?.phoneNumbers?.[0]?.number,
        };
        setContacts((pre: any) => {
          if (pre?.length < 4) {
            return [...pre, temp];
          }
          return [...pre];
        });
        setSelectedContactsList((pre: any) => {
          if (pre?.length < 4) {
            return [...pre, temp];
          }
          return [...pre];
        });
        // $&
      })
      .catch(error => {
        console.error('Error adding contact:', error);
      });
  }
};

const addEmergencyContacts = async (
  params: any,
  dispatch: any = () => {},
  toastMessage: null | string = null,
) => {
  addUserEmergencyContacts(params)
    .then(({data}: any) => {
      const status: any = data?.success;
      if (status) {
        // $&
        // $&
        Toast.show({
          type: TOAST_TYPES.LIGHT_SUCCESS,
          // props:'Emergency Contacts updated successfully',

          props: {
            title: toastMessage
              ? toastMessage
              : data?.message || 'Emergency Contact added successfully',
          },
        });
        dispatch(setUserEmergencyContacts(data?.data?.emergency_contacts));
      } else {
        // $&
      }
    })
    .catch((err: any) => {
      // $&
    })
    .finally(() => {});
};

const addEmergencyKeyword = async (params: any, dispatch: any = () => {}) => {
  addUserEmergencyKeyword(params)
    .then(({data}: any) => {
      // $&
      const status: any = data?.success;
      if (status) {
        Toast.show({
          type: TOAST_TYPES.LIGHT_SUCCESS,
          props: {
            title: data?.message
              ? data?.message
              : 'Emergency keyword added successfully',
          },
        });
        dispatch(setUserEmergencyKeyword(data?.data?.user_emergency_keyword));
      } else {
        // $&
      }
    })
    .catch((err: any) => {
      // $&
    })
    .finally(() => {});
};

const handleTwilioCall = async (contacts: any) => {
  try {
    const location: any = await getLocationWithPermission();
    const params: any = {
      toPhoneNumbers: contacts?.map((contact: any) => contact?.number),
      fromPhoneNumber: TWILIO_NUMBER,
      message: 'In danger',
      latitude: location?.latitude,
      longitude: location?.longitude,
    };
    makeTwilioCall(params)
      .then(({data}: any) => {
        const status: any = data?.success;
        if (status) {
          // $&
        } else {
          // $&
          Toast.show({
            type: TOAST_TYPES.ERROR,
            props: {
              title: data?.message || 'Unable to make call',
            },
          });
        }
      })
      .catch((err: any) => {
        // $&
        Toast.show({
          type: TOAST_TYPES.ERROR,
          props: {
            title: err || 'Unable to make call',
          },
        });
      })
      .finally(() => {});
  } catch (error: any) {
    // $&
  }
};

const handleNativeSms = async (contacts: any) => {
  try {
    const location: any = await getLocationWithPermission();
    const location_url = `https://www.google.com/maps/?q=${location?.latitude},${location?.longitude}`;
    // $&
    contacts?.map((contact: any) => {
      SmsServiceModule.sendSms('+123', location_url)
        .then((response: any) => {})
        .catch((error: any) => {
          // $&
          Toast.show({
            type: TOAST_TYPES.ERROR,
            props: {
              title: error || 'Error while sending text message',
            },
          });
        });
    });
  } catch (error) {
    // $&
    Toast.show({
      type: TOAST_TYPES.ERROR,
      props: {
        title: error || 'Error while getting current location',
      },
    });
  }
};

const checkLocationServiceRefForChild = async () => {
  const isServiceStarted: any = await AsyncStorage.getItem(
    LOCATION_SERVICE_STARTED_CHILD_REF,
  );
  if (isServiceStarted == '1') return true;
  else false;
};

const setLocationServiceRefForChild = async (service_started: boolean) => {
  await AsyncStorage.setItem(
    LOCATION_SERVICE_STARTED_CHILD_REF,
    service_started == true ? '1' : '0',
  );
};

const calculateDistance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
  const toRad = (value: any) => (value * Math.PI) / 180;
  const R = 6371e3; // Radius of the Earth in meters
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const checkGeofencingLocationsWithCurrentLocation = async (
  geofencing_locations: any,
  safe_zone: any,
  latitude: any,
  longitude: any,
  emergency_contacts: any,
) => {
  geofencing_locations?.map(async (location: any) => {
    // console.log(
    //   'latitude, longitude: ',
    //   location?.latitude,
    //   location?.longitude,
    // );
    // const distance: any = calculateDistance(
    //   latitude,
    //   longitude,
    //   31.311274,
    //   74.369702,
    //   // location?.latitude,
    //   // location?.longitude,
    // );
    // const safe_zone_distance = GEOFENCING_SAFE_ZONE_DATA?.filter(
    //   (item: any) => item?.id == safe_zone,
    // );
    //  // $&
    //  // $&
    await compareStartTime(
      location?.start_time_hours,
      location?.start_time_minutes,
      location?.start_time_periods,
      location,
      latitude,
      longitude,
      safe_zone,
    );
    await compareEndTime(
      location?.end_time_hours,
      location?.end_time_minutes,
      location?.end_time_periods,
      location,
      latitude,
      longitude,
      safe_zone,
    );
    // if (distance > safe_zone_distance?.[0]?.value) {
    //   // handleTwilioCall(emergency_contacts || []);
    //   // handleNativeSms(emergency_contacts || []);
    // }
  });
};

const compareStartTime = async (
  hours: any,
  minutes: any,
  time_period: any,
  location: any,
  latitude: any,
  longitude: any,
  safe_zone: any,
) => {
  const now = new Date();

  const current_hours = now.getHours();
  const current_minutes = now.getMinutes();

  let start_hours = parseInt(hours);
  let start_minutes = parseInt(minutes);

  if (time_period === 'PM' && start_hours !== 12) {
    start_hours += 12;
  } else if (time_period === 'AM' && start_hours === 12) {
    start_hours = 0;
  }

  const currentTimeInMinutes = current_hours * 60 + current_minutes;
  const startTimeInMinutes = start_hours * 60 + start_minutes;

  if (currentTimeInMinutes < startTimeInMinutes) {
    // $&
  } else if (currentTimeInMinutes >= startTimeInMinutes) {
    // $&
    const isMonitoringStarted: any = await AsyncStorage.getItem(
      location?.location,
    );
    if (!isMonitoringStarted) {
      const distance: any = calculateDistance(
        latitude,
        longitude,
        31.311965,
        74.368853,
      );
      const safe_zone_distance = GEOFENCING_SAFE_ZONE_DATA?.filter(
        (item: any) => item?.id == safe_zone,
      );
      // console.log(
      //   'START TIME SAFE ZONE DISTANCE',
      //   distance,
      //   safe_zone_distance?.[0]?.value,
      // );
      if (distance <= safe_zone_distance?.[0]?.value) {
        await AsyncStorage.setItem(location?.location, 'true');
        // console.log(
        //   'INSIDE LOCATION ==========> ',
        //   distance,
        //   safe_zone_distance?.[0]?.value,
        // );
      }
    } else {
    }
  }
};

const compareEndTime = async (
  hours: any,
  minutes: any,
  time_period: any,
  location: any,
  latitude: any,
  longitude: any,
  safe_zone: any,
) => {
  const now = new Date();

  const current_hours = now.getHours();
  const current_minutes = now.getMinutes();

  let end_hours = parseInt(hours);
  let end_minutes = parseInt(minutes);

  if (time_period === 'PM' && end_hours !== 12) {
    end_hours += 12;
  } else if (time_period === 'AM' && end_hours === 12) {
    end_hours = 0;
  }

  const currentTimeInMinutes = current_hours * 60 + current_minutes;
  const endTimeInMinutes = end_hours * 60 + end_minutes;

  if (currentTimeInMinutes < endTimeInMinutes) {
    const isMonitoringStarted: any = await AsyncStorage.getItem(
      location?.location,
    );
    if (isMonitoringStarted == 'true') {
      const distance: any = calculateDistance(
        latitude,
        longitude,
        31.328581,
        74.385039,
      );
      const safe_zone_distance = GEOFENCING_SAFE_ZONE_DATA?.filter(
        (item: any) => item?.id == safe_zone,
      );
      // console.log(
      //   'END TIME SAFE ZONE DISTANCE',
      //   distance,
      //   safe_zone_distance?.[0]?.value,
      // );
      if (distance > safe_zone_distance?.[0]?.value) {
        // handleTwilioCall(emergency_contacts || []);
        // handleNativeSms(emergency_contacts || []);
      }
    }
  } else if (currentTimeInMinutes > endTimeInMinutes) {
    await AsyncStorage.removeItem(location?.location);
    // $&
  }
};

export {
  fetchContacts,
  getContacts,
  addContact,
  addEmergencyContacts,
  addEmergencyKeyword,
  handleTwilioCall,
  handleNativeSms,
  checkLocationServiceRefForChild,
  setLocationServiceRefForChild,
  calculateDistance,
  checkGeofencingLocationsWithCurrentLocation,
  compareStartTime,
};
