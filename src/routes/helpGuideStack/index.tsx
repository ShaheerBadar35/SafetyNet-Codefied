import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import HelpGuide from '@screens/helpGuide';
import {ROUTES} from '@utils/routes';
import React from 'react';
const Stack = createStackNavigator();

const HelpGuideStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName={ROUTES.HELP_GUIDE}>
      <Stack.Screen name={ROUTES.HELP_GUIDE} component={HelpGuide} />
    </Stack.Navigator>
  );
};

export default HelpGuideStack;
