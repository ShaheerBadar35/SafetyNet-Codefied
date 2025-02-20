import {createSlice} from '@reduxjs/toolkit';

interface State {
  user: any;
  emergency_contacts: any;
  handle_emergency_keyword: any;
  theme: any;
  call_911: any;
  gesture_emergency_alerts: any;
  user_emergency_keyword: any;
  family_plan_users: any;
  child_settings: any;
  handle_integration_settings: any;
  integration_settings: any;
  profile: any;
  handle_child_settings: any;
  handle_add_child_settings: any;
  assistant_walkthrough: any;
}

const initialState: State = {
  user: null,
  emergency_contacts: null,
  handle_emergency_keyword: null,
  theme: null,
  call_911: null,
  gesture_emergency_alerts: null,
  user_emergency_keyword: null,
  family_plan_users: null,
  child_settings: null,
  handle_integration_settings: null,
  integration_settings: null,
  profile: null,
  handle_child_settings: null,
  handle_add_child_settings: null,
  assistant_walkthrough: null,
};

export const userReducer: any = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserEmergencyContacts: (state, action) => {
      state.user = {...state.user, emergency_contacts: action.payload};
    },
    setAddEmergencyKeyword: (state, action) => {
      state.user = {...state.user, handle_emergency_keyword: action.payload};
    },
    setAddTheme: (state, action) => {
      state.user = {...state.user, theme: action.payload};
    },
    setAddCall911: (state, action) => {
      state.user = {...state.user, call_911: action.payload};
    },
    setAddGestureEmergencyAlerts: (state, action) => {
      state.user = {...state.user, gesture_emergency_alerts: action.payload};
    },
    setUserEmergencyKeyword: (state, action) => {
      state.user = {...state.user, user_emergency_keyword: action.payload};
    },
    setFamilyPlanUsers: (state, action) => {
      state.user = {...state.user, family_plan_users: action.payload};
    },
    setChildAccounts: (state, action) => {
      state.user = {
        ...state.user,
        child_settings: {
          ...state.user.child_settings,
          child_account: action.payload,
        },
      };
    },
    setIntegrationSettingsToggle: (state, action) => {
      state.user = {
        ...state.user,
        handle_integration_settings: action.payload,
      };
    },
    setIntegrationSettings: (state, action) => {
      state.user = {
        ...state.user,
        integration_settings: action.payload,
      };
    },
    setProfile: (state, action) => {
      state.user = {
        ...state.user,
        profile: action.payload,
      };
    },
    setChildSettingsToggle: (state, action) => {
      state.user = {
        ...state.user,
        handle_child_settings: action.payload,
      };
    },
    setAddChildSettingsToggle: (state, action) => {
      state.user = {
        ...state.user,
        handle_add_child_settings: action.payload,
      };
    },
    setGoogleAssistantWalkthrough: (state, action) => {
      state.user = {
        ...state.user,
        assistant_walkthrough: action?.payload,
      };
    },
    resetUser: state => ({
      user: null,
      emergency_contacts: null,
      handle_emergency_keyword: null,
      theme: null,
      call_911: null,
      gesture_emergency_alerts: null,
      user_emergency_keyword: null,
      family_plan_users: null,
      child_settings: null,
      handle_integration_settings: null,
      integration_settings: null,
      profile: null,
      handle_child_settings: null,
      handle_add_child_settings: null,
      assistant_walkthrough: null,
    }),
  },
});

export const {
  setUser,
  setUserEmergencyContacts,
  setAddEmergencyKeyword,
  setAddTheme,
  setAddCall911,
  setAddGestureEmergencyAlerts,
  setUserEmergencyKeyword,
  setFamilyPlanUsers,
  setChildAccounts,
  setIntegrationSettingsToggle,
  setIntegrationSettings,
  setProfile,
  setChildSettingsToggle,
  setAddChildSettingsToggle,
  resetUser,
  setGoogleAssistantWalkthrough,
} = userReducer.actions;

export default userReducer.reducer;
