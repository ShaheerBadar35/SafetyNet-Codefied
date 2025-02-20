import ChevronNaivgation from '@components/chevronNavigation';
import {useSafeArea} from '@components/safeAreaInsets';
import SettingsHeader from '@components/settingsHeader';
import ToggleOption from '@components/toggleOption';
import Wrapper from '@components/wrapper';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {navigate} from '@services/NavService';
import {COLORS} from '@theme/colors';
import {RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {isChildACcount, isSinglePlanUser} from '@utils/helper';
import {ROUTES} from '@utils/routes';
import React, {useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  handleCall911Toggle,
  handleEmergencyKeywordToggle,
  handleGestureEmergencyAlertsToggle,
  handleThemeToggle,
} from './helper';
import FeatureUnavailableModal from '@components/featureUnavailableModal';
import CustomFooter from '@components/customFooter';

const Settings = () => {
  const {user} = useSelector((state: any) => state.root.user);
  const dispatch: any = useDispatch();
  const insets: any = useSafeArea();
  const tabBarHeight: any = useBottomTabBarHeight();

  const [toggleEmergencyKeyword, setToggleEmergencyKeyword] = useState(
    user?.handle_emergency_keyword || false,
  );
  const [toggleTheme, setToggleTheme] = useState(user?.theme || false);
  const [toggleCall911, setToggleCall911] = useState(user?.call_911 || false);
  const [toggleGestureEmergencyKeyword, setToggleGestureEmergencyKeyword] =
    useState(user?.gesture_emergency_alerts || false);
  const [disabled, setDisabled] = useState(isChildACcount(user));
  const [showFeatureUnavailableModal, setShowFeatureUnavailableModal] =
    useState(false);
  const TOGGLE_DATA = [
    {
      id: 1,
      title: 'Emergency Keywords',
      subTitle: 'Turning this off will cause the app to not work.',
      value: toggleEmergencyKeyword,
      onPress: () => {
        handleEmergencyKeywordToggle(
          !toggleEmergencyKeyword,
          user?.email,
          dispatch,
        );
        setToggleEmergencyKeyword(() => !toggleEmergencyKeyword);
      },
    },
    // {
    //   id: 2,
    //   title: 'Dark/Light Theme',
    //   subTitle: 'Toggle between dark and light theme.',
    //   value: toggleTheme,
    //   onPress: () => {
    //     handleThemeToggle(!toggleTheme, user?.email, dispatch);
    //     setToggleTheme(() => !toggleTheme);
    //   },
    // },
    {
      id: 3,
      title: 'Call 911',
      subTitle: 'Call 911 when you face an emergency.',
      value: toggleCall911,
      onPress: () => {
        handleCall911Toggle(!toggleCall911, user?.email, dispatch);
        setToggleCall911(() => !toggleCall911);
      },
    },
    {
      id: 4,
      title: 'Gesture Emergency Alerts',
      subTitle:
        'When the screen state is changed three times it triggers emergency alerts.',
      value: toggleGestureEmergencyKeyword,
      onPress: () => {
        handleGestureEmergencyAlertsToggle(
          !toggleGestureEmergencyKeyword,
          user?.email,
          dispatch,
        );
        setToggleGestureEmergencyKeyword(() => !toggleGestureEmergencyKeyword);
      },
    },
  ];

  return (
    <Wrapper barStyle="dark-content" noPaddingTop noPaddingBottom>
      <SettingsHeader />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {paddingBottom: insets?.bottom + tabBarHeight + RF(12)},
        ]}>
        <FlatList
          keyExtractor={(item: any) => item?.id}
          data={TOGGLE_DATA}
          renderItem={({item, index}: any) => (
            <ToggleOption
              title={item?.title}
              subTitle={item?.subTitle}
              selected={item?.value}
              containerStyle={{...SPACING.mb8}}
              disabled={disabled}
              onPress={item?.onPress && item?.onPress}
            />
          )}
          ListFooterComponent={
            <View>
              <ChevronNaivgation
                title="Child Settigs"
                onPress={() => {
                  if (disabled || isSinglePlanUser(user))
                    setShowFeatureUnavailableModal(true);
                  !isSinglePlanUser(user) && navigate(ROUTES.CHILD_SETTINGS);
                }}
              />
              <ChevronNaivgation
                title="Integration Settigs"
                containerStyle={{...SPACING.mt8}}
                onPress={() => {
                  if (disabled) setShowFeatureUnavailableModal(true);
                  else navigate(ROUTES.INTEGRATION_SETTINGS);
                }}
              />
            </View>
          }
          contentContainerStyle={[{flex: 1}, disabled && {opacity: 0.4}]}
        />
        <CustomFooter
          fontColor={COLORS.LIGHT_GRAY_05}
          containerStyle={{bottom: -RF(24), ...SPACING.mt3}}
        />
      </ScrollView>
      <FeatureUnavailableModal
        open={showFeatureUnavailableModal}
        isChild={user?.is_child_account || false}
        onPressClose={() => setShowFeatureUnavailableModal(false)}
        onPressBtn={() => {
          setShowFeatureUnavailableModal(false);
          setTimeout(() => {
            navigate(ROUTES.Plan_STACK);
          }, 1000);
        }}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -RF(10),
    paddingHorizontal: WP(8),
    borderTopLeftRadius: RF(7),
    borderTopRightRadius: RF(7),
    ...SPACING.pt12,
    backgroundColor: COLORS.DARK_GRAY_04,
  },
});

export default Settings;
