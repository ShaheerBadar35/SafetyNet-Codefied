import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {HTTP_CLIENT} from '@utils/config';
import {TOAST_TYPES} from '@utils/constants';
import {ENDPOINTS} from '@utils/endpoints';
import Toast from 'react-native-toast-message';
import {getLocationWithPermission} from './PermissionService';

const uploadProfileImage = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.UPLOAD_PROFILE_IMAGE, params);
};

const updateUserProfile = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.UPDATE_USER_PROFILE, params);
};

const verifyOldPassword = async ({email, password}: any) => {
  if (!email || !password) {
    return {
      success: false,
      message: 'Email and password are required',
    };
  }

  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email.trim(),
      password,
    );
    const {uid} = userCredential.user;

    const userDocRef = firestore().collection('users').doc(uid);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return {success: false, message: 'User not found'};
    }

    return {
      success: true,
    };
  } catch (error: any) {
    let message = 'Unable to verify password for user';
    if (error?.code === 'auth/invalid-email') {
      message = 'Invalid email address';
    } else if (error?.code === 'auth/user-not-found') {
      message = 'User not found';
    } else if (
      error?.code === 'auth/wrong-password' ||
      error?.code == 'auth/invalid-credential'
    ) {
      message = 'Incorrect password';
      Toast.show({
        type: TOAST_TYPES.ERROR,
        props: {
          title: 'Current password is incorrect' || message,
        },
      });
    }

    return {success: false, message: message};
  }
};

const changePassword = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.CHANGE_PASSWORD, params);
};

const makeCall = async (contacts: any) => {
  let params: any = {
    toPhoneNumbers: contacts?.map((item: any) => item?.number),
  };
  try {
    const location: any = await getLocationWithPermission();
    if (location) {
      params = {
        ...params,
        latitude: location?.latitude,
        longitude: location?.longitude,
      };
      Toast.show({
        type: TOAST_TYPES.LIGHT_SUCCESS,
        props: {
          title: `Latitude = ${params?.latitude} Longitude = ${params?.longitude}`,
        },
      });
    } else {
       // $&
    }
  } catch (error) {
    console.error('Error fetching location:', error);
    Toast.show({
      type: TOAST_TYPES.ERROR,
      props: {
        title: 'Error is: ' + error,
      },
    });
  }
   // $&

  return HTTP_CLIENT.post(ENDPOINTS.CHANGE_PASSWORD, params);
};

export {
  uploadProfileImage,
  updateUserProfile,
  verifyOldPassword,
  changePassword,
  makeCall,
};
