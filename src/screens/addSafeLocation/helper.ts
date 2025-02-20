import {setChildAccounts} from '@redux/reducers/userReducer';
import {handleChildGeofencingSafeLocation} from '@services/ChildService';
import {navigationRef} from '@services/NavService';
import {getLocationWithPermission} from '@services/PermissionService';
import {getPlacesSuggestion} from '@services/PlacesService';
import {CHILD_ACCOUNT_DOMAIN, TOAST_TYPES} from '@utils/constants';
import Toast from 'react-native-toast-message';

const handleGeofencingSafeLocation = (
  email: any,
  username: any,
  location: any,
  tag: any,
  latitude: any,
  longitude: any,
  start_time_hours: any,
  start_time_minutes: any,
  start_time_periods: any,
  end_time_hours: any,
  end_time_minutes: any,
  end_time_periods: any,
  setLocationsList: any = () => {},
  dispatch: any = () => {},
) => {
  const params: any = {
    email: email,
    username: username,
    location: location,
    tag: tag,
    latitude: latitude,
    longitude: longitude,
    start_time_hours: start_time_hours,
    start_time_minutes: start_time_minutes,
    start_time_periods: start_time_periods,
    end_time_hours: end_time_hours,
    end_time_minutes: end_time_minutes,
    end_time_periods: end_time_periods,
    child_account_domain: CHILD_ACCOUNT_DOMAIN,
  };
   // $&
  handleChildGeofencingSafeLocation(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        Toast.show({
          type: TOAST_TYPES.LIGHT_SUCCESS,
          props: {
            title: data?.message
              ? data?.message
              : 'Safe location added successfully',
          },
        });
        dispatch && dispatch(setChildAccounts(data?.data?.child_account));
        if (data?.data?.child_account) {
          data?.data?.child_account?.map((account: any) => {
            if (account?.username == username) {
              setLocationsList &&
                setLocationsList(account?.geofencing_settings?.safe_locations);
            }
          });
          // setLocationsList &&
          //   setLocationsList(
          //     data?.data?.child_account?.[0]?.geofencing_settings
          //       ?.safe_locations,
          //   );
        }
      } else {
        Toast.show({
          type: TOAST_TYPES.ERROR,
          props: {
            title: data?.message,
          },
        });
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

const submitHandler = async (
  email: any,
  username: any,
  values: any,
  setLoading: any = () => {},
  location: any = [],
  locationsList: any = [],
  setLocationsList: any = () => {},
  dispatch: any = () => {},
) => {
  setLoading && setLoading(true);
  if (!!location?.id || location?.id == 0) {
    setLocationsList &&
      setLocationsList((pre: any) => {
        const temp = pre?.map((item: any) => {
          if (item?.id == location?.id) {
            return {
              id: location?.id,
              location: values?.location,
              tag: values?.tag,
              latitude: values?.latitude,
              longitude: values?.longitude,
              start_time_hours: values?.start_time_hours,
              start_time_minutes: values?.start_time_minutes,
              start_time_periods: values?.start_time_periods,
              end_time_hours: values?.end_time_hours,
              end_time_minutes: values?.end_time_minutes,
              end_time_periods: values?.end_time_periods,
            };
          }
          return item;
        });
        return [...temp];
      });
  } else if (locationsList?.length < 4) {
    setLocationsList &&
      setLocationsList((pre: any) => {
        return [
          ...pre,
          {
            ...values,
            id: pre?.length,
          },
        ];
      });
  }
  if (
    values?.location &&
    values?.tag &&
    values?.latitude &&
    values?.longitude
  ) {
    dispatch &&
      handleGeofencingSafeLocation(
        email,
        username,
        values?.location,
        values?.tag,
        values?.latitude,
        values?.longitude,
        values?.start_time_hours,
        values?.start_time_minutes,
        values?.start_time_periods,
        values?.end_time_hours,
        values?.end_time_minutes,
        values?.end_time_periods,
        setLocationsList,
        dispatch,
      );
  }
  setTimeout(() => {
    setLoading && setLoading(false);
    navigationRef?.current?.goBack();
  }, 3000);
};

const fetchCurrentLocation = async (setCurrentLocation: any = () => {}) => {
  try {
    // const location = await getCoarseLocationWithPermission();
    const location = await getLocationWithPermission();
    if (location) {
      setCurrentLocation && setCurrentLocation(location);
    } else {
       // $&
    }
  } catch (error) {
    console.error('Error fetching location:', error);
  }
};

const getPlacesList = async (
  location: any,
  setLocations: any = () => {},
  currentLocation: any = {},
) => {
  const params: any = {
    location: location,
    latitude: currentLocation?.latitude,
    longitude: currentLocation?.longitude,
  };
  const response: any = await getPlacesSuggestion(params);
  setLocations && setLocations(response?.data?.items || []);
};

export {submitHandler, fetchCurrentLocation, getPlacesList};
