import CustomIcon from '@components/customIcon';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {GST} from '@theme/globalStyles';
import {HP, RF, RFT} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {ANDROID} from '@utils/constants';
import React, {forwardRef, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import CustomText from '../customText';
import TimePickerModal from '@components/timePickerModal';
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
  onPressSuggestion?: any;
  dropDownData: any;
  hoursData: any;
  minutesData: any;
  periodsData: any;
  setHoursData: any;
  setMinutesData: any;
  setPeriodsData: any;
  titleStyle?: ViewStyle | any;
  titleConStyle?: ViewStyle | any;
}

const TimeInput = forwardRef((props: Partial<InputProp>, ref: any) => {
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
    onPressSuggestion = () => {},
    dropDownData = [],
    hoursData,
    minutesData,
    periodsData,
    setHoursData = () => {},
    setMinutesData = () => {},
    setPeriodsData = () => {},
    titleStyle,
    titleConStyle,
  } = props;
  const [showTimePicker, setShowTimePicker] = useState(false);
  return (
    visible && (
      <View style={[styles.mainContainer, mainContainerStyle]}>
        <View
          style={[
            {flexDirection: 'row', justifyContent: 'space-between'},
            titleConStyle,
          ]}>
          {!!title && (
            <CustomText
              fontFamily={REGULAR}
              size={titleSize}
              color={titleColor}
              style={[GST.mb2, titleStyle]}>
              {title}
            </CustomText>
          )}
        </View>

        <Pressable
          style={[styles.subContainer, containerStyle]}
          disabled={disableContainerPress}
          onPress={() => setShowTimePicker(true)}>
          <TextInput
            editable={false}
            ref={ref}
            allowFontScaling={false}
            maxLength={charLimit || props.maxLength}
            pointerEvents={'auto'} // Allow input
            textContentType="oneTimeCode"
            {...props}
            keyboardType={keyboardNumberic ? 'number-pad' : 'default'}
            style={[styles.input, inputStyle]}
            placeholderTextColor={placeHolderColor}
            onKeyPress={e => setKeyPress && setKeyPress(e.nativeEvent.key)}
            autoCorrect={false}
            scrollEnabled={false}
          />
        </Pressable>

        {!!error && displayError && (
          <CustomText style={[styles.errorText, errorStyle]}>
            {error}
          </CustomText>
        )}
        <TimePickerModal
          open={showTimePicker}
          hoursData={hoursData}
          minutesData={minutesData}
          periodsData={periodsData}
          setHoursData={setHoursData}
          setMinutesData={setMinutesData}
          setPeriodsData={setPeriodsData}
          onPressBtn={() => setShowTimePicker(false)}
          onPressClose={() => setShowTimePicker(false)}
        />
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
  dropDownIcon: {
    width: RF(12),
    height: RF(12),
  },
  dropDownIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: RF(12),
    height: RF(12),
    transform: [{rotate: '270deg'}],
  },
  dropdownRowStyle: {
    height: RF(50),
    ...SPACING.pl4,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  suggestion: {
    backgroundColor: COLORS.DARK_GRAY_05,
    borderBottomColor: COLORS.DARK_GRAY,
    borderBottomWidth: RF(1),
    ...SPACING.p3,
  },
});

export default TimeInput;
