import {resetChild} from '@redux/reducers/childReducer';
import {resetUser} from '@redux/reducers/userReducer';
import {sendChildLogoutPushNotification} from '@services/ChildService';

const handleLogout = (dispatch: any = () => {}) => {
  dispatch && dispatch(resetChild());
  dispatch && dispatch(resetUser());
};

const hitChildLogoutNotificationAPI = (params: any = {}) => {
  sendChildLogoutPushNotification(params)
    .then(({data}: any) => {
      if (data?.status) {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

export {handleLogout, hitChildLogoutNotificationAPI};
