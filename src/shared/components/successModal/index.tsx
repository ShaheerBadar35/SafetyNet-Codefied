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

interface SuccessModalProps {
  open: boolean;
  title: any;
  icon: any;
  showCloseIcon: any;
  onPressClose: any;
  alertContainerStyle?: ViewStyle;
}

const SuccessModal = ({
  open,
  title = '',
  icon = '',
  showCloseIcon = true,
  onPressClose = () => {},
  alertContainerStyle,
}: Partial<SuccessModalProps>) => {
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
              {!showCloseIcon && (
                <CustomIcon
                  path={ICONS.CROSS}
                  resizeMode="cover"
                  containerStyle={styles.iconCon}
                  onPress={onPressClose && onPressClose}
                />
              )}
              <CustomIcon
                path={icon}
                resizeMode="cover"
                customStyle={styles.successIcon}
                containerStyle={styles.successIconCon}
              />
              <CustomText
                size={16}
                fontFamily={INTER.BOLD}
                color={COLORS.LIGHT_BLACK}
                center
                numberOfLines={2}
                style={{lineHeight: RF(20)}}>
                {title}
              </CustomText>
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
    borderRadius: RF(10),
    ...SPACING.p3,
    backgroundColor: COLORS.LIGHT_GRAY_04,
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
  successIcon: {
    height: RF(90),
    width: RF(90),
  },
  successIconCon: {
    height: RF(90),
    width: RF(90),
    ...SPACING.mb6,
  },
});

export default SuccessModal;
