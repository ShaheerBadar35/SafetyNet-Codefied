import {
  setIntegrationSettings,
  setIntegrationSettingsToggle,
} from '@redux/reducers/userReducer';
import {
  handleIntegrationSettingsCall911Toggle,
  handleIntegrationSettingsDevice,
  handleIntegrationSettingsEmergencyContacts,
  handleIntegrationSettingsGestureEmergencyAlertsToggle,
  handleIntegrationSettingsHeartbeatMonitoringToggle,
  handleIntegrationSettingsHeartrateThreshold,
  handleIntegrationSettingsToggle,
} from '@services/IntegrationSettingsService';
import {TOAST_TYPES} from '@utils/constants';
import {Linking} from 'react-native';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import Toast from 'react-native-toast-message';

const fitbitConfig: any = {
  clientId: '23PRRX',
  clientSecret: 'e56c4286701f0634cf5528e367c20c46',
  redirectUrl:
    'https://us-central1-safety-net-af7bd.cloudfunctions.net/fitbitCallback',
  scopes: ['heartrate', 'activity'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
    tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
    revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
  },
};

const handleIntegrationToggle = (
  email: any,
  handle_integration_settings: any,
  dispatch: any = () => {},
) => {
  const params: any = {
    email: email,
    handle_integration_settings: handle_integration_settings == true ? 1 : 0,
  };
  handleIntegrationSettingsToggle(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        Toast.show({
          type: handle_integration_settings
            ? TOAST_TYPES.LIGHT_SUCCESS
            : TOAST_TYPES.DARK_SUCCESS,
          props: {
            title: handle_integration_settings
              ? 'Integration settings turned on successfully'
              : 'Integration settings turned off successfully' || data?.message,
          },
        });
        dispatch &&
          dispatch(
            setIntegrationSettingsToggle(
              data?.data?.handle_integration_settings,
            ),
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

const handleIntegrationHeartbeatMonitoringToggle = (
  email: any,
  handle_heartbeat_monitoring: any,
  dispatch: any = () => {},
) => {
  const params: any = {
    email: email,
    handle_heartbeat_monitoring: handle_heartbeat_monitoring == true ? 1 : 0,
  };
  handleIntegrationSettingsHeartbeatMonitoringToggle(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        Toast.show({
          type: handle_heartbeat_monitoring
            ? TOAST_TYPES.LIGHT_SUCCESS
            : TOAST_TYPES.DARK_SUCCESS,
          props: {
            title: handle_heartbeat_monitoring
              ? 'Heartbeat monitoring turned on successfully'
              : 'Heartbeat monitoring turned off successfully' || data?.message,
          },
        });
        dispatch &&
          dispatch(setIntegrationSettings(data?.data?.integration_settings));
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

const handleIntegrationCall911Toggle = (
  email: any,
  handle_call_911: any,
  dispatch: any = () => {},
) => {
  const params: any = {
    email: email,
    handle_call_911: handle_call_911 == true ? 1 : 0,
  };
  handleIntegrationSettingsCall911Toggle(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        Toast.show({
          type: handle_call_911
            ? TOAST_TYPES.LIGHT_SUCCESS
            : TOAST_TYPES.DARK_SUCCESS,
          props: {
            title: handle_call_911
              ? 'Call 911 turned on successfully'
              : 'Call 911 turned off successfully' || data?.message,
          },
        });
        dispatch &&
          dispatch(setIntegrationSettings(data?.data?.integration_settings));
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

const handleIntegrationGestureEmergencyAlertsToggle = (
  email: any,
  handle_gesture_emergency_alerts: any,
  dispatch: any = () => {},
) => {
  const params: any = {
    email: email,
    handle_gesture_emergency_alerts:
      handle_gesture_emergency_alerts == true ? 1 : 0,
  };
  handleIntegrationSettingsGestureEmergencyAlertsToggle(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        Toast.show({
          type: handle_gesture_emergency_alerts
            ? TOAST_TYPES.LIGHT_SUCCESS
            : TOAST_TYPES.DARK_SUCCESS,
          props: {
            title: handle_gesture_emergency_alerts
              ? 'Gesture emergency alert turned on'
              : 'Gesture emergency alert turned off' || data?.message,
          },
        });
        dispatch &&
          dispatch(setIntegrationSettings(data?.data?.integration_settings));
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

const handleIntegrationHeartrateThreshold = (
  email: any,
  lower_limit: any,
  upper_limit: any,
  dispatch: any = () => {},
) => {
  const params: any = {
    email: email,
    lower_limit: lower_limit,
    upper_limit: upper_limit,
  };
  if (Number(upper_limit) < Number(lower_limit)) {
    Toast.show({
      type: TOAST_TYPES.ERROR,
      props: {
        title: 'Upper limit cannot be lower than lower limit',
      },
    });
    return;
  }
  handleIntegrationSettingsHeartrateThreshold(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        Toast.show({
          type: TOAST_TYPES.LIGHT_SUCCESS,
          props: {
            title: 'Heartrate threshold set' || data?.message,
          },
        });
        dispatch &&
          dispatch(setIntegrationSettings(data?.data?.integration_settings));
         // $&
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

const handleIntegrationDevice = (
  email: any,
  device: any,
  dispatch: any = () => {},
) => {
  const params: any = {
    email: email,
    device: device,
  };
  handleIntegrationSettingsDevice(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        Toast.show({
          type: TOAST_TYPES.LIGHT_SUCCESS,
          props: {
            title: 'Device for heartbeat monitoring selected successfully',
          },
        });
        dispatch &&
          dispatch(setIntegrationSettings(data?.data?.integration_settings));
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

const handleIntegrationEmergencyContacts = (
  email: any,
  emergency_contacts: any,
  dispatch: any = () => {},
) => {
  const params: any = {
    email: email,
    emergency_contacts: emergency_contacts,
  };
  handleIntegrationSettingsEmergencyContacts(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        dispatch &&
          dispatch(setIntegrationSettings(data?.data?.integration_settings));
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

const handleFitbitOAuthApi = async (
  email: any = '',
  selected: any = '',
  dispatch: any = () => {},
) => {
  try {
    const authUrl = `${
      fitbitConfig?.serviceConfiguration?.authorizationEndpoint
    }?response_type=code&client_id=${
      fitbitConfig?.clientId
    }&redirect_uri=${encodeURIComponent(
      fitbitConfig?.redirectUrl,
    )}&scope=${fitbitConfig?.scopes?.join('%20')}`;
    await Linking.openURL(authUrl);
    // handleIntegrationDevice(email, selected, dispatch);
  } catch (error: any) {
     // $&
  }
};

const handleGoogleWatchOAuth = async (
  email: any = '',
  selected: any = '',
  dispatch: any = () => {},
) => {
  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_BODY_READ,
      Scopes.FITNESS_HEART_RATE_READ,
    ],
  };

  if (GoogleFit.isAuthorized) {
     // $&
    handleIntegrationDevice(email, selected, dispatch);
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

export {
  handleIntegrationToggle,
  handleIntegrationHeartbeatMonitoringToggle,
  handleIntegrationCall911Toggle,
  handleIntegrationGestureEmergencyAlertsToggle,
  handleIntegrationHeartrateThreshold,
  handleIntegrationDevice,
  handleIntegrationEmergencyContacts,
  handleFitbitOAuthApi,
  handleGoogleWatchOAuth,
};
