import {HTTP_CLIENT} from '@utils/config';
import {ENDPOINTS} from '@utils/endpoints';

const makeTwilioCall = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.MAKE_CALL, params);
};

export {makeTwilioCall};
