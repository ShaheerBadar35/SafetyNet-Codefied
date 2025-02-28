import {setUser} from '@redux/reducers/userReducer';
import {store} from '@redux/store';
import {
  cancelSubscriptionAPI,
  handleChangePlan,
  validateSubscriptionAPI,
} from '@services/PlanService';
import {CHILD_ACCOUNT_DOMAIN, PLANS, SKUS, TOAST_TYPES} from '@utils/constants';
import {getSubscriptions} from 'react-native-iap';
import * as RNIap from 'react-native-iap';
import Toast from 'react-native-toast-message';

const showButtonTitle = (plan: any, selected: any) => {
  if (plan == PLANS.SINGLE && selected == PLANS.SINGLE) return 'Current Plan';
  else if (plan == PLANS.SINGLE && selected == PLANS.FAMILY)
    return 'Select new plan';
  else if (plan == PLANS.FAMILY && selected == PLANS.SINGLE)
    return 'Select new plan';
  else if (plan == PLANS.FAMILY && selected == PLANS.FAMILY)
    return 'Current Plan';
};

const isButtonDisabled = (plan: any, selected: any) => {
  // if (plan == PLANS.SINGLE && selected == PLANS.SINGLE) return true;
  // if (plan == PLANS.FAMILY && selected == PLANS.FAMILY) return true;
  return false;
};

const changePlan = async (params: any) => {
  const response: any = await handleChangePlan(params);
  if (response?.data?.status) {
    store?.dispatch(setUser(response?.data?.data));
  }
};

const handleOnPress = async (
  email: any,
  setLoading: any,
  plan: any,
  selected: any,
  setShowSuccessModal: any = () => {},
  setShowPlanDowngradeModal: any = () => {},
  setShowPlanUpgradeModal: any = () => {},
) => {
  const params: any = {
    email: email,
    planId: selected,
    child_account_domain: CHILD_ACCOUNT_DOMAIN,
  };
  setLoading && setLoading(true);
  if (
    (plan == PLANS.SINGLE && selected == PLANS.SINGLE) ||
    (plan == PLANS.FAMILY && selected == PLANS.FAMILY)
  ) {
    await changePlan(params);
    setLoading && setLoading(false);

    setShowSuccessModal && setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal && setShowSuccessModal(false);
    }, 3000);
    // setLoading && setLoading(true);
    // setTimeout(() => {
    //   setLoading && setLoading(false);
    //   if (plan == PLANS.FAMILY && selected == PLANS.FAMILY) {
    //     // navigate(ROUTES.EDIT_USERS);
    //   }
    // }, 3000);
  } else {
    await changePlan(params);
    setLoading && setLoading(false);
    if (plan == PLANS.FAMILY && selected == PLANS.SINGLE)
      setShowPlanDowngradeModal && setShowPlanDowngradeModal(true);
    else if (plan == PLANS.SINGLE && selected == PLANS.FAMILY)
      setShowPlanUpgradeModal && setShowPlanUpgradeModal(true);
    else setShowSuccessModal && setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal && setShowSuccessModal(false);
    }, 3000);
  }
  setLoading && setLoading(false);
};

const setAvailableSubscriptions = async (setSubscriptions: any = () => {}) => {
  const subscriptions: any = await getSubscriptions({skus: SKUS});
  if (subscriptions.length === 0) {
     // $&
    return;
  }
   // $&
  //  console.log("SUBSCRIPTIONS: ",subscriptions);
  setSubscriptions(() => subscriptions);
};

const hitValidateSubscriptionAPI = async (params: any) => {
  const response: any = await validateSubscriptionAPI(params);
  if (response?.data?.status) {
    Toast.show({
      type: TOAST_TYPES.DARK_SUCCESS,
      props: {
        title: 'Validate',
      },
    });
    return true;
  }
  Toast.show({
    type: TOAST_TYPES.ERROR,
    props: {
      title: 'Validation Error',
    },
  });
  return false;
};

const purchaseSubscription = async (
  productId: any = '',
  offerTokens: any = [],
  email: any = '',
) => {
  const offerToken = offerTokens.map((offer: any) => offer.offerToken);
   // $&
  console.log("PRODUCT ID: ",productId);
  console.log("offerTOKENS: ",offerTokens);
  console.log("offerTOKEN: ",offerToken);
  try {
    const purchase: any = await RNIap.requestSubscription({
      sku: productId,
      subscriptionOffers: [
        {
          sku: productId,
          offerToken: offerToken?.[0],
        },
      ],
    });
    Toast.show({
      type: TOAST_TYPES.DARK_SUCCESS,
      props: {
        title: 'Success',
      },
    });

    const params: any = {
      packageName: 'com.safetynet.app',
      email: email,
      // transactionReceipt: purchase.transactionReceipt,
      productId: productId,
      purchaseToken: purchase?.[0]?.purchaseToken,
      response: purchase?.[0],
    };

    const response: any = await hitValidateSubscriptionAPI(params);

    if (response) {
      Toast.show({
        type: TOAST_TYPES.DARK_SUCCESS,
        props: {
          title: 'Inside',
        },
      });
      await RNIap.acknowledgePurchaseAndroid(purchase?.[0]?.purchaseToken);
    }
  } catch (err: any) {
     // $&
    Toast.show({
      type: TOAST_TYPES.ERROR,
      props: {
        title: err?.message || 'Error',
      },
    });
  } finally {
  }
};

const hitCancelSubscriptionAPI = (
  user: any,
  setModal: any,
  isBtnLoading: any,
) => {
  isBtnLoading && isBtnLoading(true);
  Toast.show({
    type: TOAST_TYPES.DARK_SUCCESS,
    props: {
      title: 'Cancel Subscription Modal',
    },
  });
  const params: any = {
    email: user?.email,
    packageName: 'com.safetynet.app',
    subscriptionId: user?.subscription?.productId,
    purchaseToken: user?.subscription?.purchaseToken,
  };
  // console.log("USER: ",user);
  cancelSubscriptionAPI(params)
    .then(({data}: any) => {
      Toast.show({
        type: TOAST_TYPES.DARK_SUCCESS,
        props: {
          title: data?.message || 'Subscription Cancelled Successfull',
        },
      });
    })
    .catch((err: any) => {
      Toast.show({
        type: TOAST_TYPES.ERROR,
        props: {
          title: err?.message || 'Error while Cancelling subscription',
        },
      });
    })
    .finally(() => {
      isBtnLoading && isBtnLoading(false);
      setModal && setModal(false);
    });
};

export {
  handleOnPress,
  isButtonDisabled,
  showButtonTitle,
  setAvailableSubscriptions,
  purchaseSubscription,
  hitValidateSubscriptionAPI,
  hitCancelSubscriptionAPI,
};
