import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {HP, RF, RFT} from '@theme/responsive';
import React, {forwardRef, useState} from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '../customText';
import {ANDROID} from '@utils/constants';
import {INTER} from '@theme/fonts';
import {ICONS} from '@assets/icons';
import CustomIcon from '@components/customIcon';
import {SPACING} from '@theme/spacing';
const {REGULAR, MEDIUM} = INTER;

interface InputProp extends TextInputProps {
  title: any;
  visible?: any;
  titleColor: string;
  containerStyle: ViewStyle | any;
  HeadingTitle: string;
  titleSize: number;
  leftIcon?: any;
  leftIconTintColor?: any;
  rightIcon?: any;
  rightIconTintColor?: any;
  inputProps: TextInputProps;
  error: any;
  errorStyle: any;
  showPassword: boolean;
  toggleShowPassword: () => void;
  key: any;
  iconColor: string;
  required: boolean;
  onRightPress: () => void;
  setKeyPress: (key: string) => void;
  disableContainerPress: boolean;
  mainContainerStyle: any;
  inputStyle: any;
  tintColor: any;
  charLimit: number;
  value: any;
  leftIconStyle: any;
  rightIconStyle: any;
  displayError: boolean;
  placeHolderColor?: string;
  inputType?: string;
  keyboardNumberic?: boolean;
  isFocused?: boolean;
  setValue?: any;
  cancelIcon?: any;
  scrollEnabled?: boolean;
  titleStyle?: ViewStyle | any;
  titleConStyle?: ViewStyle | any;
}

const AppInput = forwardRef((props: Partial<InputProp>, ref: any) => {
  const {
    titleSize = 15,
    title,
    titleColor = COLORS.DARK_GRAY,
    leftIcon,
    leftIconTintColor,
    rightIcon,
    rightIconTintColor,
    error,
    containerStyle,
    errorStyle,
    showPassword,
    value,
    toggleShowPassword,
    iconColor,
    key,
    required,
    onRightPress,
    inputType,
    multiline,
    setKeyPress,
    editable = true,
    disableContainerPress,
    mainContainerStyle,
    inputStyle,
    tintColor,
    visible = true,
    charLimit,
    leftIconStyle,
    rightIconStyle,
    displayError = true,
    placeHolderColor = COLORS.DARK_GRAY,
    keyboardNumberic = false,
    setValue = () => {},
    cancelIcon,
    scrollEnabled = false,
    titleStyle,
    titleConStyle,
  } = props;
  const labelSize = 15;
  const fontFamily = REGULAR;

  return (
    visible && (
      <View style={[styles.mainContainer, mainContainerStyle]}>
        <View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
            titleConStyle,
          ]}>
          {!!title && (
            <CustomText
              fontFamily={fontFamily}
              size={titleSize}
              color={titleColor}
              style={[GST.mb2, titleStyle]}>
              {title}
            </CustomText>
          )}
        </View>
        <Pressable
          style={[
            styles.subContainer,
            containerStyle,
            multiline && styles.flexStart,
          ]}
          disabled={disableContainerPress}
          onPress={onRightPress}>
          {!!leftIcon && (
            <CustomIcon
              key={key}
              tintColor={leftIconTintColor && leftIconTintColor}
              // tintColor={tintColor ? tintColor : LIGHT_GRAY}
              containerStyle={[GST.mr3, leftIconStyle]}
              path={leftIcon}
            />
          )}
          <TextInput
            ref={ref}
            allowFontScaling={false}
            maxLength={charLimit || props.maxLength}
            pointerEvents={editable ? 'auto' : 'none'}
            textContentType="oneTimeCode"
            {...props}
            keyboardType={keyboardNumberic ? 'number-pad' : 'default'}
            style={[styles.input, multiline && styles.multiline, inputStyle]}
            placeholderTextColor={placeHolderColor}
            onKeyPress={e => setKeyPress && setKeyPress(e.nativeEvent.key)}
            autoCorrect={false}
            scrollEnabled={!multiline || scrollEnabled}
          />
          {inputType === 'password' && (
            <CustomIcon
              onPress={toggleShowPassword}
              tintColor={COLORS.DARK_GRAY}
              path={showPassword ? ICONS.SHOW_EYE : ICONS.HIDE_EYE}
            />
          )}
          {!!rightIcon &&
            (cancelIcon && value?.length >= 1 ? (
              <Pressable
                onPress={() => {
                  setValue && setValue('');
                  setTimeout(() => {
                    Keyboard.dismiss();
                  });
                }}
                hitSlop={GST.HITSLOP}>
                <FastImage
                  source={cancelIcon}
                  style={!!rightIconStyle ? rightIconStyle : styles.icon}
                  tintColor={
                    rightIconTintColor ? rightIconTintColor : COLORS.DARK_GRAY
                  }
                  resizeMode="contain"
                />
              </Pressable>
            ) : (
              <Pressable onPress={onRightPress} hitSlop={GST.HITSLOP}>
                <FastImage
                  source={rightIcon}
                  tintColor={rightIconTintColor && rightIconTintColor}
                  style={!!rightIconStyle ? rightIconStyle : styles.icon}
                  resizeMode="contain"
                />
              </Pressable>
            ))}
        </Pressable>
        {!!error && displayError && (
          <CustomText style={[styles.errorText, errorStyle]}>
            {error}
          </CustomText>
        )}
      </View>
    )
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    ...GST.mb3,
  },
  input: {
    flex: 1,
    paddingRight: RF(14),
    fontFamily: MEDIUM,
    color: COLORS.DARK_GRAY,
    fontSize: RFT(15),
    paddingVertical: ANDROID ? 0 : RF(4),
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ANDROID ? RF(24) : RF(24),
    paddingVertical: RF(16),
    backgroundColor: COLORS.LIGHT_GRAY_02,
    borderRadius: RF(7),
  },
  multiline: {
    minHeight: HP(10),
    maxHeight: HP(180),
    lineHeight: RF(19),
    marginTop: ANDROID ? RF(2) : 0,
    textAlignVertical: 'top',
  },
  flexStart: {
    alignItems: 'flex-start',
  },
  icon: {
    width: RF(15),
    height: RF(15),
  },
  passwordicon: {
    width: RF(24),
    height: RF(24),
  },
  errorText: {
    marginTop: RF(5),
    fontSize: RFT(10),
    color: COLORS.ERROR,
    fontFamily: REGULAR,
  },
});

export default AppInput;
