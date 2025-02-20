import {NativeEventEmitter, NativeModules} from 'react-native';
import {PLANS} from './constants';
import {handleFitbitRefreshToken} from '@services/IntegrationSettingsService';

const {BackgroundServiceModule} = NativeModules;
const backgroundServiceEvents = new NativeEventEmitter(BackgroundServiceModule);

export const startListeningForSpeech = () => {
  BackgroundServiceModule.startService()
    .then((response: any) => {}) // $&)
    .catch((error: any) => console.error('error: ', error));
};

export const stopListeningForSpeech = () => {
  BackgroundServiceModule.stopService()
    .then((response: any) => {}) // $&)
    .catch((error: any) => console.error(error));
  //   BackgroundServiceModule.stopService();
};

export const onSpeechRecognized = (callback: any) => {
  // $&
  //   const subscription = backgroundServiceEvents.addListener(
  //     'SPEECH_RECOGNIZED',
  //     event => {
  //        // $&
  //       if (event.recognizedText) {
  //         callback(event.recognizedText);
  //       }
  //     },
  //   );

  backgroundServiceEvents.addListener('SPEECH_RECOGNIZED', event => {
    // $&
    if (event.recognizedText?.includes('hello')) {
    } // $&
  });

  return () => {
    // subscription.remove();
  };
};

export const isChildACcount = (user: any) => {
  return user?.is_child_account || false;
};

export const isSinglePlanUser = (user: any = {}) => {
  return user?.plan?.plan_id == PLANS.SINGLE;
};

export const getTotalAccountAdded = (user: any = {}) => {
  const additional_accounts = user?.family_plan_users?.length || 0;
  const child_accounts = user?.child_settings?.child_account?.length || 0;
  return additional_accounts + child_accounts;
};

export const isAccountRemoved = (user: any = {}) => {
  return user?.plan?.plan_id == PLANS.SINGLE && user?.is_deleted == 1;
};

export const isPlanExpied = (user: any = {}) => {
  return user?.is_expired == 1 ? true : false || false;
};

export const handleFitbitRefreshTokenApi = async (access_token: any) => {
  try {
    const params: any = {
      refresh_token:
        'e038e0a38348a5beecdfaa6fce89cde67e13976fbb6e791ef6d622c5b52e0879',
    };
    const response = await handleFitbitRefreshToken(params);
    //  // $&
  } catch (error: any) {
    // $&
  }
};

export const monitorFitbitHeartMonitoring = async (
  access_token: any = '',
  refresh_token: any = '',
  expires_in: any = '',
) => {
  // $&
  if (access_token && refresh_token && expires_in) {
    let expiryDate: any = new Date(expires_in);
    let todayDate: any = new Date();
    todayDate = todayDate?.getTime();
    expiryDate = expiryDate?.getTime();
    if (todayDate < expiryDate) {
      await handleFitbitRefreshTokenApi(access_token);
    }
    // $&
  }
};
