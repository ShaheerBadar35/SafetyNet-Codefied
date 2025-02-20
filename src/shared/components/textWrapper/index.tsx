import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RFT} from '@theme/responsive';
import React from 'react';
import {Pressable, Text, TextProps} from 'react-native';

const {REGULAR} = INTER;
const {BLACK} = COLORS;

interface Props extends TextProps {
  style: any;
  size: number;
  color?: string;
  capital: boolean;
  children: any;
  fontFamily: string;
  numberOfLines: number;
  italic: boolean;
  onPress?: () => void;
  center: boolean;
  containerStyle?: any;
}

const TextWrapper = (props: Partial<Props>) => {
  const {
    size = 12,
    color = BLACK,
    style,
    numberOfLines = 0,
    capital = false,
    onPress,
    center,
    italic = false,
    fontFamily = REGULAR,
    containerStyle,
  } = props;
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={containerStyle}>
      <Text
        numberOfLines={numberOfLines}
        allowFontScaling={false}
        style={[
          {
            fontFamily: fontFamily,
            fontSize: RFT(size),
            color,
            textTransform: capital ? 'uppercase' : 'none',
            textAlign: center ? 'center' : 'auto',
            fontStyle: italic ? 'italic' : 'normal',
          },
          style,
        ]}>
        {props.children}
      </Text>
    </Pressable>
  );
};

export default TextWrapper;
