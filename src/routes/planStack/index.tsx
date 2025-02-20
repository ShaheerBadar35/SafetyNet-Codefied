import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {ROUTES} from '@utils/routes';
import Plan from '@screens/plan';
import EditUsers from '@screens/editUsers';
const Stack = createStackNavigator();

const PlanStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName={ROUTES.PLAN}>
      <Stack.Screen name={ROUTES.PLAN} component={Plan} />
      {/* <Stack.Screen name={ROUTES.EDIT_USERS} component={EditUsers} /> */}
    </Stack.Navigator>
  );
};

export default PlanStack;
