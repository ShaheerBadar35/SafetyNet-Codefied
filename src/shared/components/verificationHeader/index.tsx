import {ICONS} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {useSafeArea} from '@components/safeAreaInsets';
import {navigationRef} from '@services/NavService';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface VerificationHeaderProps {
  containerStyle?: ViewStyle | any;
}

const VerificationHeader = (props: Partial<VerificationHeaderProps>) => {
  const {containerStyle} = props;
  const insets: any = useSafeArea();
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.subContainer, {paddingTop: insets?.top + RF(40)}]}>
        <CustomIcon
          path={ICONS.BACK}
          resizeMode="contain"
          containerStyle={styles.backIcon}
          onPress={() => navigationRef?.current?.goBack()}
        />
        <View style={styles.row}>
          <CustomText
            size={24}
            fontFamily={INTER.BOLD}
            color={COLORS.LIGHT_GRAY}
            style={{lineHeight: RF(31)}}
            numberOfLines={1}>
            Verification
          </CustomText>
          <CustomIcon
            path={ICONS.VERIFICATION}
            resizeMode="cover"
            containerStyle={styles.verificationIcon}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HP(30),
    width: '100%',
    backgroundColor: COLORS.PRIMARY,
  },
  subContainer: {
    paddingHorizontal: WP(8),
  },
  backIcon: {
    height: RF(15),
    width: RF(15),
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SPACING.mt2,
  },
  verificationIcon: {
    height: RF(85),
    width: RF(130),
  },
});

export default VerificationHeader;
