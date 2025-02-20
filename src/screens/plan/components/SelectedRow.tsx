import CustomText from '@components/customText';
import TextWrapper from '@components/textWrapper';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface SelectedRowProps {
  onPressCancel?: any;
  containerStyle?: ViewStyle | any;
}

const SelectedRow = (props: Partial<SelectedRowProps>) => {
  const {onPressCancel = () => {}, containerStyle} = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <CustomText
        size={10}
        fontFamily={INTER.REGULAR}
        color={COLORS.LIGHT_BLACK}
        numberOfLines={1}
        style={{lineHeight: RF(13)}}>
        Current plan
      </CustomText>
      <TextWrapper
        size={10}
        fontFamily={INTER.BOLD}
        color={COLORS.LIGHT_BLACK}
        numberOfLines={1}
        style={{lineHeight: RF(13), textDecorationLine: 'underline'}}
        onPress={onPressCancel && onPressCancel}>
        Cancel Plan
      </TextWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SelectedRow;
