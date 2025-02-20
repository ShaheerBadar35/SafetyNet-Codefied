import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF, RFT} from '@theme/responsive';
import React from 'react';
import {StyleSheet, TextProps, View, ViewStyle} from 'react-native';

const {SEMI_BOLD} = INTER;
const {PRIMARY} = COLORS;

interface Props extends TextProps {
  style: any;
  size: number;
  color?: string;
  capital: boolean;
  children: any;
  fontFamily: string;
  numberOfLines: number;
  italic: boolean;
  onPress: () => void;
  center: boolean;

  Nstyle: any;
  Nsize: number;
  Ncolor?: string;
  Ncapital: boolean;
  Nchildren: any;
  NfontFamily: string;
  NnumberOfLines: number;
  Nitalic: boolean;
  NonPress: () => void;
  Ncenter: boolean;
  text: string | number;
  Ntext: string | number;
  containerStyle?: ViewStyle;
}

const NestedText = (props: Partial<Props>) => {
  const {
    size = 18,
    color = PRIMARY,
    style,
    numberOfLines = 0,
    capital = false,
    onPress,
    center,
    italic = false,
    fontFamily = SEMI_BOLD,
    Nsize = 18,
    Ncolor = PRIMARY,
    Nstyle,
    NnumberOfLines = 0,
    Ncapital = false,
    NonPress,
    Ncenter,
    Nitalic = false,
    NfontFamily = SEMI_BOLD,
    text,
    Ntext,
    containerStyle,
  } = props;
  return (
    <View style={[styles.contaner, containerStyle]}>
      <CustomText
        // style={style}
        size={size}
        color={color}
        fontFamily={fontFamily}
        onPress={onPress}>
        {text}
        <CustomText
          // style={Nstyle}
          size={Nsize}
          color={Ncolor}
          fontFamily={NfontFamily}
          onPress={NonPress}
          numberOfLines={2}>
          {Ntext}
        </CustomText>
      </CustomText>
    </View>
  );
};
const styles = StyleSheet.create({
  contaner: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
export default NestedText;
