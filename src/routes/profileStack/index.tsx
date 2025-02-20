import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {ROUTES} from '@utils/routes';
import Profile from '@screens/profile';
import EditProfile from '@screens/editProfile';
import Settings from '@screens/settings';
import ChildSettings from '@screens/childSettings';
import AddChild from '@screens/addChild';
import SpecificChildSettings from '@screens/specificChildSettings';
import AddSafeLocation from '@screens/addSafeLocation';
import IntegrationSettings from '@screens/integrationSettings';
import ChangePassword from '@screens/changePassword';
import EditUsers from '@screens/editUsers';
const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName={ROUTES.PROFILE}>
      <Stack.Screen name={ROUTES.PROFILE} component={Profile} />
      <Stack.Screen name={ROUTES.EDIT_PROFILE} component={EditProfile} />
      <Stack.Screen name={ROUTES.SETTINGS} component={Settings} />
      <Stack.Screen name={ROUTES.CHILD_SETTINGS} component={ChildSettings} />
      <Stack.Screen name={ROUTES.ADD_CHILD} component={AddChild} />
      <Stack.Screen
        name={ROUTES.SPECIFIC_CHILD_SETTINGS}
        component={SpecificChildSettings}
      />
      <Stack.Screen
        name={ROUTES.ADD_SAFE_LOCATION}
        component={AddSafeLocation}
      />
      <Stack.Screen
        name={ROUTES.INTEGRATION_SETTINGS}
        component={IntegrationSettings}
      />
      <Stack.Screen name={ROUTES.CHANGE_PASSWORD} component={ChangePassword} />
      <Stack.Screen name={ROUTES.EDIT_USERS} component={EditUsers} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
