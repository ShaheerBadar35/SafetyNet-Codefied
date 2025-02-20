import {ICONS} from '@assets';
import AppInput from '@components/appInput';
import CustomButton from '@components/customButton';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {BlurView} from '@react-native-community/blur';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF, RFT, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, View, ViewStyle} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface AddNewContactModalProps {
  open: boolean;
  disabled?: boolean;
  onPressClose: any;
  onPressBtn: any;
  alertContainerStyle?: ViewStyle;
}

const AddNewContactModal = ({
  open,
  disabled = false,
  onPressClose = () => {},
  onPressBtn = () => {},
  alertContainerStyle,
}: Partial<AddNewContactModalProps>) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={open}>
        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={3}
          reducedTransparencyFallbackColor="white">
          <View style={styles.blurSubCon}>
            <View style={[styles.alertCon, alertContainerStyle]}>
              <View style={styles.crossIconCon}>
                <CustomIcon
                  path={ICONS.CROSS}
                  resizeMode="cover"
                  containerStyle={[
                    styles.crossIcon,
                    {alignSelf: 'flex-end', right: -RF(14)},
                  ]}
                  onPress={() => {
                    onPressClose && onPressClose();
                    setTimeout(() => {
                      setName('');
                      setPhoneNumber('');
                    }, 500);
                  }}
                />
              </View>
              <KeyboardAwareScrollView
                style={{flexGrow: 1, width: '100%'}}
                enableOnAndroid={true}>
                <CustomText
                  center
                  size={20}
                  fontFamily={INTER.BOLD}
                  color={COLORS.LIGHT_BLACK}
                  style={{lineHeight: RF(25), ...SPACING.mt1, ...SPACING.mb7}}>
                  Add new contact
                </CustomText>
                <AppInput
                  editable={!disabled}
                  title="Name"
                  titleSize={12}
                  tintColor={COLORS.LIGHT_GRAY_04}
                  placeholder="Jay Manson"
                  keyboardType="ascii-capable"
                  value={name}
                  onChangeText={(val: any) => setName(val)}
                  titleStyle={{lineHeight: RF(19)}}
                  inputStyle={styles.input}
                  containerStyle={{
                    ...SPACING.py3,
                    backgroundColor: COLORS.LIGHT_GRAY_02,
                  }}
                  mainContainerStyle={{
                    ...SPACING.mb2,
                    width: '100%',
                  }}
                />
                <AppInput
                  editable={!disabled}
                  title="Phone Number"
                  titleSize={12}
                  tintColor={COLORS.LIGHT_GRAY_04}
                  placeholder="+12 34567890"
                  keyboardNumberic
                  value={phoneNumber}
                  onChangeText={(val: any) => setPhoneNumber(val)}
                  titleStyle={{lineHeight: RF(19)}}
                  containerStyle={{
                    ...SPACING.py3,
                    backgroundColor: COLORS.LIGHT_GRAY_02,
                  }}
                  mainContainerStyle={{
                    ...SPACING.mb10,
                    width: '100%',
                  }}
                  inputStyle={styles.input}
                />
                <CustomButton
                  title="Add"
                  titleSize={18}
                  titleFontFamily={INTER.BOLD}
                  titleColor={
                    name?.length > 0 && phoneNumber?.length > 0
                      ? COLORS.WHITE
                      : COLORS.LIGHT_BLACK
                  }
                  isloading={loading}
                  disabled={
                    disabled || (name?.length == 0 && phoneNumber?.length == 0)
                  }
                  bgColor={
                    !disabled && name?.length > 0 && phoneNumber?.length > 0
                      ? COLORS.PRIMARY
                      : COLORS.LIGHT_GRAY_02
                  }
                  titleStyle={{lineHeight: RF(23)}}
                  customStyle={{...SPACING.py1}}
                  customContainerStyle={{width: '60%', alignSelf: 'center'}}
                  onPress={() => {
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                      onPressBtn({name: name, number: phoneNumber});
                      setTimeout(() => {
                        setName('');
                        setPhoneNumber('');
                      }, 500);
                    }, 1000);
                  }}
                />
              </KeyboardAwareScrollView>
            </View>
          </View>
        </BlurView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  alertCon: {
    width: WP(80),
    alignItems: 'center',
    borderRadius: RF(6),
    ...SPACING.px7,
    ...SPACING.py5,
    backgroundColor: COLORS.LIGHT_GRAY_04,
  },
  container: {
    flex: 1,
  },
  blurView: {
    height: HP(100),
    width: WP(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  blurSubCon: {
    flex: 1,
    width: WP(100),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossIcon: {
    height: RF(19),
    width: RF(19),
  },
  crossIconCon: {
    width: '100%',
    alignSelf: 'flex-end',
  },
  input: {
    fontSize: RFT(16),
    fontFamily: INTER.MEDIUM,
    lineHeight: RF(25),
    paddingLeft: 0,
    paddingRight: 0,
    color: COLORS.BLACK,
  },
});

export default AddNewContactModal;
