import {HTTP_CLIENT} from '@utils/config';
import {ENDPOINTS} from '@utils/endpoints';

const handleEmergencyKeyword = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.HANDLE_EMERGENCY_KEYWORD, params);
};

const handleTheme = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.HANDLE_THEME, params);
};

const handleCall911 = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.HANDLE_CALL_911, params);
};

const handleGestureEmergencyAlerts = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.HANDLE_GESTURE_EMERGENCY_ALERTS, params);
};

export {
  handleEmergencyKeyword,
  handleTheme,
  handleCall911,
  handleGestureEmergencyAlerts,
};
