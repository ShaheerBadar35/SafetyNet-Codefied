import {ICONS} from '@assets';
import AppInput from '@components/appInput';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {TOAST_TYPES} from '@utils/constants';
import React, {useState} from 'react';
import {LayoutAnimation, StyleSheet, View, ViewStyle} from 'react-native';
import Toast from 'react-native-toast-message';

interface EmergencyKeywordProps {
  text: any;
  setText: any;
  inputDisbabledTextColor?: any;
  inputDisabledColor?: any;
  descriptionTextColor?: any;
  disableAll?: boolean;
  containerStyle?: ViewStyle | any;
}

const EmergencyKeyword = (props: Partial<EmergencyKeywordProps>) => {
  const {
    text = '',
    setText = () => {},
    inputDisbabledTextColor = COLORS.LIGHT_BLACK,
    inputDisabledColor = COLORS.PRIMARY_LIGHT,
    descriptionTextColor = COLORS.WHITE,
    disableAll = false,
    containerStyle,
  } = props;
  const [keyword, setKeyword] = useState(text || '');
  const [disabled, setDisabled] = useState(true);
  return (
    <View style={[styles.container, containerStyle]}>
      <CustomText
        size={20}
        fontFamily={INTER.BOLD}
        color={COLORS.LIGHT_GRAY}
        style={{lineHeight: RF(25)}}
        numberOfLines={1}>
        Emergency Keywords
      </CustomText>
      <View style={{width: '100%'}}>
        <View
          style={[
            styles.row,
            {
              justifyContent: 'space-between',
              width: '100%',
              ...SPACING.mt3,
              ...SPACING.mb2,
            },
          ]}>
          <View style={[styles.row, {alignItems: 'center'}]}>
            <AppInput
              placeholder="Emergency Keyword"
              value={keyword}
              onChangeText={(val: any) => setKeyword(val)}
              keyboardType="ascii-capable"
              editable={!disabled && !disableAll}
              rightIcon={!disabled && ICONS.CROSS}
              rightIconStyle={styles.crossIcon}
              onRightPress={() => !disabled && setKeyword('')}
              inputStyle={[
                styles.input,
                disabled && {color: inputDisbabledTextColor},
              ]}
              containerStyle={{
                width: '95%',
                ...SPACING.py2,
                backgroundColor: disabled
                  ? inputDisabledColor
                  : COLORS.LIGHT_GRAY_04,
              }}
              mainContainerStyle={[
                {...SPACING.mb0},
                disableAll && {opacity: 0.4},
              ]}
            />
            <View
              style={[
                styles.btnCon,
                !disabled && {backgroundColor: COLORS.LIGHT_BLACK},
              ]}>
              <CustomIcon
                path={disabled ? ICONS.EDIT : ICONS.ROUND_TICK}
                resizeMode="cover"
                containerStyle={[
                  disabled ? styles.icon : styles.roundTickIcon,
                  disableAll && {opacity: 0.4},
                ]}
                onPress={() => {
                  if (!disableAll) {
                    LayoutAnimation.easeInEaseOut();
                    if (
                      !disabled &&
                      keyword?.toLowerCase() != 'emergency' &&
                      keyword?.toLowerCase() != 'help'
                    ) {
                      setText(keyword);
                    }
                    if (
                      !disabled &&
                      (keyword?.toLowerCase() == 'emergency' ||
                        keyword?.toLowerCase() == 'help')
                    ) {
                      Toast.show({
                        type: TOAST_TYPES.ERROR,
                        props: {
                          title:
                            'Emergency keyword must be something other than “emergency” or “help”',
                        },
                      });
                      setKeyword('');
                      setText('');
                    }
                    setDisabled(!disabled);
                  }
                }}
              />
            </View>
          </View>
        </View>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <View style={[styles.row]}>
            <CustomText>
              <CustomText
                size={10}
                fontFamily={INTER.REGULAR}
                color={descriptionTextColor}
                style={{lineHeight: RF(16), textDecorationLine: 'underline'}}>
                Disclaimer:
              </CustomText>
              <CustomText
                size={10}
                fontFamily={INTER.REGULAR}
                color={descriptionTextColor}
                style={{lineHeight: RF(16)}}>
                {' '}
                Emergency keyword must be different from{' '}
                <CustomText
                  size={10}
                  fontFamily={INTER.BOLD}
                  color={descriptionTextColor}
                  style={{lineHeight: RF(16)}}>
                  “emergency”
                  <CustomText
                    size={10}
                    fontFamily={INTER.REGULAR}
                    color={descriptionTextColor}
                    style={{lineHeight: RF(16)}}>
                    {' '}
                    or{' '}
                    <CustomText
                      size={10}
                      fontFamily={INTER.BOLD}
                      color={descriptionTextColor}
                      style={{lineHeight: RF(16)}}>
                      “help”
                    </CustomText>
                    <CustomText
                      size={10}
                      fontFamily={INTER.REGULAR}
                      color={descriptionTextColor}
                      style={{lineHeight: RF(16)}}>
                      . Voice activation phrase is
                      <CustomText
                        size={10}
                        fontFamily={INTER.BOLD}
                        color={descriptionTextColor}
                        style={{lineHeight: RF(16)}}>
                        {' '}
                        "Hey Google SafetyNet"{' '}
                      </CustomText>
                      then your keyword.
                    </CustomText>
                  </CustomText>
                </CustomText>
              </CustomText>
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: RF(10),
    ...SPACING.py5,
    ...SPACING.px3,
    backgroundColor: COLORS.PRIMARY,
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  crossIcon: {
    height: RF(19),
    width: RF(19),
  },
  input: {
    fontSize: RF(12),
    fontFamily: INTER.REGULAR,
    color: COLORS.LIGHT_BLACK,
    lineHeight: RF(19),
    paddingVertical: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
  btnCon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: RF(34),
    width: RF(34),
    borderRadius: RF(7),
    backgroundColor: COLORS.LIGHT_GRAY_04,
  },
  icon: {
    height: RF(15),
    width: RF(15),
  },
  roundTickIcon: {
    height: RF(23),
    width: RF(23),
    borderRadius: RF(23 / 2),
  },
});

export default EmergencyKeyword;
