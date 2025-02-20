import {ICONS} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import LogoutModal from '@components/logoutModal';
import {navigate} from '@services/NavService';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {ROUTES} from '@utils/routes';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {handleLogout, hitChildLogoutNotificationAPI} from './helper';
import SuccessModal from '@components/successModal';
import {isChildACcount} from '@utils/helper';

const DROPDOWN_DATA: any = [
  {
    id: 1,
    icon: ICONS.EDIT2,
    title: 'Edit Profile',
    onPress: () => navigate(ROUTES.EDIT_PROFILE),
  },
  {
    id: 2,
    icon: ICONS.SETTINGS,
    title: 'Settings',
    onPress: () => navigate(ROUTES.SETTINGS),
  },
  {
    id: 3,
    icon: ICONS.LOGOUT,
    title: 'Logout',
    onPress: () => {},
  },
];

interface ProfileDropDownProps {
  profile?: any;
}

const ProfileDropDown = (props: Partial<ProfileDropDownProps>) => {
  const {profile} = props;
  const {user} = useSelector((state: any) => state.root.user);
  const dispatch: any = useDispatch();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLogginOutModal, setShowLoggingOutModal] = useState(false);

  useEffect(() => {
    if (showLogginOutModal) {
      if (isChildACcount(user)) {
        hitChildLogoutNotificationAPI({
          email: user?.created_by_user?.email,
          username: user?.email?.split('@')?.[0],
        });
      }
      setTimeout(() => {
        setShowLoggingOutModal(false);
        handleLogout(dispatch);
      }, 3000);
    }
  }, [showLogginOutModal]);

  return (
    <>
      <SelectDropdown
        showsVerticalScrollIndicator={false}
        data={DROPDOWN_DATA}
        dropdownStyle={{
          position: 'absolute',
          borderRadius: RF(5),
          ...SPACING.p1,
          maxWidth: WP(100),
        }}
        rowStyle={styles.dropdownRowStyle}
        renderCustomizedButtonChild={(value: any) => (
          <CustomIcon
            path={profile ? {uri: profile} : ICONS.DUMMY_PROFILE}
            resizeMode="cover"
            customStyle={styles.profile}
            containerStyle={styles.profileCon}
          />
        )}
        renderCustomizedRowChild={(item, index) => {
          return (
            <View style={styles.row}>
              <CustomIcon
                path={item?.icon}
                resizeMode="cover"
                tintColor={COLORS.LIGHT_BLACK}
                containerStyle={styles.iconCon}
              />
              <CustomText
                size={10}
                fontFamily={INTER.REGULAR}
                color={COLORS.LIGHT_BLACK}
                style={{lineHeight: RF(16)}}>
                {item?.title}
              </CustomText>
            </View>
          );
        }}
        onSelect={(selectedItem, index) => {
          if (selectedItem?.title == 'Logout') setShowLogoutModal(true);
          else selectedItem?.onPress();
        }}
      />
      <LogoutModal
        open={showLogoutModal}
        onPressClose={() => setShowLogoutModal(false)}
        onPressBtn={() => setShowLoggingOutModal(true)}
        // onPressBtn={() => handleLogout(dispatch)}
      />
      <SuccessModal
        title={'Logging you out'}
        icon={ICONS.LOGGING_OUT}
        open={showLogginOutModal}
        onPressClose={() => {
          setShowLogoutModal(false);
          setTimeout(() => {
            setShowLoggingOutModal(false);
          }, 500);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  profile: {
    height: RF(57),
    width: RF(57),
    borderRadius: RF(57 / 2),
  },
  profileCon: {
    height: RF(57),
    width: RF(57),
  },
  dropDownIcon: {
    width: RF(24),
    height: RF(24),
  },
  dropDownIconContainer: {
    width: RF(24),
    height: RF(24),
    marginTop: 100,
  },
  dropdownRowStyle: {
    alignSelf: 'flex-end',
    borderBottomColor: COLORS.LIGHT_BLACK,
    ...SPACING.pl2,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconCon: {
    height: RF(15),
    width: RF(15),
    ...SPACING.mr1,
  },
});

export default ProfileDropDown;
