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

interface AppUpdateModalProps {
  open: boolean;
  title: any;
  desc: any;
  icon: any;
  onPress?: any;
  alertContainerStyle?: ViewStyle;
}

const AppUpdateModal = ({
  open,
  title = '',
  desc = '',
  icon = '',
  onPress = () => {},
  alertContainerStyle,
}: Partial<AppUpdateModalProps>) => {
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
                size={16}
                fontFamily={INTER.BOLD}
                color={COLORS.LIGHT_BLACK}
                center
                numberOfLines={2}
                style={{lineHeight: RF(20)}}>
                {title}
              </CustomText>
              <CustomText
                size={10}
                fontFamily={INTER.REGULAR}
                color={COLORS.LIGHT_BLACK}
                center
                numberOfLines={2}
                style={{lineHeight: RF(16), ...SPACING.mt4, ...SPACING.mb3}}>
                {desc}
              </CustomText>
              <CustomIcon
                path={icon}
                resizeMode="cover"
                containerStyle={styles.iconCon}
              />
              <CustomButton
                title={'Continue'}
                titleSize={18}
                titleColor={COLORS.LIGHT_GARY_03}
                titleFontFamily={INTER.BOLD}
                titleStyle={{lineHeight: RF(22)}}
                bgColor={COLORS.LIGHT_BLACK}
                customStyle={{...SPACING.py1}}
                customContainerStyle={{width: '60%'}}
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
    height: RF(80),
    width: RF(80),
    ...SPACING.mb3,
  },
});

export default AppUpdateModal;
