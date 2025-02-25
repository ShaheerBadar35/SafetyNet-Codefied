import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {HTTP_CLIENT} from '@utils/config';
import {PLANS, TEMPORARY_PASSWORD, TOAST_TYPES} from '@utils/constants';
import {ENDPOINTS} from '@utils/endpoints';
import Toast from 'react-native-toast-message';

const sendFamilyPlanUserAddedEmail = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.SEND_FAMILY_PLAN_USER_ADDED_EMAIL, params);
};

const sendPasswordResetMailMainAccount = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.PASSWORD_RESET_MAIL_MAIN_ACCOUNT, params);
};

const addFamilyPlanUsers = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.ADD_FAMILY_PLAN_USERS, params);
};

const addPlanUsers = async ({users, message, user_email}: any) => {
  console.log("USERS: ",users);
  console.log("Message: ",message);
  console.log("USER_EMAIL: ",user_email);
  try {
    if (!message || !user_email) {
      return {
        status: false,
        message: 'Message and user email are required.',
      };
    }

    //check if users is array or not
    if (!Array.isArray(users) || users.length === 0) {
      return {
        status: false,
        message: 'An array of users is required',
      };
    }

    let addedUsers: any = [];

    for (const [index, item] of users.entries()) {
      const item = users?.[index];
      let password = TEMPORARY_PASSWORD;
      console.log("User Email: ",item);
      try {
        const userCredential = await auth().createUserWithEmailAndPassword(
          item?.email.trim(),
          password,
        );
        const {uid} = userCredential.user;

        let expiryDate = new Date();
        expiryDate.setMonth(expiryDate?.getMonth() + 1);

        await firestore()
          .collection('users')
          .doc(uid)
          .set({
            email: item?.email.trim(),
            is_verified: 1,
            is_plan_purchased: 1,
            created_by_user: {
              email: user_email,
            },
            plan: {
              plan_id: PLANS.SINGLE,
            },
            expiry_date: expiryDate,
          });

        addedUsers?.push({email: item?.email});
      } catch (error: any) {
        console.error('Error creating user:', error);

        let message = 'Unable to create user';
        if (error?.code === 'auth/email-already-in-use') {
          message = 'That email address is already in use!';
          Toast.show({
            type: TOAST_TYPES.ERROR,
            props: {
              title: 'This user already exists' || message,
            },
          });
        } else if (error?.code === 'auth/invalid-email') {
          message = 'That email address is invalid!';
        } else if (error?.code === 'auth/weak-password') {
          message = 'Password is too weak!';
        }
      }
    }
    const emails = addedUsers?.map((item: any) => item?.email);
    const email_send_response: any = await sendFamilyPlanUserAddedEmail({
      emails: emails,
      password: TEMPORARY_PASSWORD,
      message: message,
    });

    // for (const [index, item] of emails.entries()) {
    //   const resp: any = await sendPasswordResetMailMainAccount({
    //     email: item,
    //     mainAccount: user_email,
    //   });
    // }

    if (email_send_response?.data?.status) {
      const added_family_plan_user_response: any = await addFamilyPlanUsers({
        email: user_email,
        family_plan_user: addedUsers,
      });

      if (added_family_plan_user_response?.data?.status) {
        const family_plan_users: any =
          added_family_plan_user_response?.data?.data?.family_plan_users;

        return {
          success: true,
          message: 'Users added successfully',
          data: {
            family_plan_users: family_plan_users,
          },
        };
      }
    }

    return {
      success: false,
      message: 'Unable to add users for family plan',
    };
  } catch (error: any) {
     // $&
    return {
      success: false,
      message: 'Unable to create users: ' + error.message,
    };
  }
};

const handleDeleteFamilyPlanUser = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.HANDLE_DELETE_FAMILY_PLAN_USER, params);
};

const handleGoogleAssitantWalkthrough = (params: any) => {
  return HTTP_CLIENT.post(
    ENDPOINTS.HANDLE_GOOGLE_ASSISTANT_WALKTHROUGH,
    params,
  );
};

export {
  addPlanUsers,
  handleDeleteFamilyPlanUser,
  handleGoogleAssitantWalkthrough,
};
