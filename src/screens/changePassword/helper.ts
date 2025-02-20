import auth from '@react-native-firebase/auth';
import {navigationRef} from '@services/NavService';
import {changePassword, verifyOldPassword} from '@services/profileService';
import {TOAST_TYPES} from '@utils/constants';
import Toast from 'react-native-toast-message';

const handleOldPassword = async (params: any) => {
  const response: any = await verifyOldPassword(params);
  return response;
};

const handleChangePassword = async (params: any) => {
  const response: any = await changePassword(params);
  return response;
};

const submitHandler = async (
  email: any,
  values: any,
  setLoading: any = () => {},
) => {
  const params: any = {
    email: email,
    newPassword: values?.password,
  };
  setLoading && setLoading(true);
  const response: any = await handleOldPassword({
    email: email,
    password: values?.current_password,
  });
  if (response?.success) {
    const resp: any = await handleChangePassword(params);
    if (resp?.status) {
       // $&
      Toast.show({
        type: TOAST_TYPES.LIGHT_SUCCESS,
        props: {
          title: resp?.data?.message
            ? resp?.data?.message
            : 'Password changed successfully',
        },
      });
    } else {
       // $&
    }
  } else {
     // $&
  }
  setTimeout(() => {
    setLoading && setLoading(false);
    navigationRef?.current?.goBack();
  }, 3000);
};

export {submitHandler};
