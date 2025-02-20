import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {setUser} from '@redux/reducers/userReducer';
import {ROUTES} from '@utils/routes';
import DeviceInfo from 'react-native-device-info';
import {navigate} from './NavService';
import Toast from 'react-native-toast-message';
import {TOAST_TYPES} from '@utils/constants';

const googleCofiguration = async () => {
  GoogleSignin.configure({
    webClientId:
      '725212882343-olglgprgj472629gv4gosdet4eoqdcf9.apps.googleusercontent.com',
    offlineAccess: true,
  });
};

const signInWithGoogle = async (setLoading: any = () => {}) => {
  try {
    await googleCofiguration();
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    const userInfo: any = await GoogleSignin.signIn();

    if (userInfo?.data) {
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo?.data?.idToken,
      );

      const response: any = await auth().signInWithCredential(googleCredential);

      const userDocRef = firestore()
        .collection('users')
        .doc(response?.user?.uid);
      const userDoc = await userDocRef.get();

      if (!userDoc.exists) {
        await firestore().collection('users').doc(response?.user?.uid).set({
          email: userInfo?.data?.user?.email,
        });
        setLoading && setLoading(false);
        navigate(ROUTES.VERIFICATION, {
          email: userInfo?.data?.user?.email,
          isEmailVerification: 1,
        });
      }

      const userData = userDoc?.data();
      const isVerified = userData?.is_verified === 1;
      const storedDeviceId = userData?.deviceId;

      if (!isVerified) {
        return {
          success: false,
          message: 'User is not verified',
          data: {email: userInfo?.data?.user?.email, is_verified: 0},
        };
      }

      const deviceId = await DeviceInfo.getUniqueId();

      if (storedDeviceId && storedDeviceId !== deviceId) {
        return {
          success: true,
          message: 'User is already logged in other device',
          data: {email: userInfo?.data?.user?.email, already_logged_in: 1},
        };
      }

      await userDocRef.set({deviceId: deviceId}, {merge: true});

      return {
        success: true,
        message: 'Logged in successfully',
        data: {
          ...userData,
          deviceId: deviceId,
          is_plan_purchased: userData?.is_plan_purchased || 0,
        },
      };
    }
    return {success: false, message: 'Unable to signin user'};
  } catch (error: any) {
    let message = 'Unable to sign in user';
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    } else if (error.code === statusCodes.IN_PROGRESS) {
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    } else {
      console.error(error);
    }
    return {success: false, message: message};
  }
};

const handleGoogleSignin = async (
  email: any = () => {},
  setLoading: any = () => {},
  setShowModal: any = () => {},
  setShowSuccessModal: any = () => {},
  dispatch: any = () => {},
) => {
  setLoading && setLoading(true);
  try {
    await googleCofiguration();
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    const result: any = await signInWithGoogle();
    if (result?.success) {
      setLoading && setLoading(false);
      if (result?.data?.already_logged_in == 1) {
        email.current = result?.data?.email;
        setShowModal && setShowModal(true);
      } else if (result?.data?.is_plan_purchased == 0) {
        setLoading && setLoading(false);
        navigate(ROUTES.SELECT_PLAN, {
          email: result?.data?.email,
        });
      } else if (result?.data?.is_plan_purchased == 1) {
        setLoading && setLoading(false);
        setShowSuccessModal && setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal && setShowSuccessModal(false);
          dispatch && dispatch(setUser(result?.data));
        }, 3000);
      }
    }
    if (result?.data?.is_verified == 0) {
      setLoading && setLoading(false);
      navigate(ROUTES.VERIFICATION, {
        email: result?.data?.email,
        isEmailVerification: true,
      });
    }
  } catch (err: any) {
     // $&
  } finally {
    setLoading && setLoading(false);
  }
};

const signupWithGoogle = async (setLoading: any = () => {}) => {
  try {
    await googleCofiguration();
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    const userInfo: any = await GoogleSignin.signIn();

    if (userInfo?.data) {
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo?.data?.idToken,
      );

      const response: any = await auth().signInWithCredential(googleCredential);

      const userDocRef = firestore()
        .collection('users')
        .doc(response?.user?.uid);
      const userDoc = await userDocRef.get();

      if (!userDoc.exists) {
        await firestore().collection('users').doc(response?.user?.uid).set({
          email: userInfo?.data?.user?.email,
        });
        return {
          success: true,
          message: 'User created successfully',
          data: {userId: response?.user?.uid},
        };
      }

      Toast.show({
        type: TOAST_TYPES.ERROR,
        props: {
          title: 'User already exists',
        },
      });
      return {success: false, message: 'User already exists'};
    }
    return {success: false, message: 'Unable to signin user'};
  } catch (error: any) {
    let message = 'Unable to sign in user';
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    } else if (error.code === statusCodes.IN_PROGRESS) {
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    } else {
      console.error(error);
    }
    return {success: false, message: message};
  }
};

const handleGoogleSignup = async (
  setLoading: any = () => {},
  setShowSuccessModal: any = () => {},
) => {
  setLoading && setLoading(true);
  try {
    await googleCofiguration();
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    const result: any = await signupWithGoogle();
    if (result?.success) {
       // $&
      setLoading && setLoading(false);
      setShowSuccessModal && setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal && setShowSuccessModal(false);
        navigate(ROUTES.LOGIN);
      }, 3000);
    } else {
       // $&
    }
  } catch (err: any) {
     // $&
  } finally {
    setLoading && setLoading(false);
  }
};

export {
  handleGoogleSignin,
  handleGoogleSignup,
  signInWithGoogle,
  signupWithGoogle,
};
