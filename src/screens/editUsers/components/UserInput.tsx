import AppInput from '@components/appInput';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {useState} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';

interface UserInputProps {
  index: any;
  value?: any;
  setValue?: any;
  editable?: any;
  containerStyle?: ViewStyle | any;
}

const UserInput = (props: Partial<UserInputProps>) => {
  const {
    index = 0,
    value = '',
    setValue = () => {},
    editable = true,
    containerStyle,
  } = props;
  const [text, setText] = useState(value);
  return (
    <AppInput
      editable={editable}
      titleSize={16}
      titleColor={COLORS.LIGHT_BLACK}
      placeholder="Enter email address"
      placeHolderColor={COLORS.LIGHT_BLACK}
      value={text}
      onChangeText={(val: any) => {
        setText(val);
        setValue(val, index);
      }}
      keyboardType="ascii-capable"
      inputStyle={{
        lineHeight: RF(25),
        fontFamily: INTER.MEDIUM,
        color: COLORS.LIGHT_BLACK,
        textDecorationLine: 'none',
      }}
      containerStyle={{
        ...SPACING.py2,
        ...SPACING.px3,
        backgroundColor: COLORS.LIGHT_GRAY_04,
      }}
      mainContainerStyle={[styles.container, containerStyle]}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default UserInput;
