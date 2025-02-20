import {HTTP_CLIENT} from '@utils/config';
import {ENDPOINTS} from '@utils/endpoints';

const handleChangePlan = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.HANDLE_CHANGE_PLAN, params);
};

const validateSubscriptionAPI = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.VALIDATE_SUBSCRIPTION_API, params);
};

const storeSubscriptionAPI = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.STORE_SUBSCRIPTION, params);
};

const cancelSubscriptionAPI = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.CANCEL_SUBSCRIPTION, params);
};

export {
  handleChangePlan,
  validateSubscriptionAPI,
  storeSubscriptionAPI,
  cancelSubscriptionAPI,
};
