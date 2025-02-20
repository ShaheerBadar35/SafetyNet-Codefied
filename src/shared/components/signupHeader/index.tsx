import {ICONS, IMAGES} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {useSafeArea} from '@components/safeAreaInsets';
import {navigationRef} from '@services/NavService';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const SignupHeader = () => {
  const insets: any = useSafeArea();
  return (
    <View style={styles.container}>
      <View style={[styles.textCon, {paddingTop: insets?.top + RF(40)}]}>
        <CustomIcon
          path={ICONS.BACK}
          resizeMode="cover"
          containerStyle={styles.chevron}
          onPress={() => navigationRef?.current?.goBack()}
        />
        <CustomText
          size={24}
          fontFamily={INTER.BOLD}
          color={COLORS.LIGHT_BLACK}
          style={{lineHeight: RF(31), maxWidth: '45%', ...SPACING.mt10}}>
          Signup to get started.
        </CustomText>
      </View>
      <View style={styles.rightCon}>
        <CustomIcon
          path={IMAGES.EDIT}
          resizeMode="cover"
          containerStyle={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HP(35),
    width: '100%',
    backgroundColor: COLORS.WHITE,
  },
  chevron: {
    height: RF(15),
    width: RF(9),
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
    backgroundColor: COLORS.LIGHT_BLACK,
    overflow: 'hidden',
  },
  icon: {
    position: 'absolute',
    transform: [{rotate: '-40deg'}],
    height: RF(183),
    width: RF(188),
    bottom: '44%',
    left: '-16%',
    ...SPACING.mb10,
  },
});

export default SignupHeader;
