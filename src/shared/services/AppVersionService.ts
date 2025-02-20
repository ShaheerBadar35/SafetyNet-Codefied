import {HTTP_CLIENT} from '@utils/config';
import {ENDPOINTS} from '@utils/endpoints';

const getAppVersion = () => {
  return HTTP_CLIENT.get(ENDPOINTS.CHECK_APP_VERSION);
};

export {getAppVersion};
