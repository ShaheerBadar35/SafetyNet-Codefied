// import {ICONS} from '@assets';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import ContactUsStack from '@routes/contactUsStack';
// import HelpGuideStack from '@routes/helpGuideStack';
// import {ModalContext} from '@routes/mainStack';
// import PlanStack from '@routes/planStack';
// import ProfileStack from '@routes/profileStack';
// import {COLORS} from '@theme/colors';
// import {INTER} from '@theme/fonts';
// import {RF, RFT, WP} from '@theme/responsive';
// import {SPACING} from '@theme/spacing';
// import {TABS} from '@utils/constants';
// import {ROUTES} from '@utils/routes';
// import React, {useContext} from 'react';
// import {StyleSheet, View} from 'react-native';
// import FastImage from 'react-native-fast-image';

// const {PRIMARY, BLACK} = COLORS;

// const Tab = createBottomTabNavigator();
// interface CustomHomeTabBarButtonProps {
//   index: number;
//   focused: boolean;
//   activeSource: string;
//   disableSource: string;
//   tabBarLabel: string;
// }

// const CustomHomeTabBarButton: React.FC<CustomHomeTabBarButtonProps> = ({
//   index = 0,
//   focused,
//   activeSource,
//   disableSource,
//   tabBarLabel,
// }: any) => (
//   <View
//     style={[
//       {
//         flex: 1,
//         width: WP(20),
//         alignSelf: 'center',
//         justifyContent: 'center',
//         ...SPACING.my4,
//       },
//       index < 5 && {borderRightWidth: RF(1), borderRightColor: COLORS.WHITE},
//     ]}>
//     <FastImage
//       style={[styles.homeImage, {alignSelf: 'center'}]}
//       source={focused ? activeSource : disableSource}
//     />
//   </View>
// );

// const BottomTabs: React.FC = () => {
//   const tabs = TABS;
//   const context = useContext(ModalContext);
//   const {showSettingsModal, setShowSettingsModal}: any = context;
//   return (
//     <Tab.Navigator
//       initialRouteName={ROUTES.Jobs_STACK}
//       screenOptions={({route: {name}}) => ({
//         tabBarShowLabel: false,
//         tabBarStyle: styles.tabBarStyle,
//         headerShown: false,
//         tabBarLabelStyle: {fontSize: RFT(10), fontFamily: INTER.MEDIUM},
//         tabBarActiveTintColor: PRIMARY,
//         // tabBarInactiveTintColor: GRAY_99,
//         tabBarHideOnKeyboard: true,
//       })}>
//       {tabs.map((tab: any) => {
//         return tab == 'Settings' ? (
//           <Tab.Screen
//             key={tab}
//             name={ROUTES[`${tab}_STACK`]}
//             component={getComponentForTab(tab)}
//             options={getTabs(tab)}
//             listeners={{
//               tabPress: e => {
//                 setShowSettingsModal && setShowSettingsModal(true);
//                 e.preventDefault();
//               },
//             }}
//           />
//         ) : (
//           <Tab.Screen
//             key={tab}
//             name={ROUTES[`${tab}_STACK`]}
//             component={getComponentForTab(tab)}
//             options={getTabs(tab)}
//           />
//         );
//       })}
//     </Tab.Navigator>
//   );
// };

// const getComponentForTab = (tab: string) => {
//   const components: {[key: string]: React.ComponentType} = {
//     Profile: ProfileStack,
//     HelpGuide: HelpGuideStack,
//     Plan: PlanStack,
//     ContactUs: ContactUsStack,
//     Settings: SettingsTab,
//     // Logout: LogoutStack,
//   };
//   return components[tab];
// };

