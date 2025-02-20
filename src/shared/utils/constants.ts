import {Platform} from 'react-native';

const ANDROID: any = Platform.OS === 'android';
const IOS: any = Platform.OS === 'ios';
const IS_ANDROID_33 = Platform.Version >= 33;
export {ANDROID, IOS, IS_ANDROID_33};

export const ANDROID_VERSION_CODE: any = '6';
export const ANDROID_VERSION_NAME: any = '1.0';

export const TABS: any = [
  'Profile',
  'HelpGuide',
  'Plan',
  'ContactUs',
  'Settings',
  // 'Logout',
];

export const PLANS: any = {
  SINGLE: 1,
  FAMILY: 2,
};

export const INTEGRATION_SETTINGS_DEVICE: any = {
  FITBIT: 1,
  GOOGLE_WATCH: 2,
};

export const TOTAL_ACCOUNTS_LIMIT = 4;

export const SERVICE_RUNNING_KEY = 'SERVICE_RUNNING';
export const POWER_BUTTON_LISTENER_KEY = 'PowerButtonListenerKey';
export const LOCATION_SERVICE_STARTED_CHILD_REF =
  'LocationServiceStartedChildRef';

export const TOAST_TYPES = {
  LIGHT_SUCCESS: 'lightSuccess',
  DARK_SUCCESS: 'darkSuccess',
  ERROR: 'error',
};

export const GEOFENCING_SAFE_ZONE_DATA = [
  {
    id: 1,
    value: 100,
  },
  {
    id: 2,
    value: 300,
  },
  {
    id: 3,
    value: 750,
  },
];

export const GEOFENCING_TIMER_DATA = [
  {
    id: 1,
    value: 5,
  },
  {
    id: 2,
    value: 10,
  },
  {
    id: 3,
    value: 15,
  },
];

export const TWILIO_NUMBER = '+16063667333';

export const SKUS: any = ['singleplan01', 'familyplan01'];
// export const SKUS: any = ['testing_monthly_single_01'];

export const HELP_GUIDE_DATA: any = [
  {
    id: 1,
    heading: 'Introduction',
    desc1:
      'Safety Net is your trusted companion in emergencies. Our app is designed to help you stay safe and connected.',
    desc2:
      'By using innovative keyword detection technology. In the event of an emergency, Safety Net will alert your selected contacts and 911 with your location.',
  },
  {
    id: 2,
    heading: 'Plan details',
    desc1:
      'We offer two subscription options: A single-user plan for $9.99 a month or a 4-user family plan for $15.99 a month.',
    desc2:
      'The family plan allows three additional users to join and use the app with their own personalized settings.',
  },
  {
    id: 3,
    heading: 'Profile',
    desc1:
      'Under profile settings, you will find a section labeled "Keyword." This is the word or phrase that will trigger Safety Net to alert your selected contacts and emergency services. Choose a unique keyword that you will remember easily.',
    desc2:
      'Avoid using common words like "help" or "stop" to prevent accidental triggers. Safety Net does not need to be open to listen for your keyword, and the service will start automatically after your device is restarted.',
  },
  {
    id: 4,
    heading: 'Emergency contacts',
    desc1:
      'Under the "Phone Numbers" section, you can add up to four contacts who will receive a text message with your GPS location when the keyword is spoken. Make sure to choose people who will be able to respond quickly in case of an emergency.',
    desc2: '',
  },
  {
    id: 5,
    heading: 'Additional users',
    desc1:
      'If you’ve selected the family plan, you can add three additional users under the "Additional Users" section.',
    desc2:
      'You will need to provide their Gmail addresses. Once added, they will receive an email allowing them to sign in, set up their own keyword, and add their own emergency contacts.',
  },
  {
    id: 6,
    heading: 'Additional features',
    desc1:
      'Explore Safety Net’s additional features such as editing your profile, managing notifications, and adjusting your account settings. Make the most of Safety Net to ensure you and your loved ones are safe in case of emergencies.',
    desc2: '',
  },
];

export const CONTACT_US_TEXT: any =
  'Please leave us an message on the following email address';

export const CONTACT_US_EMAIL: any = 'Safetynet@JWNLimited.com';

export const TEMPORARY_PASSWORD: any = 'Admin@123';

export const ADD_CHILD_ACCOUNTS_MESSAGE: any =
  'Hello,\nYou have requested to add these associated children to your Safety Net App';

export const CHILD_ACCOUNT_DOMAIN: any = '@yopmail.com';

export const ADD_ACCOUNT_LIMIT_REACHED_MESSAGE: any =
  'You have reached the maximum limit of 4 users on your family plan. This limit includes a combination of child users and additional users. Please remove an existing child or additional user to add a new one';
