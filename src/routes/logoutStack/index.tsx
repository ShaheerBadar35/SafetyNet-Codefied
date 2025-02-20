import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {ROUTES} from '@utils/routes';
import Logout from '@screens/logOut';
const Stack = createStackNavigator();

const LogoutStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName={ROUTES.LOGOUT}>
      <Stack.Screen name={ROUTES.LOGOUT} component={Logout} />
    </Stack.Navigator>
  );
};

export default LogoutStack;
