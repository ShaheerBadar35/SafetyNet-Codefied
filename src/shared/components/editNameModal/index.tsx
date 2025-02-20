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
import React, {useState} from 'react';
import {Modal, StyleSheet, View, ViewStyle} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface EditNameModalProps {
  open: boolean;
  name: any;
  isBtnLoading: any;
  onPressClose: any;
  onPressBtn: any;
  alertContainerStyle?: ViewStyle;
}

const EditNameModal = ({
  open,
  name = '',
  isBtnLoading = false,
  onPressClose = () => {},
  onPressBtn = () => {},
  alertContainerStyle,
}: Partial<EditNameModalProps>) => {
  const [text, setText] = useState(name || '');
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
                  onPress={onPressClose && onPressClose}
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
                  style={{lineHeight: RF(25), ...SPACING.mt1, ...SPACING.mb5}}>
                  Edit Name
                </CustomText>
                <AppInput
                  title="Name"
                  titleSize={12}
                  tintColor={COLORS.LIGHT_GRAY_04}
                  placeholder="Jay Manson"
                  keyboardType="ascii-capable"
                  value={text}
                  onChangeText={(val: any) => setText(val)}
                  titleStyle={{lineHeight: RF(19)}}
                  inputStyle={styles.input}
                  containerStyle={{
                    ...SPACING.py3,
                    backgroundColor: COLORS.LIGHT_GRAY_02,
                  }}
                  mainContainerStyle={{
                    ...SPACING.mb8,
                    width: '100%',
                  }}
                />
                <CustomButton
                  title="Done"
                  titleSize={18}
                  titleFontFamily={INTER.BOLD}
                  isloading={isBtnLoading}
                  titleStyle={{lineHeight: RF(23)}}
                  disabled={text?.length == 0 || name == text}
                  bgColor={
                    text?.length > 0 && name != text
                      ? COLORS.PRIMARY
                      : COLORS.LIGHT_GRAY_02
                  }
                  customStyle={{...SPACING.py1}}
                  customContainerStyle={{width: '60%', alignSelf: 'center'}}
                  onPress={() => onPressBtn && onPressBtn(text)}
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

export default EditNameModal;
