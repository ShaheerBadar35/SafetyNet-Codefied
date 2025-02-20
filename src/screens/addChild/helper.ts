import {setChild} from '@redux/reducers/childReducer';
import {
  setAddChildSettingsToggle,
  setChildAccounts,
} from '@redux/reducers/userReducer';
import {
  handleAddChildAccounts,
  handleAddChildSettingsToggle,
} from '@services/ChildService';
import {navigationRef} from '@services/NavService';
import {TOAST_TYPES} from '@utils/constants';
import Toast from 'react-native-toast-message';

const handleAdd = (childList: [], list: any = [], setList: any = () => {}) => {
  if (list?.length < 4 || !list) {
    setList &&
      setList((pre: any) => {
        if (pre)
          return [
            ...pre,
            {
              id: (childList?.length || 0) + list?.length,
              name: '',
              username: '',
            },
          ];
        else return [{id: list?.length, name: '', username: ''}];
      });
  }
};

const onPressBtn = async (
  user_email: any,
  message: any,
  childList: any = [],
  setBtnLoading: any = () => {},
  dispatch: any = () => {},
) => {
  setBtnLoading && setBtnLoading(true);
  setTimeout(async () => {
    const tempList: any = childList?.filter(
      (item: any) => item?.name?.length > 0 && item?.username?.length > 0,
    );
    const response: any = await handleAddChildAccounts({
      childs: tempList,
      message: message,
      user_email: user_email,
    });
    if (response?.status) {
      const child_account = response?.data?.child_account;
       // $&
      if (tempList?.length == child_account?.length) {
        Toast.show({
          type: TOAST_TYPES.LIGHT_SUCCESS,
          props: {
            title: response?.message
              ? response?.message
              : 'Child added successfully',
          },
        });
      } else if (tempList?.length > child_account?.length) {
        Toast.show({
          type: TOAST_TYPES.ERROR,
          props: {
            title: response?.message
              ? response.message
              : 'Child username not available',
          },
        });
      }
      dispatch && dispatch(setChildAccounts(child_account));
      // dispatch(setChild(tempList));
    }

    setBtnLoading && setBtnLoading(false);
    navigationRef?.current?.goBack();
  }, 3000);
};

const handleAddChildSettings = (
  email: any,
  handle_add_child_settings: any,
  dispatch: any = () => {},
) => {
  const params: any = {
    email: email,
    handle_add_child_settings: handle_add_child_settings == true ? 1 : 0,
  };
  handleAddChildSettingsToggle(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        dispatch &&
          dispatch(
            setAddChildSettingsToggle(data?.data?.handle_add_child_settings),
          );
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

export {handleAdd, onPressBtn, handleAddChildSettings};
