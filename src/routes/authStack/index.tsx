import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
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

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.SIGNUP_STEP_1} component={SignupStep1} />
      <Stack.Screen name={ROUTES.SIGNUP_STEP_2} component={SignupStep2} />
      <Stack.Screen name={ROUTES.SELECT_PLAN} component={SelectPlan} />
      <Stack.Screen name={ROUTES.VERIFICATION} component={Verification} />
      <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
      <Stack.Screen name={ROUTES.PRIVACY_POLICY} component={PrivacyPolicy} />
      <Stack.Screen
        name={ROUTES.TERMS_AND_CONDITIONS}
        component={TermsAndConditions}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
