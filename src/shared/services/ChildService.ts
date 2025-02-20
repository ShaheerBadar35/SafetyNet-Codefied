import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {HTTP_CLIENT} from '@utils/config';
import {
  CHILD_ACCOUNT_DOMAIN,
  PLANS,
  TEMPORARY_PASSWORD,
} from '@utils/constants';
import {ENDPOINTS} from '@utils/endpoints';

const fetchNewChildAccounts = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.FETCH_NEW_CHILD_ACCOUNTS, params);
};

const sendPasswordResetMailMainAccount = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.PASSWORD_RESET_MAIL_MAIN_ACCOUNT, params);
};

const sendChildAccountCreatedEmail = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.SEND_CHILD_ACCOUNT_CREATED_EMAIL, params);
};

const addChildAccounts = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.ADD_CHILD_ACCOUNTS, params);
};

const handleAddChildAccounts = async ({childs, message, user_email}: any) => {
  try {
    const params: any = {
      email: user_email,
      childAccounts: childs,
    };
    const {data} = await fetchNewChildAccounts(params);
    const status = data?.status;
    if (status) {
      const missing_child_account = data?.data?.missing_child_account;
      const already_present_child_accounts =
        data?.data?.already_present_child_accounts;

      let addedUsers: any = [];

      for (const [index, item] of missing_child_account.entries()) {
        const item = missing_child_account?.[index];
        let password = TEMPORARY_PASSWORD;

        try {
          const userCredential = await auth().createUserWithEmailAndPassword(
            item?.username?.trim() + '@yopmail.com',
            password,
          );
          const {uid} = userCredential.user;

          let expiryDate = new Date();
          expiryDate.setMonth(expiryDate?.getMonth() + 1);

          await firestore()
            .collection('users')
            .doc(uid)
            .set({
              email: item?.username?.trim() + '@yopmail.com',
              is_verified: 1,
              is_plan_purchased: 1,
              is_child_account: 1,
              created_by_user: {
                email: user_email,
              },
              plan: {
                plan_id: PLANS.SINGLE,
              },
              expiry_date: expiryDate,
              profile: {
                name: item?.username?.trim(),
              },
            });
          if (uid) addedUsers?.push(item);
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
        }
      }

      const emails = addedUsers?.map((item: any) => item?.username);

      for (const [index, item] of emails.entries()) {
        const resp: any = await sendPasswordResetMailMainAccount({
          email: item + CHILD_ACCOUNT_DOMAIN,
          mainAccount: user_email,
        });
      }

      if (emails?.length > 0) {
        sendChildAccountCreatedEmail({
          user_email: user_email,
          accounts: emails,
          message: message,
          password: TEMPORARY_PASSWORD,
        })
          .then(({data}: any) => {
            const status: any = data?.status;
            if (status) {
               // $&
            } else {
               // $&
            }
          })
          .catch((err: any) => {
             // $&
          })
          .finally(() => {});

        addChildAccounts({
          email: user_email,
          child_accounts: [...already_present_child_accounts, ...addedUsers],
        })
          .then(({data}: any) => {
            const status: any = data?.status;
            if (status) {
               // $&
            } else {
               // $&
            }
          })
          .catch((err: any) => {
             // $&
          })
          .finally(() => {});
      }

      return {
        status: true,
        message: 'Child account created successfully',
        data: {
          child_account: [...already_present_child_accounts, ...addedUsers],
        },
      };
    } else {
      return {
        status: false,
        message: 'Unabled to create child account',
      };
    }
  } catch (error: any) {
    return {
      status: false,
      message: 'Unable to create child accounts: ' + error.message,
    };
  }
};

const handleChildGeofencingToggle = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.HANDLE_CHILD_GEOFENCING_TOGGLE, params);
};

const handleChildCall911Toggle = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.HANDLE_CHILD_CALL_911_TOGGLE, params);
};

const handleChildGestureEmergencyAlertsToggle = (params: any) => {
  return HTTP_CLIENT.post(
    ENDPOINTS.HANDLE_CHILD_GESTURE_EMERGENCY_ALERTS_TOGGLE,
    params,
  );
};

const handleChildGeofencingSettingsTimer = (params: any) => {
  return HTTP_CLIENT.post(
    ENDPOINTS.HANDLE_CHILD_GEOFENCING_SETTINGS_TIMER,
    params,
  );
};

const handleChildGeofencingSettingsSafeZone = (params: any) => {
  return HTTP_CLIENT.post(
    ENDPOINTS.HANDLE_CHILD_GEOFENCING_SETTINGS_SAFE_ZONE,
    params,
  );
};

const handleChildGeofencingEmergencyContacts = (params: any) => {
  return HTTP_CLIENT.post(
    ENDPOINTS.HANDLE_CHILD_GEOFENCING_EMERGENCY_CONTACTS,
    params,
  );
};

const handleChildGeofencingSafeLocation = (params: any) => {
  return HTTP_CLIENT.post(
    ENDPOINTS.HANDLE_CHILD_GEOFENCING_SAFE_LOCATION,
    params,
  );
};

const handleChildSettingsToggle = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.HANDLE_CHILD_SETTINGS_TOGGLE, params);
};

const handleAddChildSettingsToggle = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.HANDLE_ADD_CHILD_SETTINGS_TOGGLE, params);
};

const handleDeleteChildAccount = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.HANDLE_DELETE_CHILD_ACCOUNT, params);
};

const addChildEmergencyKeyword = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.ADD_CHILD_EMERGENCY_KEYWORD, params);
};

const handleDeleteGeofencingSafeLocation = (params: any) => {
  return HTTP_CLIENT.post(
    ENDPOINTS.HANDLE_DELETE_GEOFENCING_SAFE_LOCATION,
    params,
  );
};

const handleUpdateFamilyChildName = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.HANDLE_UPDATE_FAMILY_CHILD_NAME, params);
};

const handleGenerateChildPasswordResetLink = (params: any) => {
  return HTTP_CLIENT.post(
    ENDPOINTS.HANDLE_GENERATE_CHILD_PASSWORD_RESET_LINK,
    params,
  );
};

const sendChildPasswordResetEmail = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.SEND_CHILD_PASSWORD_RESET_EMAIL, params);
};

const sendChildLogoutPushNotification = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.CHILD_LOGOUT_PUSH_NOTIFICATION, params);
};

export {
  addChildEmergencyKeyword,
  handleAddChildAccounts,
  handleAddChildSettingsToggle,
  handleChildCall911Toggle,
  handleChildGeofencingEmergencyContacts,
  handleChildGeofencingSafeLocation,
  handleChildGeofencingSettingsSafeZone,
  handleChildGeofencingSettingsTimer,
  handleChildGeofencingToggle,
  handleChildGestureEmergencyAlertsToggle,
  handleChildSettingsToggle,
  handleDeleteChildAccount,
  handleDeleteGeofencingSafeLocation,
  handleUpdateFamilyChildName,
  handleGenerateChildPasswordResetLink,
  sendChildPasswordResetEmail,
  sendChildLogoutPushNotification,
};
