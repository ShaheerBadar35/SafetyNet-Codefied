import {COLORS} from '@theme/colors';
import {RF, WP} from '@theme/responsive';
import {Pressable, StyleSheet, View} from 'react-native';
import CustomIcon from './customIcon';
import CustomText from './customText';
import TextWrapper from './textWrapper';
import {GST} from '@theme/globalStyles';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {ICONS} from '@assets';
import {useSafeArea} from './safeAreaInsets';
import {TOAST_TYPES} from '@utils/constants';
import Toast from 'react-native-toast-message';
import {INTER} from '@theme/fonts';
const CustomToastConfig = {
  lightSuccess: ({props}: any) => {
    return (
      <View
        style={[
          styles.toastCon,
          GST.SHADOW_HEAVY,
          {backgroundColor: COLORS.PRIMARY},
        ]}>
        <View style={styles.tSubCon}>
          <CustomIcon
            path={ICONS.NOTIFICATION}
            resizeMode="cover"
            customStyle={styles.notificationIcon}
            containerStyle={styles.notificationIconCon}
          />
          <CustomText
            size={12}
            fontFamily={INTER.BOLD}
            color={COLORS.WHITE}
            style={{lineHeight: RF(14), maxWidth: WP(60)}}>
            {props?.title}
          </CustomText>
        </View>
        <CustomIcon
          path={ICONS.CROSS}
          tintColor={COLORS.WHITE}
          resizeMode="cover"
          containerStyle={styles.closeIcon}
          onPress={() => Toast?.hide()}
        />
      </View>
    );
  },
  darkSuccess: ({props}: any) => {
    return (
      <View
        style={[
          styles.toastCon,
          GST.SHADOW_HEAVY,
          {backgroundColor: COLORS.PRIMARY_DARK_02},
        ]}>
        <View style={styles.tSubCon}>
          <CustomIcon
            path={ICONS.NOTIFICATION}
            resizeMode="cover"
            customStyle={styles.notificationIcon}
            containerStyle={styles.notificationIconCon}
          />
          <CustomText
            size={12}
            fontFamily={INTER.BOLD}
            color={COLORS.WHITE}
            style={{lineHeight: RF(14), maxWidth: WP(60)}}>
            {props?.title}
          </CustomText>
        </View>
        <CustomIcon
          path={ICONS.CROSS}
          tintColor={COLORS.WHITE}
          resizeMode="cover"
          containerStyle={styles.closeIcon}
          onPress={() => Toast?.hide()}
        />
      </View>
    );
  },
  error: ({props}: any) => {
    return (
      <View
        style={[
          styles.toastCon,
          GST.SHADOW_HEAVY,
          {backgroundColor: COLORS.WARNING_100},
        ]}>
        <View style={styles.tSubCon}>
          <CustomIcon
            path={ICONS.NOTIFICATION}
            resizeMode="cover"
            customStyle={styles.notificationIcon}
            containerStyle={styles.notificationIconCon}
          />
          <CustomText
            size={12}
            fontFamily={INTER.BOLD}
            color={COLORS.WHITE}
            style={{lineHeight: RF(14), maxWidth: WP(60)}}>
            {props?.title}
          </CustomText>
        </View>
        <CustomIcon
          path={ICONS.CROSS}
          tintColor={COLORS.WHITE}
          resizeMode="cover"
          containerStyle={styles.closeIcon}
          onPress={() => Toast?.hide()}
        />
      </View>
    );
  },
};
export default CustomToastConfig;

const ToastWrapper = ({children}: any) => {
  const insets: any = useSafeArea();

  return <View style={{marginTop: insets?.top + RF(12)}}>{children}</View>;
};

const styles = StyleSheet.create({
  toastCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: WP(90),
    borderRadius: RF(10),
    ...SPACING.px5,
    ...SPACING.py4,
  },
  tSubCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    height: RF(23),
    width: RF(23),
  },
  notificationIconCon: {
    ...SPACING.mr3,
  },
  closeIcon: {
    height: RF(19),
    width: RF(19),
  },
  tBtnCon: {
    backgroundColor: 'white',
    height: RF(30),
    width: RF(70),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#979FA9',
    borderRadius: RF(6),
  },
  container: {
    height: RF(54),
    flexDirection: 'row',
    borderRadius: RF(8),
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: RF(8),
    elevation: 5,
    width: WP(90),
    bottom: RF(20),

    alignItems: 'center',
    paddingHorizontal: RF(14),
  },
  tickIconCon: {
    height: RF(24),
    width: RF(24),
    marginEnd: RF(5),
  },
});
