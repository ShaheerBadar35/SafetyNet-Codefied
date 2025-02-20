import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import ContactUs from '@screens/contactUs';
import {ROUTES} from '@utils/routes';
import React from 'react';
const Stack = createStackNavigator();

const ContactUsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName={ROUTES.CONTACT_US}>
      <Stack.Screen name={ROUTES.CONTACT_US} component={ContactUs} />
    </Stack.Navigator>
  );
};

export default ContactUsStack;
