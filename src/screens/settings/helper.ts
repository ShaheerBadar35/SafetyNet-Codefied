import {
  setAddCall911,
  setAddEmergencyKeyword,
  setAddGestureEmergencyAlerts,
  setAddTheme,
} from '@redux/reducers/userReducer';
import {
  handleCall911,
  handleEmergencyKeyword,
  handleGestureEmergencyAlerts,
  handleTheme,
} from '@services/SettingsService';
import {TOAST_TYPES} from '@utils/constants';
import Toast from 'react-native-toast-message';

const handleEmergencyKeywordToggle = (
  emergencyKeyword: any,
  email: any,
  dispatch: any = () => {},
) => {
  const params: any = {
    email: email,
    handle_emergency_keyword: emergencyKeyword == true ? 1 : 0,
  };
  handleEmergencyKeyword(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        Toast.show({
          type: emergencyKeyword
            ? TOAST_TYPES.LIGHT_SUCCESS
            : TOAST_TYPES.DARK_SUCCESS,
          props: {
            title: emergencyKeyword
              ? 'Emergency keyword detection turned on'
              : data?.message
              ? data?.message
              : 'Emergency keyword detection turned off',
          },
        });
        dispatch &&
          dispatch(
            setAddEmergencyKeyword(data?.data?.handle_emergency_keyword),
          );
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

const handleThemeToggle = (
  theme: any,
  email: any,
  dispatch: any = () => {},
) => {
  const params: any = {
    email: email,
    theme: theme == true ? 1 : 0,
  };
  handleTheme(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        dispatch && dispatch(setAddTheme(data?.data?.theme));
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

const handleCall911Toggle = (
  call_911: any,
  email: any,
  dispatch: any = () => {},
) => {
  const params: any = {
    email: email,
    call_911: call_911 == true ? 1 : 0,
  };
  handleCall911(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        Toast.show({
          type: call_911 ? TOAST_TYPES.LIGHT_SUCCESS : TOAST_TYPES.DARK_SUCCESS,
          props: {
            title: call_911
              ? 'Call 911 turned on'
              : data?.message
              ? data?.message
              : 'Call 911 turned off',
          },
        });
        dispatch && dispatch(setAddCall911(data?.data?.call_911));
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

const handleGestureEmergencyAlertsToggle = (
  gesture_emergency_alerts: any,
  email: any,
  dispatch: any = () => {},
) => {
  const params: any = {
    email: email,
    gesture_emergency_alerts: gesture_emergency_alerts == true ? 1 : 0,
  };
  handleGestureEmergencyAlerts(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        Toast.show({
          type: gesture_emergency_alerts
            ? TOAST_TYPES.LIGHT_SUCCESS
            : TOAST_TYPES.DARK_SUCCESS,
          props: {
            title: gesture_emergency_alerts
              ? 'Gesture emergency alert turned on'
              : data?.message
              ? data?.message
              : 'Gesture emergency alert turned off',
          },
        });
        dispatch &&
          dispatch(
            setAddGestureEmergencyAlerts(data?.data?.gesture_emergency_alerts),
          );
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

export {
  handleEmergencyKeywordToggle,
  handleThemeToggle,
  handleCall911Toggle,
  handleGestureEmergencyAlertsToggle,
};
