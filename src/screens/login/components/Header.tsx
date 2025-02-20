import {ICONS} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {useSafeArea} from '@components/safeAreaInsets';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Header = () => {
  const insets: any = useSafeArea();
  return (
    <View style={styles.container}>
      <View style={[styles.textCon, {paddingTop: insets?.top + RF(40)}]}>
        <CustomText
          size={30}
          fontFamily={INTER.BOLD}
          color={COLORS.LIGHT_BLACK}
          style={{lineHeight: RF(38)}}>
          Hi!
        </CustomText>
        <CustomText
          size={24}
          fontFamily={INTER.BOLD}
          color={COLORS.LIGHT_BLACK}
          style={{lineHeight: RF(31), maxWidth: '45%', ...SPACING.mt3}}>
          Let’s get you logged in.
        </CustomText>
      </View>
      <View style={styles.rightCon} />
      <CustomIcon
        path={ICONS.LOGO_GRAY}
        resizeMode="contain"
        containerStyle={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HP(35),
    width: '100%',
    backgroundColor: COLORS.WHITE,
  },
  textCon: {
    height: '100%',
    paddingHorizontal: WP(8),
  },
  rightCon: {
    position: 'absolute',
    right: 0,
    width: '60%',
    height: '200%',
    transform: [{rotate: '40deg'}],
    backgroundColor: COLORS.PRIMARY,
  },
  icon: {
    position: 'absolute',
    height: RF(84),
    width: RF(162),
    right: WP(4),
    bottom: 0,
    ...SPACING.mb10,
  },
});

export default Header;
