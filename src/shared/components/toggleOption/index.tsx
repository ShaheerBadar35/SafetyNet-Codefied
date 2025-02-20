import CustomText from '@components/customText';
import Toggle from '@components/toggle';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface ToggleOptionProps {
  title: string;
  subTitle: string;
  selected?: boolean;
  onPress?: any;
  disabled?: boolean;
  containerStyle?: ViewStyle | any;
}

const ToggleOption = (props: Partial<ToggleOptionProps>) => {
  const {
    title = '',
    subTitle = '',
    selected = false,
    onPress = () => {},
    disabled = false,
    containerStyle,
  } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{maxWidth: '70%'}}>
        <CustomText
          size={16}
          fontFamily={INTER.MEDIUM}
          color={COLORS.LIGHT_GRAY}
          style={{lineHeight: RF(21)}}
          numberOfLines={2}>
          {title}
        </CustomText>
        <CustomText
          size={10}
          fontFamily={INTER.REGULAR}
          color={COLORS.DARK_GRAY}
          style={{lineHeight: RF(16), ...SPACING.mt1}}>
          {subTitle}
        </CustomText>
      </View>
      <Toggle
        disabled={disabled}
        selected={selected}
        onPress={onPress && onPress}
      />
    </View>
  );
};

const styles = StyleSheet?.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

export default ToggleOption;
