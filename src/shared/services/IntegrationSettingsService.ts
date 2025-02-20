import {HTTP_CLIENT} from '@utils/config';
import {ENDPOINTS} from '@utils/endpoints';

const handleIntegrationSettingsToggle = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.HANDLE_INTEGRATION_SETTINGS_TOGGLE, params);
};

const handleIntegrationSettingsHeartbeatMonitoringToggle = (params: any) => {
  return HTTP_CLIENT.post(
    ENDPOINTS.HANDLE_INTEGRATION_SETTINGS_HEARTBEAT_MONITORING_TOGGLE,
    params,
  );
};

const handleIntegrationSettingsCall911Toggle = (params: any) => {
  return HTTP_CLIENT.post(
    ENDPOINTS.HANDLE_INTEGRATION_SETTINGS_CALL_911_TOGGLE,
    params,
  );
};

const handleIntegrationSettingsGestureEmergencyAlertsToggle = (params: any) => {
  return HTTP_CLIENT.post(
    ENDPOINTS.HANDLE_INTEGRATION_SETTINGS_GESTURE_EMERGENCY_ALERTS_TOGGLE,
    params,
  );
};

const handleIntegrationSettingsHeartrateThreshold = (params: any) => {
  return HTTP_CLIENT.post(
    ENDPOINTS.HANDLE_INTEGRATION_SETTINGS_HEARTRATE_THRESHOLD,
    params,
  );
};

const handleIntegrationSettingsDevice = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.HANDLE_INTEGRATION_SETTINGS_DEVICE, params);
};

const handleIntegrationSettingsEmergencyContacts = (params: any) => {
  return HTTP_CLIENT.post(
    ENDPOINTS.HANDLE_INTEGRATION_SETTINGS_EMERGENCY_CONTACTS,
    params,
  );
};

const handleIntegrationSettingsWatchData = (params: any) => {
  return HTTP_CLIENT.post(
    ENDPOINTS.HANDLE_INTEGRATION_SETTINGS_WATCH_DATA,
    params,
  );
};

const handleFitbitRefreshToken = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.HANDLE_FITBIT_REFRESH_TOKEN, params);
};

export {
  handleIntegrationSettingsToggle,
  handleIntegrationSettingsHeartbeatMonitoringToggle,
  handleIntegrationSettingsCall911Toggle,
  handleIntegrationSettingsGestureEmergencyAlertsToggle,
  handleIntegrationSettingsHeartrateThreshold,
  handleIntegrationSettingsDevice,
  handleIntegrationSettingsEmergencyContacts,
  handleIntegrationSettingsWatchData,
  handleFitbitRefreshToken,
};
