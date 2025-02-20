import {IMAGES} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {useSafeArea} from '@components/safeAreaInsets';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF, WP} from '@theme/responsive';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const ChangePlanHeader = () => {
  const insets: any = useSafeArea();
  return (
    <View style={[styles.container, {paddingTop: insets?.top + RF(50)}]}>
      <CustomText
        size={24}
        fontFamily={INTER.BOLD}
        color={COLORS.LIGHT_BLACK}
        style={{lineHeight: RF(31)}}>
        Change Plan
      </CustomText>
      <CustomIcon
        path={IMAGES.PLAN_GREEN}
        resizeMode="contain"
        containerStyle={styles.img}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: HP(20),
    paddingHorizontal: WP(8),
    backgroundColor: COLORS.LIGHT_GRAY_04,
  },
  img: {
    position: 'absolute',
    right: RF(-10),
    bottom: -RF(40),
    height: HP(25),
    width: HP(25),
  },
});

export default ChangePlanHeader;
