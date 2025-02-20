import {checkEmailExists} from '@services/AuthService';
import {navigate} from '@services/NavService';
import {TOAST_TYPES} from '@utils/constants';
import {ROUTES} from '@utils/routes';
import {error} from 'console';
import Toast from 'react-native-toast-message';

const handleEmailExists = async (params: any, setLoading: any = () => {}) => {
  checkEmailExists(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        setLoading && setLoading(false);
        navigate(ROUTES.SIGNUP_STEP_2, {
          email: params?.email,
          referral_code: params?.referral_code,
        });
      } else {
         // $&
        Toast.show({
          type: TOAST_TYPES.ERROR,
          props: {
            title: data?.message || 'Error while signing in',
          },
        });
      }
    })
    .catch((err: any) => {
       // $&
      Toast.show({
        type: TOAST_TYPES.ERROR,
        props: {
          title: err?.message || 'Error while signing in',
        },
      });
    })
    .finally(() => {
      setLoading && setLoading(false);
    });
};

const submitHandler = async (values: any, setLoading: any = () => {}) => {
  setLoading && setLoading(true);
  setTimeout(async () => {
    const params: any = {
      email: values?.email,
      password: values?.password,
      referral_code: values?.referral_code,
    };
    await handleEmailExists(params, setLoading);
  }, 3000);
};

export {submitHandler};
