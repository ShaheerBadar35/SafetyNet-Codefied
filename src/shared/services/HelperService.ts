import Toast from 'react-native-toast-message';
import {getAppVersion} from './AppVersionService';
import {ANDROID_VERSION_CODE, ANDROID_VERSION_NAME} from '@utils/constants';

const isUserAgeBetween4And18 = (birthYear: number) => {
  const currentYear = new Date().getFullYear();
  const userAge = Number(currentYear) - Number(birthYear);
  return userAge >= 4 && userAge <= 18;
};

const showToast = (
  text1?: string,
  text2?: string,
  type?: boolean,
  btnTitle?: string,
  onBtnPress?: any,
) => {
  Toast.show({
    type: type ? 'success' : 'error',
    props: {
      title: text1,
      subTitle: text2,
      btnTitle: btnTitle,
      onBtnPress: onBtnPress,
    },
  });
};

const errorHandler = (err: any) => {
  const errors = err?.response?.data?.message;
  showToast('Request Failed', errors);
};

const handleNullInNumber = (value: number | null) => {
  if (!value) {
    return 0;
  }
  return value;
};

const shouldUpdateApp = (data: any) => {
  if (
    Number(ANDROID_VERSION_NAME) < Number(data?.versionName) ||
    Number(ANDROID_VERSION_CODE) < Number(data?.versionCode)
  )
    return true;
  return false;
};

const hitAppVersionApi = (setModal: any = () => {}) => {
  getAppVersion()
    .then(({data}: any) => {
      if (data?.status) {
        setModal(() => shouldUpdateApp(data?.data));
      }
       // $&
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

export {
  isUserAgeBetween4And18,
  showToast,
  errorHandler,
  handleNullInNumber,
  hitAppVersionApi,
};
