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

interface WatchModalProps {
  open: boolean;
  title: any;
  desc?: any;
  icon: any;
  showCloseIcon: any;
  onPressClose: any;
  onPress?: any;
  alertContainerStyle?: ViewStyle;
}

const WatchModal = ({
  open,
  title = '',
  desc = '',
  icon = '',
  showCloseIcon = true,
  onPressClose = () => {},
  onPress = () => {},
  alertContainerStyle,
}: Partial<WatchModalProps>) => {
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

              <CustomText
                size={20}
                fontFamily={INTER.BOLD}
                color={COLORS.LIGHT_BLACK}
                center
                numberOfLines={2}
                style={{lineHeight: RF(25)}}>
                {title}
              </CustomText>
              <CustomText
                size={10}
                fontFamily={INTER.REGULAR}
                color={COLORS.LIGHT_BLACK}
                center
                style={{lineHeight: RF(16), ...SPACING.mt4}}>
                {desc}
              </CustomText>
              <CustomIcon
                path={icon}
                resizeMode="cover"
                customStyle={styles.successIcon}
                containerStyle={styles.successIconCon}
              />
              <CustomButton
                title={'Continue'}
                titleSize={18}
                titleColor={COLORS.LIGHT_GRAY_04}
                titleFontFamily={INTER.BOLD}
                titleStyle={{lineHeight: RF(22)}}
                bgColor={COLORS.LIGHT_BLACK}
                customStyle={{...SPACING.py1}}
                customContainerStyle={{width: '70%'}}
                onPress={onPress && onPress}
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
    ...SPACING.my5,
  },
});

export default WatchModal;
