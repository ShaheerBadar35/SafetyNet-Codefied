const BASE_URL = 'https://us-central1-safety-net-af7bd.cloudfunctions.net/';

const ENDPOINTS = {
  CHECK_EMAIL_EXISTS: 'checkEmailExists',
  SEND_OTP_EMAIL: 'sendOtpEmail',
  VERIFY_OTP: 'verifyOtp',
  PURCHASE_PLAN: 'purchasePlan',
  ADD_USER_EMERGENCY_CONTACTS: 'addUserEmergencyContacts',
  ADD_USER_EMERGENCY_KEYWORD: 'addUserEmergencyKeyword',
  SEND_FAMILY_PLAN_USER_ADDED_EMAIL: 'sendFamilyPlanUserAddedEmail',
  PASSWORD_RESET_MAIL_MAIN_ACCOUNT: 'passwordResetMailMainAccount',
  ADD_FAMILY_PLAN_USERS: 'addFamilyPlanUsers',
  HANDLE_EMERGENCY_KEYWORD: 'handleEmergencyKeyword',
  HANDLE_THEME: 'handleTheme',
  HANDLE_CALL_911: 'handleCall911',
  HANDLE_GESTURE_EMERGENCY_ALERTS: 'handleGestureEmergencyAlerts',
  FETCH_NEW_CHILD_ACCOUNTS: 'fetchNewChildAccounts',
  SEND_CHILD_ACCOUNT_CREATED_EMAIL: 'sendChildAccountCreatedEmail',
  ADD_CHILD_ACCOUNTS: 'addChildAccounts',
  HANDLE_CHILD_GEOFENCING_TOGGLE: 'handleChildGeofencingToggle',
  HANDLE_CHILD_CALL_911_TOGGLE: 'handleChildCall911',
  HANDLE_CHILD_GESTURE_EMERGENCY_ALERTS_TOGGLE:
    'handleChildGestureEmergencyAlerts',
  HANDLE_CHILD_GEOFENCING_SETTINGS_TIMER: 'handleChildGeofencingSettingsTimer',
  HANDLE_CHILD_GEOFENCING_SETTINGS_SAFE_ZONE:
    'handleChildGeofencingSettingsSafeZone',
  HANDLE_CHILD_GEOFENCING_EMERGENCY_CONTACTS:
    'handleChildGeofencingEmergencyContacts',
  HANDLE_CHILD_GEOFENCING_SAFE_LOCATION: 'handleChildGeofencingSafeLocation',
  HANDLE_INTEGRATION_SETTINGS_TOGGLE: 'handleIntegrationSettingsToggle',
  HANDLE_INTEGRATION_SETTINGS_HEARTBEAT_MONITORING_TOGGLE:
    'handleIntegrationSettingsHeartbeatMonitoringToggle',
  HANDLE_INTEGRATION_SETTINGS_CALL_911_TOGGLE:
    'handleIntegrationSettingsCall911Toggle',
  HANDLE_INTEGRATION_SETTINGS_GESTURE_EMERGENCY_ALERTS_TOGGLE:
    'handleIntegrationSettingsGestureEmergencyAlertsToggle',
  HANDLE_INTEGRATION_SETTINGS_HEARTRATE_THRESHOLD:
    'handleIntegrationSettingsHeartrateThreshold',
  HANDLE_INTEGRATION_SETTINGS_DEVICE: 'handleIntegrationSettingsDevice',
  HANDLE_INTEGRATION_SETTINGS_EMERGENCY_CONTACTS:
    'handleIntegrationSettingsEmergencyContacts',
  UPLOAD_PROFILE_IMAGE: 'uploadProfileImage',
  UPDATE_USER_PROFILE: 'updateUserProfile',
  HANDLE_CHILD_SETTINGS_TOGGLE: 'handleChildSettingsToggle',
  HANDLE_ADD_CHILD_SETTINGS_TOGGLE: 'handleAddChildSettingsToggle',
  HANDLE_DELETE_CHILD_ACCOUNT: 'handleDeleteChildAccount',
  ADD_CHILD_EMERGENCY_KEYWORD: 'addChildEmergencyKeyword',
  CHANGE_PASSWORD: 'changePassword',
  PLACES_SUGGESTION: 'maps/api/place/autocomplete/json',
  HANDLE_DELETE_GEOFENCING_SAFE_LOCATION: 'handleDeleteGeofencingSafeLocation',
  HANDLE_DELETE_FAMILY_PLAN_USER: 'deleteFamilyPlanUser',
  HANDLE_UPDATE_FAMILY_CHILD_NAME: 'updateFamilyChildName',
  HANDLE_GENERATE_CHILD_PASSWORD_RESET_LINK: 'generateChildPasswordResetLink',
  SEND_CHILD_PASSWORD_RESET_EMAIL: 'sendChildPasswordResetEmail',
  HANDLE_CHANGE_PLAN: 'changePlan',
  MAKE_CALL: 'makeCall',
  HANDLE_INTEGRATION_SETTINGS_WATCH_DATA: 'handleIntegrationSettingsWatchData',
  HANDLE_FITBIT_REFRESH_TOKEN: 'refreshFitbitToken',
  CHECK_APP_VERSION: 'getAppVersion',
  CHILD_LOGOUT_PUSH_NOTIFICATION: 'sendChildLogoutPushNotification',
  HANDLE_GOOGLE_ASSISTANT_WALKTHROUGH: 'handleGoogleAssistantWalkthrough',
  VALIDATE_SUBSCRIPTION_API: 'validateSubscriptionAPI',
  STORE_SUBSCRIPTION: 'storeSubscription',
  CANCEL_SUBSCRIPTION: 'cancelSubscription',
};

export {BASE_URL, ENDPOINTS};
