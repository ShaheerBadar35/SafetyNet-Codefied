import CustomText from '@components/customText';
import ProfileDropDown from '@components/profileDropDown';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF, WP} from '@theme/responsive';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface ProfileHeaderProps {
  title?: string;
  profile?: any;
}

const ProfileHeader = (props: Partial<ProfileHeaderProps>) => {
  const {title = '', profile = ''} = props;
  return (
    <View style={styles.container}>
      <CustomText
        size={24}
        fontFamily={INTER.BOLD}
        color={COLORS.LIGHT_BLACK}
        style={styles.text}
        numberOfLines={2}>
        Welcome{title && ','}
        {title && `${'\n'}${title}`}
      </CustomText>
      <View style={styles.triangle} />
      <View style={styles.dropDownCon}>
        <ProfileDropDown profile={profile} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HP(22),
    width: '100%',
    paddingHorizontal: WP(8),
    overflow: 'hidden',
    backgroundColor: COLORS.LIGHT_GRAY_04,
  },
  text: {
    position: 'absolute',
    bottom: RF(28),
    left: WP(8),
    lineHeight: RF(31),
    maxWidth: '50%',
  },
  triangle: {
    position: 'absolute',
    width: '50%',
    height: '200%',
    transform: [{rotate: '40deg'}],
    right: 0,
    overflow: 'hidden',
    backgroundColor: COLORS.PRIMARY,
  },
  profile: {
    width: '100%',
    height: '100%',
  },
  dropDownCon: {
    position: 'absolute',
    bottom: RF(28),
    right: WP(8),
    height: RF(57),
    width: WP(30),
    borderRadius: RF(57 / 2),
  },
});

export default ProfileHeader;
