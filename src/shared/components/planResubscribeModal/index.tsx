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

interface PlanResubscribeModalProps {
  open: boolean;
  onPressClose: any;
  onPressBtn: any;
  alertContainerStyle?: ViewStyle;
}

const PlanResubscribeModal = ({
  open,
  onPressClose = () => {},
  onPressBtn = () => {},
  alertContainerStyle,
}: Partial<PlanResubscribeModalProps>) => {
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
              <CustomIcon
                path={ICONS.RESUBSCRIBE}
                resizeMode="cover"
                customStyle={styles.removalIcon}
                containerStyle={styles.removalIconCon}
              />
              <CustomText
                size={20}
                fontFamily={INTER.BOLD}
                color={COLORS.LIGHT_BLACK}
                center
                numberOfLines={2}
                style={{lineHeight: RF(26)}}>
                Resubscribe
              </CustomText>
              <CustomText
                size={10}
                fontFamily={INTER.REGULAR}
                color={COLORS.LIGHT_BLACK}
                center
                numberOfLines={5}
                style={{
                  lineHeight: RF(16),
                  maxWidth: '90%',
                  ...SPACING.mt3,
                  ...SPACING.mb5,
                }}>
                You have so many days remaining of your current plan. Please
                select a plan to resubscribe to make sure you don’t lose access
                to Safety Net features.
              </CustomText>
              <CustomButton
                title="Select new plan"
                titleSize={18}
                titleFontFamily={INTER.BOLD}
                titleColor={COLORS.LIGHT_GRAY_04}
                titleStyle={{lineHeight: RF(22)}}
                bgColor={COLORS.PRIMARY}
                customStyle={{...SPACING.py1}}
                customContainerStyle={{width: '60%'}}
                onPress={onPressBtn}
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
  removalIcon: {
    height: RF(90),
    width: RF(90),
  },
  removalIconCon: {
    height: RF(90),
    width: RF(90),
    ...SPACING.mb4,
  },
});

export default PlanResubscribeModal;
