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

const SelectPlanHeader = () => {
  const insets: any = useSafeArea();
  return (
    <View style={[styles.container, {paddingTop: insets?.top + RF(40)}]}>
      <CustomIcon
        path={ICONS.BACK}
        resizeMode="cover"
        containerStyle={styles.backIcon}
        onPress={() => navigationRef?.current?.goBack()}
      />
      <CustomText
        size={24}
        fontFamily={INTER.BOLD}
        color={COLORS.LIGHT_GRAY}
        style={{
          lineHeight: RF(31),
          paddingTop: RF(48),
          ...SPACING.ml2,
        }}>
        Choose plan.
      </CustomText>
      <CustomIcon
        path={IMAGES.PLAN}
        resizeMode="contain"
        containerStyle={styles.planIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HP(35),
    width: '100%',
    paddingHorizontal: WP(8),
    backgroundColor: COLORS.PRIMARY,
  },
  backIcon: {
    width: RF(9),
    height: RF(15),
  },
  planIcon: {
    position: 'absolute',
    height: HP(25),
    width: HP(25),
    right: RF(-10),
    bottom: RF(24),
  },
});

export default SelectPlanHeader;
