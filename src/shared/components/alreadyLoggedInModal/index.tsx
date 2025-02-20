import {ICONS} from '@assets';
import CustomButton from '@components/customButton';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {BlurView} from '@react-native-community/blur';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {Modal, StyleSheet, View, ViewStyle} from 'react-native';

interface AlreadyLoggedInModalProps {
  open: boolean;
  onPressBtn: any;
  alertContainerStyle?: ViewStyle;
}

const AlreadyLoggedInModal = ({
  open,
  onPressBtn = () => {},
  alertContainerStyle,
}: Partial<AlreadyLoggedInModalProps>) => {
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
                style={{lineHeight: RF(26)}}>
                Wait!
              </CustomText>
              <CustomText
                size={10}
                fontFamily={INTER.REGULAR}
                color={COLORS.BLACK}
                center
                style={{lineHeight: RF(16), ...SPACING.mt2}}>
                You are currently logged in in another device. By pressing
                continue, you will be logged out from all other devices
              </CustomText>
              <CustomIcon
                path={ICONS.ABOUT}
                resizeMode="cover"
                containerStyle={styles.icon}
              />
              <CustomButton
                title="Continue"
                titleSize={18}
                titleFontFamily={INTER.BOLD}
                titleColor={COLORS.LIGHT_GARY_03}
                titleStyle={{lineHeight: RF(22)}}
                bgColor={COLORS.LIGHT_BLACK}
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
  icon: {
    height: RF(80),
    width: RF(90),
    ...SPACING.mt2,
    ...SPACING.mb2,
  },
});

export default AlreadyLoggedInModal;
