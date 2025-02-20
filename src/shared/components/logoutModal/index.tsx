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

interface LogoutModalProps {
  open: boolean;
  onPressClose: any;
  onPressBtn: any;
  alertContainerStyle?: ViewStyle;
}

const LogoutModal = ({
  open,
  onPressClose = () => {},
  onPressBtn = () => {},
  alertContainerStyle,
}: Partial<LogoutModalProps>) => {
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
              <CustomIcon
                path={ICONS.CROSS}
                resizeMode="cover"
                containerStyle={styles.iconCon}
                onPress={onPressClose && onPressClose}
              />
              <CustomText
                size={20}
                fontFamily={INTER.BOLD}
                color={COLORS.LIGHT_BLACK}
                center
                style={{lineHeight: RF(25)}}>
                You are about to logout
              </CustomText>
              <CustomText
                size={10}
                fontFamily={INTER.REGULAR}
                color={COLORS.BLACK}
                center
                style={{lineHeight: RF(13), ...SPACING.mt3, ...SPACING.mb5}}>
                If you sign out, the keyword will be disabled and emergency
                alerts will not be sent.
              </CustomText>
              <CustomButton
                title="Logout"
                titleSize={18}
                titleFontFamily={INTER.BOLD}
                titleColor={COLORS.LIGHT_GARY_03}
                bgColor={COLORS.WARNING_100}
                titleStyle={{lineHeight: RF(22)}}
                customStyle={{...SPACING.py1}}
                customContainerStyle={{width: '60%'}}
                onPress={onPressBtn && onPressBtn}
                // onPress={() => {
                //    // $&
                // }}
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
    ...SPACING.px3,
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
  iconCon: {
    height: RF(19),
    width: RF(19),
    alignSelf: 'flex-end',
    ...SPACING.mb3,
  },
});

export default LogoutModal;
