import {ICONS} from '@assets';
import AppUpdateModal from '@components/appUpdateModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {subscribeToVersionCall} from '@screens/profile';
import {hitAppVersionApi} from '@services/HelperService';
import {SERVICE_RUNNING_KEY} from '@utils/constants';
import React, {useEffect, useState} from 'react';
import {NativeModules} from 'react-native';
import {useSelector} from 'react-redux';
import AuthStack from './authStack';
import MainStack from './mainStack';
import {store} from '@redux/store';
import {resetUser} from '@redux/reducers/userReducer';
import AssistantStack from './assistantStack';

const {VersionServiceModule} = NativeModules;

export const startVersionService = async (interval: any) => {
  try {
    await VersionServiceModule.startService(interval);
  } catch (error) {
    console.error(error);
  }
};

const checkAndStartService = async (setShowModal: any = () => {}) => {
  const isServiceRunning = await AsyncStorage.getItem(SERVICE_RUNNING_KEY);

  if (!isServiceRunning) {
     // $&
    startVersionService(5000); // Calls the function every 5 seconds
    subscribeToVersionCall(() => {
      hitAppVersionApi(setShowModal);
      //  // $&
    });
    await AsyncStorage.setItem(SERVICE_RUNNING_KEY, 'true');
  } else {
     // $&
    await AsyncStorage.removeItem(SERVICE_RUNNING_KEY);
  }
};

const Routes = () => {
  const {user} = useSelector((state: any) => state.root.user);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    checkAndStartService(setShowModal);

    return () => {};
  }, []);

  useEffect(() => {
    // if (showModal) store.dispatch(resetUser());
  }, [showModal]);

  return (
    <>
      {user ? (
        !user?.assistant_walkthrough ? (
          <AssistantStack />
        ) : (
          <MainStack />
        )
      ) : (
        <AuthStack />
      )}
      {showModal && (
        <AppUpdateModal
          open={showModal}
          icon={ICONS.UPDATE}
          title={'Oops'}
          desc={
            'Please update the app from the App Store to get to use the latest features'
          }
          onPress={() => {}}
        />
      )}
    </>
  );
};
export default Routes;
