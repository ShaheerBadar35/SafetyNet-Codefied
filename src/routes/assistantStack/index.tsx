import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Introduction from '@screens/assistant/introduction';
import Screen from '@screens/assistant/screen';
import Settings from '@screens/assistant/settings';
import Testing from '@screens/assistant/testing';
import Voice from '@screens/assistant/voice';
import ForgotPassword from '@screens/forgotPassword';
import Login from '@screens/login';
import PrivacyPolicy from '@screens/privacyPolicy';
import SelectPlan from '@screens/selectPlan';
import SignupStep1 from '@screens/signupStep1';
import SignupStep2 from '@screens/signupStep2';
import TermsAndConditions from '@screens/termsAndConditions';
import Verification from '@screens/verification';
import {ROUTES} from '@utils/routes';
import React from 'react';
const Stack = createStackNavigator();

const AssistantStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName={ROUTES.ASSISTANT_INTRODUCTION}>
      <Stack.Screen
        name={ROUTES.ASSISTANT_INTRODUCTION}
        component={Introduction}
      />
      <Stack.Screen name={ROUTES.ASSISTANT_SETTINGS} component={Settings} />
      <Stack.Screen name={ROUTES.ASSISTANT_VOICE} component={Voice} />
      <Stack.Screen name={ROUTES.ASSISTANT_SCREEN} component={Screen} />
      <Stack.Screen name={ROUTES.ASSISTANT_TESTING} component={Testing} />
    </Stack.Navigator>
  );
};

export default AssistantStack;
