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

  N2style: any;
  N2size: number;
  N2color?: string;
  N2capital: boolean;
  N2children: any;
  N2fontFamily: string;
  N2numberOfLines: number;
  N2italic: boolean;
  N2onPress: () => void;
  N2center: boolean;

  N3style: any;
  N3size: number;
  N3color?: string;
  N3capital: boolean;
  N3children: any;
  N3fontFamily: string;
  N3numberOfLines: number;
  N3italic: boolean;
  N3onPress: () => void;
  N3center: boolean;

  N4style: any;
  N4size: number;
  N4color?: string;
  N4capital: boolean;
  N4children: any;
  N4fontFamily: string;
  N4numberOfLines: number;
  N4italic: boolean;
  N4onPress: () => void;
  N4center: boolean;

  text: string | number;
  Ntext: string | number;
  N2text: string | number;
  N3text: string | number;
  N4text: string | number;

  containerStyle?: ViewStyle;
}

const NestedText2 = (props: Partial<Props>) => {
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
    N2size = 18,
    N2color = PRIMARY,
    N2style,
    N2numberOfLines = 0,
    N2capital = false,
    N2onPress,
    N2center,
    N2italic = false,
    N2fontFamily = SEMI_BOLD,
    N3size = 18,
    N3color = PRIMARY,
    N3style,
    N3numberOfLines = 0,
    N3capital = false,
    N3onPress,
    N3center,
    N3italic = false,
    N3fontFamily = SEMI_BOLD,
    N4size = 18,
    N4color = PRIMARY,
    N4style,
    N4numberOfLines = 0,
    N4capital = false,
    N4onPress,
    N4center,
    N4italic = false,
    N4fontFamily = SEMI_BOLD,
    text,
    Ntext,
    N2text,
    N3text,
    N4text,
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
          style={Nstyle}
          size={Nsize}
          color={Ncolor}
          fontFamily={NfontFamily}
          onPress={NonPress}
          numberOfLines={2}>
          {Ntext}
        </CustomText>
        <CustomText
          style={N2style}
          size={N2size}
          color={N2color}
          fontFamily={N2fontFamily}
          onPress={N2onPress}
          numberOfLines={2}>
          {N2text}
        </CustomText>
        <CustomText
          style={N3style}
          size={N3size}
          color={N3color}
          fontFamily={N3fontFamily}
          onPress={N3onPress}
          numberOfLines={2}>
          {N3text}
        </CustomText>
        <CustomText
          style={N4style}
          size={N4size}
          color={N4color}
          fontFamily={N4fontFamily}
          onPress={N4onPress}
          numberOfLines={2}>
          {N4text}
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
export default NestedText2;
