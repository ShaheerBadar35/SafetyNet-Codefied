import {ICONS} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface GoogleButtonProps {
  title?: string;
  onPress?: any;
  isLoading?: boolean;
  containerStyle?: ViewStyle | any;
}

const GoogleButton = (props: Partial<GoogleButtonProps>) => {
  const {title, onPress = () => {}, isLoading = false, containerStyle} = props;
  return (
    <Pressable
      onPress={onPress && onPress}
      style={[styles.container, containerStyle]}>
      <CustomIcon
        path={ICONS.GOOGLE}
        resizeMode="cover"
        containerStyle={styles.icon}
      />
      <CustomText
        size={15}
        fontFamily={INTER.BOLD}
        color={COLORS.LIGHT_BLACK_2}
        style={{lineHeight: RF(19)}}
        numberOfLines={1}>
        {title}
      </CustomText>
      {isLoading && (
        <ActivityIndicator
          size="small"
          color={COLORS.WHITE}
          style={[GST.ml3, {flex: 1}]}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: RF(7),
    ...SPACING.py4,
    ...SPACING.px6,
    backgroundColor: COLORS.LIGHT_GRAY_02,
  },
  icon: {
    height: RF(25),
    width: RF(25),
    ...SPACING.mr5,
  },
});

export default GoogleButton;
