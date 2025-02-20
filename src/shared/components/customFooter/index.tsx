import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface CustomFooterProps {
  fontColor?: string;
  containerStyle?: ViewStyle | any;
}

const CustomFooter = (props: Partial<CustomFooterProps>) => {
  const {fontColor = COLORS.LIGHT_BLACK, containerStyle} = props;
  const currentYear = new Date().getFullYear();
  return (
    <View style={[styles.container, containerStyle]}>
      <CustomText
        size={8}
        fontFamily={INTER.REGULAR}
        color={fontColor}
        style={{lineHeight: RF(10)}}
        center>
        Version | 1.0
      </CustomText>
      <CustomText
        size={8}
        fontFamily={INTER.REGULAR}
        color={fontColor}
        style={{lineHeight: RF(10)}}
        center>
        Copyright {currentYear} © All Rights Reserved
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CustomFooter;
