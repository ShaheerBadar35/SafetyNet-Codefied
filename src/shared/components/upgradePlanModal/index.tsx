import {ICONS} from '@assets';
import CustomButton from '@components/customButton';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import NestedText2 from '@components/nestedText2';
import {BlurView} from '@react-native-community/blur';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {Modal, StyleSheet, View, ViewStyle} from 'react-native';

interface UpgradePlanModalProps {
  open: boolean;
  title: any;
  desc?: any;
  icon: any;
  showCloseIcon: any;
  onPressClose: any;
  onPress?: any;
  alertContainerStyle?: ViewStyle;
}

const UpgradePlanModal = ({
  open,
  title = '',
  desc = '',
  icon = '',
  showCloseIcon = true,
  onPressClose = () => {},
  onPress = () => {},
  alertContainerStyle,
}: Partial<UpgradePlanModalProps>) => {
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

              <View style={styles.row}>
                <CustomIcon
                  path={ICONS.FAMILY}
                  tintColor={COLORS.PRIMARY}
                  resizeMode={'cover'}
                  containerStyle={styles.familyIconCon}
                />
                <CustomIcon
                  path={ICONS.VECTOR}
                  tintColor={COLORS.PRIMARY}
                  resizeMode={'contain'}
                  containerStyle={styles.vectorIconCon}
                />
                <CustomIcon
                  path={ICONS.SINGLE}
                  tintColor={COLORS.PRIMARY}
                  resizeMode={'cover'}
                  containerStyle={styles.singleIconCon}
                />
              </View>

              <CustomText
                size={20}
                fontFamily={INTER.BOLD}
                color={COLORS.LIGHT_BLACK}
                center
                numberOfLines={2}
                style={{lineHeight: RF(25), ...SPACING.mt6}}>
                Plan Upgraded
              </CustomText>
              <NestedText2
                text={'Your plan has been upgraded from'}
                size={10}
                fontFamily={INTER.REGULAR}
                color={COLORS.LIGHT_BLACK}
                style={{lineHeight: RF(13)}}
                Ntext={' single plan '}
                Nsize={10}
                NfontFamily={INTER.BOLD}
                Ncolor={COLORS.LIGHT_BLACK}
                Nstyle={{lineHeight: RF(13)}}
                N2text={'to '}
                N2size={10}
                N2fontFamily={INTER.REGULAR}
                N2color={COLORS.LIGHT_BLACK}
                N2style={{lineHeight: RF(13)}}
                N3text={'family plan. '}
                N3size={10}
                N3fontFamily={INTER.BOLD}
                N3color={COLORS.LIGHT_BLACK}
                N3style={{lineHeight: RF(13)}}
                N4text={
                  'You will receive a prorated credit for your single plan on the next billing cycle for the remaining days you had left on your single plan.'
                }
                N4size={10}
                N4fontFamily={INTER.REGULAR}
                N4color={COLORS.LIGHT_BLACK}
                N4style={{lineHeight: RF(13)}}
                containerStyle={{...SPACING.mt2}}
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
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  familyIconCon: {
    height: RF(65),
    width: RF(65),
  },
  vectorIconCon: {
    width: RF(90),
    height: RF(65),
  },
  singleIconCon: {
    height: RF(65),
    width: RF(65),
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

export default UpgradePlanModal;