// const getTabs = (tab: string) => {
//   const screenOptions: any = {
//     Profile: {
//       tabBarIcon: ({focused}: any) => (
//         <CustomHomeTabBarButton
//           index={1}
//           focused={focused}
//           activeSource={ICONS.PROFILE_ACTIVE}
//           disableSource={ICONS.PROFILE}
//           tabBarLabel={'Profile'}
//         />
//       ),
//     },
//     HelpGuide: {
//       tabBarIcon: ({focused}: any) => (
//         <CustomHomeTabBarButton
//           index={2}
//           focused={focused}
//           activeSource={ICONS.HELP_GUIDE_ACTIVE}
//           disableSource={ICONS.HELP_GUIDE}
//           tabBarLabel={'Help Guide'}
//         />
//       ),
//     },
//     Plan: {
//       tabBarIcon: ({focused}: any) => (
//         <CustomHomeTabBarButton
//           index={3}
//           focused={focused}
//           activeSource={ICONS.PLAN_ACTIVE}
//           disableSource={ICONS.PLAN}
//           tabBarLabel={'Plan'}
//         />
//       ),
//     },
//     ContactUs: {
//       tabBarIcon: ({focused}: any) => (
//         <CustomHomeTabBarButton
//           index={4}
//           focused={focused}
//           activeSource={ICONS.CONTACT_US_ACTIVE}
//           disableSource={ICONS.CONTACT_US}
//           tabBarLabel={'Contact Us'}
//         />
//       ),
//     },
//     Settings: {
//       tabBarIcon: ({focused}: any) => (
//         <CustomHomeTabBarButton
//           index={5}
//           focused={focused}
//           activeSource={ICONS.SETTINGS_INACTIVE}
//           disableSource={ICONS.SETTINGS_INACTIVE}
//           tabBarLabel={'Settings'}
//         />
//       ),
//     },
//     // Logout: {
//     //   tabBarIcon: ({focused}: any) => (
//     //     <CustomHomeTabBarButton
//     //       index={5}
//     //       focused={focused}
//     //       activeSource={ICONS.LOGOUT_ACTIVE}
//     //       disableSource={ICONS.LOGOUT}
//     //       tabBarLabel={'Logout'}
//     //     />
//     //   ),
//     // },
//   };
//   return screenOptions[tab];
// };

// const SettingsTab = () => {
//   return <View></View>;
// };

// const styles = StyleSheet.create({
//   tabBarStyle: {
//     height: RF(85),
//     backgroundColor: COLORS.DARK_GRAY_02,
//     borderTopRightRadius: RF(10),
//     borderTopLeftRadius: RF(10),
//     borderTopWidth: 0,
//     shadowColor: BLACK,
//     shadowOpacity: 0.08,
//     position: 'absolute',
//   },
//   homeImage: {
//     width: RF(29),
//     height: RF(30),
//   },
//   px2: {
//     paddingHorizontal: RF(2),
//   },
// });

// export default BottomTabs;


import {ICONS} from '@assets';
import SettingsScreen from '@components/settingsModal';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ContactUsStack from '@routes/contactUsStack';
import HelpGuideStack from '@routes/helpGuideStack';
import {ModalContext} from '@routes/mainStack';
import PlanStack from '@routes/planStack';
import ProfileStack from '@routes/profileStack';
import { navigate } from '@services/NavService';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF, RFT, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {TABS} from '@utils/constants';
import {ROUTES} from '@utils/routes';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

const {PRIMARY, BLACK} = COLORS;

const Tab = createBottomTabNavigator();
interface CustomHomeTabBarButtonProps {
  index: number;
  focused: boolean;
  activeSource: string;
  disableSource: string;
  tabBarLabel: string;
}

const CustomHomeTabBarButton: React.FC<CustomHomeTabBarButtonProps> = ({
  index = 0,
  focused,
  activeSource,
  disableSource,
  tabBarLabel,
}: any) => (
  <View
    style={[
      {
        flex: 1,
        width: WP(20),
        alignSelf: 'center',
        justifyContent: 'center',
        ...SPACING.my4,
      },
      index < 5 && {borderRightWidth: RF(1), borderRightColor: COLORS.WHITE},
    ]}>
    <FastImage
      style={[styles.homeImage, {alignSelf: 'center'}]}
      source={focused ? activeSource : disableSource}
    />
  </View>
);

