import IntegrationSettingsHeader from '@components/integrationsSettingsHeader';
import ToggleOption from '@components/toggleOption';
import Wrapper from '@components/wrapper';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS} from '@theme/colors';
import {HP, RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React, {useState} from 'react';
import {FlatList, LayoutAnimation, ScrollView, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HeartBeatMonitoring from './components/HeartBeatMonitorting';
import {useDispatch, useSelector} from 'react-redux';
import {
  handleIntegrationCall911Toggle,
  handleIntegrationGestureEmergencyAlertsToggle,
  handleIntegrationHeartbeatMonitoringToggle,
  handleIntegrationToggle,
} from './helper';
import CustomFooter from '@components/customFooter';

const IntegrationSettings = () => {
  const {user} = useSelector((state: any) => state.root.user);
  const [selected, setSelected] = useState(
    user?.handle_integration_settings || false,
  );
  const [toggleHeartBeatMonitoring, setToggleHeartBeatMonitoring] = useState(
    user?.integration_settings?.handle_heartbeat_monitoring || false,
  );
  const [toggleCall911, setToggleCall911] = useState(
    user?.integration_settings?.handle_call_911 || false,
  );
  const [toggleGestureEmergencyAlerts, setToggleGestureEmergencyAlerts] =
    useState(
      user?.integration_settings?.handle_gesture_emergency_alerts || false,
    );
  const insets: any = useSafeAreaInsets();
  const tabBarHeight: any = useBottomTabBarHeight();
  const dispatch: any = useDispatch();

  const TOGGLE_DATA = [
    {
      id: 1,
      title: 'Heartbeat Monitoring',
      subTitle: 'Select mode of monitoring.',
      value: toggleHeartBeatMonitoring,
      onPress: () => {
        LayoutAnimation.linear();
        handleIntegrationHeartbeatMonitoringToggle(
          user?.email,
          !toggleHeartBeatMonitoring,
          dispatch,
        );
        setToggleHeartBeatMonitoring(!toggleHeartBeatMonitoring);
      },
    },
    {
      id: 2,
      title: 'Call 911',
      subTitle: 'Call 911 when you face an emergency.',
      value: toggleCall911,
      onPress: () => {
        handleIntegrationCall911Toggle(user?.email, !toggleCall911, dispatch);
        setToggleCall911(!toggleCall911);
      },
    },
    // {
    //   id: 3,
    //   title: 'Gesture Emergency Alerts',
    //   subTitle:
    //     'When the volume down button is pressed down three times it triggers emergency alerts.',
    //   value: toggleGestureEmergencyAlerts,
    //   onPress: () => {
    //     handleIntegrationGestureEmergencyAlertsToggle(
    //       user?.email,
    //       !toggleGestureEmergencyAlerts,
    //       dispatch,
    //     );
    //     setToggleGestureEmergencyAlerts(!toggleGestureEmergencyAlerts);
    //   },
    // },
  ];

  return (
    <Wrapper barStyle="dark-content" noPaddingTop noPaddingBottom>
      <IntegrationSettingsHeader
        selected={selected}
        setSelected={setSelected}
        onPressSelected={() =>
          handleIntegrationToggle(user?.email, !selected, dispatch)
        }
      />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {paddingBottom: insets?.bottom + tabBarHeight + RF(12)},
        ]}>
        <FlatList
          keyExtractor={(item: any) => item?.id}
          data={TOGGLE_DATA}
          renderItem={({item, index}: any) => (
            <>
              <ToggleOption
                title={item?.title}
                subTitle={item?.subTitle}
                selected={item?.value}
                containerStyle={
                  index == 0 && toggleHeartBeatMonitoring
                    ? {...SPACING.mb0}
                    : {...SPACING.mb8}
                }
                disabled={!selected}
                onPress={item?.onPress && item?.onPress}
              />
              {index == 0 && toggleHeartBeatMonitoring && (
                <HeartBeatMonitoring
                  disabled={!selected}
                  containerStyle={{...SPACING.my4}}
                />
              )}
            </>
          )}
          contentContainerStyle={[{flex: 1}, !selected && {opacity: 0.4}]}
        />
        <CustomFooter
          fontColor={COLORS.LIGHT_GRAY_05}
          containerStyle={{bottom: -RF(12)}}
        />
      </ScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: HP(70),
    marginTop: -RF(10),
    paddingHorizontal: WP(8),
    borderTopLeftRadius: RF(7),
    borderTopRightRadius: RF(7),
    ...SPACING.pt12,
    backgroundColor: COLORS.DARK_GRAY_04,
  },
});

export default IntegrationSettings;
