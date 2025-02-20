import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {HTTP_CLIENT} from '@utils/config';
import {
  ANDROID_VERSION_CODE,
  ANDROID_VERSION_NAME,
  TOAST_TYPES,
} from '@utils/constants';
import {ENDPOINTS} from '@utils/endpoints';
import Toast from 'react-native-toast-message';

const checkEmailExists = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.CHECK_EMAIL_EXISTS, params);
};

const sendOtpEmail = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.SEND_OTP_EMAIL, params);
};

const verifyOtp = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.VERIFY_OTP, params);
};

const purchasePlan = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.PURCHASE_PLAN, params);
};

const signup = async ({email, password, referral_code = ''}: any) => {
  try {
    if (!email || !password) {
      return {
        status: false,
        message: 'Email and password are required',
      };
    }

    const userCredential = await auth().createUserWithEmailAndPassword(
      email.trim(),
      password,
    );
    const {uid} = userCredential.user;

    await firestore().collection('users').doc(uid).set({
      email: email.trim(),
      referral_code: referral_code?.toUpperCase(),
      account_status: 'unlocked',
    });

    return {
      success: true,
      message: 'User created successfully',
      data: {userId: uid},
    };
  } catch (error: any) {
    console.error('Error creating user:', error);

    let message = 'Unable to create user';
    if (error?.code === 'auth/email-already-in-use') {
      message = 'That email address is already in use!';
    } else if (error?.code === 'auth/invalid-email') {
      message = 'That email address is invalid!';
    } else if (error?.code === 'auth/weak-password') {
      message = 'Password is too weak!';
    }

    return {success: false, message: message};
  }
};

const signin = async ({email, password, deviceId, fcmToken}: any) => {
  if (!email || !password || !deviceId || !fcmToken) {
    return {
      success: false,
      message: 'Email, password, deviceId, and fcmToken are required',
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

    const userData = userDoc.data();
    const isVerified = userData?.is_verified === 1;
    const storedDeviceId = userData?.deviceId;
    const isLocked = userData?.account_status === 'locked';
     // $&
    

    if (isLocked) {
      return {
        success: false,
        message:
          'Your account has been locked. Please contact support for more information',
        data: {account_status: 'locked'},
      };
    }

    if (!isVerified) {
      return {
        success: false,
        message: 'User is not verified',
        data: {is_verified: 0},
      };
    }

    if (storedDeviceId && storedDeviceId !== deviceId) {
      return {
        success: true,
        message: 'User is already logged in other device',
        data: {already_logged_in: 1},
      };
    }

    await userDocRef.set(
      {
        deviceId: deviceId,
        fcmToken: fcmToken,
        versionCode: ANDROID_VERSION_CODE,
        versionName: ANDROID_VERSION_NAME,
      },
      {merge: true},
    );

    return {
      success: true,
      message: 'Logged in successfully',
      data: {...userData, is_plan_purchased: userData?.is_plan_purchased || 0},
    };
  } catch (error: any) {
    let message = 'Unable to sign in user';
     // $&
    if (error?.code === 'auth/invalid-email') {
      Toast.show({
        type: TOAST_TYPES.ERROR,
        props: {
          title: 'Invalid Credentials',
        },
      });
      message = 'Invalid email address';
    } else if (error?.code === 'auth/user-not-found') {
      message = 'User not found';
    } else if (error?.code === 'auth/wrong-password') {
      Toast.show({
        type: TOAST_TYPES.ERROR,
        props: {
          title: 'Invalid Credentials',
        },
      });
      message = 'Incorrect password';
    } else if (error?.code === 'auth/invalid-credential') {
      Toast.show({
        type: TOAST_TYPES.ERROR,
        props: {
          title: 'Invalid Credentials',
        },
      });
      message = 'Incorrect credentials';
    }

    return {success: false, message: message};
  }
};

const resetPassword = async ({email}: any) => {
  if (!email) {
    return {success: false, message: 'Email is required'};
  }

  try {
    await auth().sendPasswordResetEmail(email.trim());
    return {success: true, message: 'Password reset email sent successfully.'};
  } catch (error: any) {
    let message = 'Unable to send password reset email';
    if (error?.code === 'auth/invalid-email') {
      message = 'Invalid email address';
    } else if (error?.code === 'auth/user-not-found') {
      message = 'User not found';
    } else if (error?.code === 'auth/missing-email') {
      message = 'Email is required';
    }

    return {success: false, message: message};
  }
};

export {
  checkEmailExists,
  sendOtpEmail,
  verifyOtp,
  purchasePlan,
  signup,
  signin,
  resetPassword,
};