const BottomTabs: React.FC = () => {
  const tabs = TABS;
  const context = useContext(ModalContext);
  const {showSettingsModal, setShowSettingsModal}: any = context;
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.Jobs_STACK}
      screenOptions={({route: {name}}) => ({
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
        tabBarLabelStyle: {fontSize: RFT(10), fontFamily: INTER.MEDIUM},
        tabBarActiveTintColor: PRIMARY,
        // tabBarInactiveTintColor: GRAY_99,
        tabBarHideOnKeyboard: true,
      })}>
      {tabs.map((tab: any) => {
        return tab == 'Settings' ? (
<Tab.Screen
  key={tab}
  name={ROUTES.SETTINGS_STACK} // Use the defined route constant
  component={SettingsScreen} // Directly use the SettingsScreen component
  options={{
    tabBarIcon: ({focused}: any) => (
      <CustomHomeTabBarButton
        index={5}
        focused={focused}
        activeSource={ICONS.SETTINGS_INACTIVE}
        disableSource={ICONS.SETTINGS_INACTIVE}
        tabBarLabel={'Settings'}
      />
    ),
  }}
/>
        ) : (
          <Tab.Screen
            key={tab}
            name={ROUTES[`${tab}_STACK`]}
            component={getComponentForTab(tab)}
            options={getTabs(tab)}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const getComponentForTab = (tab: string) => {
  const components: {[key: string]: React.ComponentType} = {
    Profile: ProfileStack,
    HelpGuide: HelpGuideStack,
    Plan: PlanStack,
    ContactUs: ContactUsStack,
    Settings: SettingsScreen, // Use the actual SettingsScreen component
  };
  return components[tab];
};

const getTabs = (tab: string) => {
  const screenOptions: any = {
    Profile: {
      tabBarIcon: ({focused}: any) => (
        <CustomHomeTabBarButton
          index={1}
          focused={focused}
          activeSource={ICONS.PROFILE_ACTIVE}
          disableSource={ICONS.PROFILE}
          tabBarLabel={'Profile'}
        />
      ),
    },
    HelpGuide: {
      tabBarIcon: ({focused}: any) => (
        <CustomHomeTabBarButton
          index={2}
          focused={focused}
          activeSource={ICONS.HELP_GUIDE_ACTIVE}
          disableSource={ICONS.HELP_GUIDE}
          tabBarLabel={'Help Guide'}
        />
      ),
    },
    Plan: {
      tabBarIcon: ({focused}: any) => (
        <CustomHomeTabBarButton
          index={3}
          focused={focused}
          activeSource={ICONS.PLAN_ACTIVE}
          disableSource={ICONS.PLAN}
          tabBarLabel={'Plan'}
        />
      ),
    },
    ContactUs: {
      tabBarIcon: ({focused}: any) => (
        <CustomHomeTabBarButton
          index={4}
          focused={focused}
          activeSource={ICONS.CONTACT_US_ACTIVE}
          disableSource={ICONS.CONTACT_US}
          tabBarLabel={'Contact Us'}
        />
      ),
    },
    Settings: {
      tabBarIcon: ({focused}: any) => (
        <CustomHomeTabBarButton
          index={5}
          focused={focused}
          activeSource={ICONS.SETTINGS_INACTIVE}
          disableSource={ICONS.SETTINGS_INACTIVE}
          tabBarLabel={'Settings'}
        />
      ),
    },
    // Logout: {
    //   tabBarIcon: ({focused}: any) => (
    //     <CustomHomeTabBarButton
    //       index={5}
    //       focused={focused}
    //       activeSource={ICONS.LOGOUT_ACTIVE}
    //       disableSource={ICONS.LOGOUT}
    //       tabBarLabel={'Logout'}
    //     />
    //   ),
    // },
  };
  return screenOptions[tab];
};

const SettingsTab = () => {
  return <View></View>;
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: RF(85),
    backgroundColor: COLORS.DARK_GRAY_02,
    borderTopRightRadius: RF(10),
    borderTopLeftRadius: RF(10),
    borderTopWidth: 0,
    shadowColor: BLACK,
    shadowOpacity: 0.08,
    position: 'absolute',
  },
  homeImage: {
    width: RF(29),
    height: RF(30),
  },
  px2: {
    paddingHorizontal: RF(2),
  },
});

export default BottomTabs;
