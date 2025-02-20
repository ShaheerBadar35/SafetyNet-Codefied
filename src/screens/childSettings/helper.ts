import {setChildSettingsToggle} from '@redux/reducers/userReducer';
import {handleChildSettingsToggle} from '@services/ChildService';
import {navigationRef} from '@services/NavService';
import {TOAST_TYPES} from '@utils/constants';
import Toast from 'react-native-toast-message';

const handleChildSettings = (
  email: any,
  handle_child_settings: any,
  dispatch: any = () => {},
) => {
  const params: any = {
    email: email,
    handle_child_settings: handle_child_settings == true ? 1 : 0,
  };
  handleChildSettingsToggle(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        Toast.show({
          type: handle_child_settings
            ? TOAST_TYPES.LIGHT_SUCCESS
            : TOAST_TYPES.DARK_SUCCESS,
          props: {
            title: handle_child_settings
              ? 'Child settings turned on successfully'
              : data?.message || 'Child settings turned off successfully',
          },
        });
        dispatch &&
          dispatch(setChildSettingsToggle(data?.data?.handle_child_settings));
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

const onPressAddChild = (
  childlist: any = [],
  setChildList: any = () => {},
  setBtnLoading: any = () => {},
) => {
  setBtnLoading && setBtnLoading(true);
  setTimeout(() => {
    setChildList && setChildList(childlist);
    setBtnLoading && setBtnLoading(false);
    setTimeout(() => {
      navigationRef?.current?.goBack();
    }, 1000);
  }, 3000);
};

export {handleChildSettings, onPressAddChild};
