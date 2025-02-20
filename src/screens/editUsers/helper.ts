import {setFamilyPlanUsers} from '@redux/reducers/userReducer';
import {addPlanUsers, handleDeleteFamilyPlanUser} from '@services/UserService';
import {TOAST_TYPES} from '@utils/constants';
import Toast from 'react-native-toast-message';

const handleAddUsers = async (
  setLoading: any = () => {},
  setUsers: any = () => {},
  addUsers: any = [],
  users: any = [],
  message: any = '',
  user: any = {},
  dispatch: any = () => {},
  setShowAddUsers: any = () => {},
) => {
  setLoading && setLoading(true);
  setTimeout(async () => {
    const response: any = await addPlanUsers({
      users: addUsers?.filter((item: any) => item?.email?.length > 0),
      // users: users,
      message: message,
      user_email: user?.email,
    });
    if (response?.success) {
      Toast.show({
        type: TOAST_TYPES.LIGHT_SUCCESS,
        props: {
          title: response?.message
            ? response?.message
            : 'Users added successfully',
        },
      });
      const family_plan_users: any = response?.data?.family_plan_users;
      setUsers && setUsers(() => family_plan_users);
      dispatch && dispatch(setFamilyPlanUsers(family_plan_users));
    }
    setLoading && setLoading(false);
    setShowAddUsers && setShowAddUsers && setShowAddUsers(false);
  }, 3000);
};

const handleDeleteUser = async (
  email: any,
  username: any,
  setLoading: any = () => {},
  setUsers: any = () => {},
  setModal: any = () => {},
  setShowRemovedModal: any = () => {},
  dispatch: any = () => {},
) => {
  setLoading && setLoading(true);
  const params: any = {
    email: email,
    username: username,
  };
  const response: any = await handleDeleteFamilyPlanUser(params);
  if (response?.status) {
    const family_plan_users: any = response?.data?.data?.family_plan_users;
    setUsers && setUsers(() => family_plan_users);
    dispatch && dispatch(setFamilyPlanUsers(family_plan_users));
    setLoading && setLoading(false);
    setModal && setModal(false);
    setTimeout(() => {
      setShowRemovedModal && setShowRemovedModal(true);
    }, 1000);
  }
  setLoading && setLoading(false);
  setModal && setModal(false);
};

export {handleAddUsers, handleDeleteUser};
