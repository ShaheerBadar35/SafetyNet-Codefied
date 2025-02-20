import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF, RFT} from '@theme/responsive';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '@components/customText';
import {useSafeArea} from '@components/safeAreaInsets';
import {GST} from '@theme/globalStyles';
import {SPACING} from '@theme/spacing';
const {WHITE, PRIMARY, SECONDARY} = COLORS;
const {MEDIUM} = INTER;
interface Props {
  title: string;
  onPress: any;
  titleColor?: string;
  titleSize?: number;
  bgColor?: string;
  customStyle?: ViewStyle | any;
  customContainerStyle?: ViewStyle | any;
  disabled?: boolean;
  sticky?: boolean;
  leftIcon?: any;
  rightIcon?: any;
  rightIconStyle?: any;
  rightIconColor?: any;
  flex?: boolean;
  iconColor?: string;
  leftIconStyle?: any;
  secondary?: boolean;
  titleFontFamily?: string;
  emptyBtn?: boolean;
  emptyBtnBorderColor?: string;
  borderColor?: string;
  isloading?: boolean;
  titleStyle?: ViewStyle | any;
}

const CustomButton = ({
  title,
  onPress,
  titleColor = WHITE,
  titleFontFamily = MEDIUM,
  titleSize = 16,
  customStyle,
  disabled = false,
  sticky,
  leftIcon,
  rightIcon,
  rightIconStyle,
  rightIconColor,
  bgColor = disabled ? COLORS.LIGHT_GRAY_02 : PRIMARY,
  flex,
  customContainerStyle,
  iconColor,
  leftIconStyle,
  borderColor,
  isloading = false,
  titleStyle,
}: Partial<Props>) => {
  const insets: any = useSafeArea();

  return (
    <View
      style={[
        sticky && {...styles.sticky, paddingBottom: insets.bottom},
        flex && GST.FLEX,
        customContainerStyle,
      ]}>
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: bgColor,
            borderColor: borderColor || bgColor,
            borderWidth: borderColor ? RF(1) : 0,
            ...SPACING.py4,
          },
          customStyle,
        ]}
        onPress={onPress}
        disabled={disabled || isloading}>
        {/* {isloading ? (
          <ActivityIndicator size="small" color={COLORS.WHITE} />
        ) : ( */}
        <>
          {leftIcon && (
            <FastImage
              source={leftIcon}
              style={[styles.leftIcon, leftIconStyle]}
              tintColor={iconColor}
            />
          )}
          <CustomText
            fontFamily={titleFontFamily}
            color={titleColor}
            size={titleSize}
            style={titleStyle}>
            {title}
          </CustomText>
          {isloading && (
            <ActivityIndicator
              size="small"
              color={COLORS.WHITE}
              style={GST.ml3}
            />
          )}
          {rightIcon && (
            <FastImage
              resizeMode="contain"
              source={rightIcon}
              style={[styles.rightIcon, rightIconStyle]}
              tintColor={rightIconColor}
            />
          )}
        </>
        {/* )} */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: RF(7),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sticky: {
    justifyContent: 'flex-end',
  },
  leftIcon: {
    width: RF(20),
    height: RF(20),
    marginRight: RF(8),
  },
  rightIcon: {
    width: RF(20),
    height: RF(20),
    marginLeft: RF(8),
  },
});

export default CustomButton;
