import CustomButton from '@components/customButton';
import CustomText from '@components/customText';
import {BlurView} from '@react-native-community/blur';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {Modal, StyleSheet, View, ViewStyle} from 'react-native';

interface SignedOutModalProps {
  open: boolean;
  onPressBtn: any;
  alertContainerStyle?: ViewStyle;
}

const SignedOutModal = ({
  open,
  onPressBtn = () => {},
  alertContainerStyle,
}: Partial<SignedOutModalProps>) => {
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
              <CustomText
                size={20}
                fontFamily={INTER.BOLD}
                color={COLORS.LIGHT_BLACK}
                center
                style={{lineHeight: RF(25)}}>
                Success!
              </CustomText>
              <CustomText
                size={10}
                fontFamily={INTER.REGULAR}
                color={COLORS.BLACK}
                center
                style={{lineHeight: RF(13), ...SPACING.mt3, ...SPACING.mb5}}>
                You have been signed out of all other devices. Please sign in
                again
              </CustomText>
              <CustomButton
                title="Sign in"
                titleSize={18}
                titleFontFamily={INTER.BOLD}
                titleColor={COLORS.LIGHT_GARY_03}
                titleStyle={{lineHeight: RF(22)}}
                customStyle={{...SPACING.py1}}
                customContainerStyle={{width: '60%'}}
                onPress={onPressBtn && onPressBtn}
              />
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
});

export default SignedOutModal;
