import {setUser} from '@redux/reducers/userReducer';
import {signin} from '@services/AuthService';
import {navigate} from '@services/NavService';
import {TOAST_TYPES} from '@utils/constants';
import {ROUTES} from '@utils/routes';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';

const handleSignin = async (
  data: any,
  setLoading: any = () => {},
  setShowModal: any = () => {},
  setShowSuccessModal: any = () => {},
  dispatch: any = () => {},
) => {
  const result: any = await signin(data);
   // $&
  if (result?.success) {
    setLoading && setLoading(false);
    if (result?.data?.already_logged_in == 1) {
       // $&
      setShowModal && setShowModal(true);
    } else if (result?.data?.is_plan_purchased == 0) {
      navigate(ROUTES.SELECT_PLAN, {
        email: data?.email,
      });
    } else if (result?.data?.is_plan_purchased == 1) {
      setShowSuccessModal && setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal && setShowSuccessModal(false);
        dispatch && dispatch(setUser(result?.data));
      }, 3000);
    }
  }
   // $&
  
  if (result?.data?.account_status === 'locked') {
    Toast.show({
      type: TOAST_TYPES.ERROR,
      props: {
        title:
          result?.message ||
          'Your account has been locked. Please contact support for more information',
      },
    });
  }
  if (result?.data?.is_verified == 0) {
    setLoading && setLoading(false);
    navigate(ROUTES.VERIFICATION, {
      email: data?.email,
      isEmailVerification: true,
    });
  }
  setLoading && setLoading(false);
};

const submitHandler = async (
  values: any,
  setLoading: any = () => {},
  setShowModal: any = () => {},
  setShowSuccessModal: any = () => {},
  dispatch: any = () => {},
) => {
  setLoading && setLoading(true);
  const deviceId = await DeviceInfo.getUniqueId();
  const token = await messaging().getToken();
  handleSignin(
    {...values, deviceId: deviceId, fcmToken: token},
    setLoading,
    setShowModal,
    setShowSuccessModal,
    dispatch,
  );
  // setTimeout(() => {
  //   setLoading && setLoading(false);
  //   navigate(ROUTES.SIGNUP_STEP_1);
  // }, 3000);
};

export {submitHandler};
