import {HTTP_CLIENT} from '@utils/config';
import {ENDPOINTS} from '@utils/endpoints';

const addUserEmergencyKeyword = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.ADD_USER_EMERGENCY_KEYWORD, params);
};

export {addUserEmergencyKeyword};
