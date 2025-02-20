import CustomButton from '@components/customButton';
import {useSafeArea} from '@components/safeAreaInsets';
import SpecificChildSettingsHeader from '@components/specificChildSettingsHeader';
import ToggleOption from '@components/toggleOption';
import Wrapper from '@components/wrapper';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Geofencing from './components/Geofencing';
import {
  addEmergencyKeyword,
  handleCall911Toggle,
  handleChildChangePassword,
  handleDeleteChild,
  handleGeofencingToggle,
  handleGestureEmergencyToggle,
  updateFamilyChildName,
} from './helper';
import EmergencyKeyword from '@components/emergencyKeyword';
import {CHILD_ACCOUNT_DOMAIN} from '@utils/constants';
import ConfirmRemovalModal from '@components/confirmRemovalModal';
import EditNameModal from '@components/editNameModal';
import SuccessModal from '@components/successModal';
import {ICONS} from '@assets';
import {navigationRef} from '@services/NavService';
import CustomFooter from '@components/customFooter';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<{
    params: {
      child?: any;
    } | undefined;
  }>;
}

const SpecificChildSettings = ({route, navigation}: Props) => {
  const {child} = route?.params || {};
  const {user} = useSelector((state: any) => state.root.user);
  const [childname, setChildname] = useState(child?.name || '');
  const [emergencyKeyword, setEmergencyKeyword] = useState(
    child?.child_emergency_keyword || '',
  );
  const [toggleGeofencing, setToggleGeofencing] = useState(
    child?.handle_geofencing || false,
  );
  const [toggleCall911, setToggleCall911] = useState(child?.call_911 || false);
  const [toggleGestureEmergencyAlerts, setToggleGestureEmergencyAlerts] =
    useState(child?.gesture_emergency_alerts || false);
  const [geofencingTimer, setGeofencingTimer] = useState(
    child?.geofencing_settings?.timer || '',
  );
  const [safezone, setSafezone] = useState(
    child?.geofencing_settings?.safe_zone || '',
  );
  const [loading, setLoading] = useState(false);
  const [showRemovalModal, setShowRemovalModal] = useState(false);
  const [isShowRemovalModalBtnLoading, setIsShowRemovalBtnLoading] =
    useState(false);
  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [isEditNameBtnLoading, setIsEditNameBtnLoading] = useState(false);
  const [showRemovedModal, setShowRemovedModal] = useState(false);
  const insets: any = useSafeArea();
  const tabBarHeight: any = useBottomTabBarHeight();
  const dispatch: any = useDispatch();

  const TOGGLE_DATA = [
    {
      id: 1,
      title: 'Geofencing Settings',
      subTitle: 'Edit location settings for your child.',
      selected: toggleGeofencing,
      onPress: async () => {
        LayoutAnimation.linear();
        handleGeofencingToggle(
          user?.email,
          child?.username,
          !toggleGeofencing,
          dispatch,
        );
        setToggleGeofencing(!toggleGeofencing);
      },
    },
    {
      id: 2,
      title: 'Call 911',
      subTitle: 'Call 911 when you face an emergency.',
      selected: toggleCall911,
      onPress: () => {
        handleCall911Toggle(
          user?.email,
          child?.username,
          !toggleCall911,
          dispatch,
        );
        setToggleCall911(!toggleCall911);
      },
    },
    {
      id: 3,
      title: 'Gesture Emergency Alerts',
      subTitle:
        'When the screen state is changed three times it triggers emergency alerts.',
      selected: toggleGestureEmergencyAlerts,
      onPress: () => {
        handleGestureEmergencyToggle(
          user?.email,
          child?.username,
          !toggleGestureEmergencyAlerts,
          dispatch,
        );
        setToggleGestureEmergencyAlerts(!toggleGestureEmergencyAlerts);
      },
    },
  ];

  useEffect(() => {
    if (showRemovedModal) {
      setTimeout(() => {
        setShowRemovedModal(false);
        navigationRef?.current?.goBack();
      }, 3000);
    }
  }, [showRemovedModal]);

  useEffect(() => {
    if (
      (child?.child_emergency_keyword != 'undefined' &&
        child?.child_emergency_keyword != emergencyKeyword) ||
      (child?.child_emergency_keyword == 'undefined' &&
        emergencyKeyword?.length > 0)
    ) {
      const params: any = {
        email: user?.email,
        username: child?.username,
        child_emergency_keyword: emergencyKeyword,
        child_account_domain: CHILD_ACCOUNT_DOMAIN,
      };
      addEmergencyKeyword(params, dispatch);
    }
  }, [emergencyKeyword]);

  return (
    <Wrapper barStyle="dark-content" noPaddingTop noPaddingBottom>
      <SpecificChildSettingsHeader
        name={childname}
        setShowEditModal={setShowEditNameModal}
        onPressChangePassword={async () =>
          handleChildChangePassword(user?.email, child?.username)
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
                selected={item?.selected}
                onPress={item?.onPress}
                containerStyle={{...SPACING.mb8}}
              />
              {index == 0 && item?.selected && (
                <Geofencing
                  child={child}
                  timer={geofencingTimer}
                  setTimer={setGeofencingTimer}
                  safezone={safezone}
                  setSafeZone={setSafezone}
                />
              )}
            </>
          )}
          ListHeaderComponent={
            <EmergencyKeyword
              text={emergencyKeyword}
              setText={setEmergencyKeyword}
              inputDisbabledTextColor={COLORS.LIGHT_GRAY_04}
              inputDisabledColor={COLORS.DARK_GRAY_04}
              descriptionTextColor={COLORS.DARK_GRAY}
              containerStyle={{
                backgroundColor: COLORS.LIGHT_BLACK_4,
                ...SPACING.mb8,
              }}
            />
          }
          ListFooterComponent={
            <View style={{alignItems: 'center', ...SPACING.mt15}}>
              <CustomButton
                isloading={loading}
                title="Remove child"
                titleSize={18}
                titleFontFamily={INTER.BOLD}
                titleColor={COLORS.LIGHT_GARY_03}
                titleStyle={{lineHeight: RF(22)}}
                bgColor={COLORS.WARNING_100}
                customStyle={{...SPACING.py1, ...SPACING.px6}}
                onPress={() => setShowRemovalModal(true)}
              />
            </View>
          }
        />
        <ConfirmRemovalModal
          open={showRemovalModal}
          desc={'Are you sure you want to remove this chlld from your plan?'}
          btnLoading={isShowRemovalModalBtnLoading}
          onPressClose={() => setShowRemovalModal(false)}
          onPressBtn={() =>
            handleDeleteChild(
              user?.email,
              child?.username,
              dispatch,
              setIsShowRemovalBtnLoading,
              setShowRemovalModal,
              setShowRemovedModal,
            )
          }
        />
        <SuccessModal
          title={'Child removed'}
          icon={ICONS.REMOVED}
          open={showRemovedModal}
        />
        <EditNameModal
          open={showEditNameModal}
          name={childname}
          isBtnLoading={isEditNameBtnLoading}
          onPressClose={() => setShowEditNameModal(false)}
          onPressBtn={(name: any) =>
            updateFamilyChildName(
              user?.email,
              child?.username,
              name,
              setChildname,
              setIsEditNameBtnLoading,
              setShowEditNameModal,
              dispatch,
            )
          }
        />
        <CustomFooter
          fontColor={COLORS.LIGHT_GRAY_05}
          containerStyle={{bottom: -RF(12), ...SPACING.mt3}}
        />
      </ScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: HP(70),
    paddingHorizontal: WP(8),
    ...SPACING.pt8,
    backgroundColor: COLORS.DARK_GRAY_04,
  },
});

export default SpecificChildSettings;
