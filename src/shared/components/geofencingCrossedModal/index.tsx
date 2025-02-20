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

interface GeofencingCrossedModalProps {
  open: boolean;
  img?: any;
  child_name?: any;
  location_name?: any;
  contacts?: any;
  onPressClose: any;
  onPressBtn: any;
  alertContainerStyle?: ViewStyle;
}

const GeofencingCrossedModal = ({
  open,
  img = '',
  child_name = '',
  location_name = '',
  contacts = [],
  onPressClose = () => {},
  onPressBtn = () => {},
  alertContainerStyle,
}: Partial<GeofencingCrossedModalProps>) => {
  let names = '';
  contacts?.map((contact: any, index: any) => {
    names += contact?.name + (index < contacts.length - 1 ? ', ' : '');
  });
   // $&
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
                path={ICONS.WARNING}
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
                Warning
              </CustomText>
              <NestedText2
                text={child_name}
                size={10}
                fontFamily={INTER.BOLD}
                color={COLORS.LIGHT_BLACK}
                numberOfLines={2}
                Ntext={' has went out of '}
                Nsize={10}
                Ncolor={COLORS.LIGHT_BLACK}
                NfontFamily={INTER.REGULAR}
                Nstyle={{lineHeight: RF(16)}}
                N2text={location_name}
                N2size={10}
                N2color={COLORS.LIGHT_BLACK}
                N2fontFamily={INTER.BOLD}
                N2style={{lineHeight: RF(16)}}
                style={{
                  lineHeight: RF(16),
                  maxWidth: '90%',
                }}
                containerStyle={{...SPACING.my3}}
              />
              <CustomIcon
                path={img ? {uri: img} : ICONS.DUMMY_PROFILE}
                resizeMode={'cover'}
                containerStyle={styles.imgCon}
              />
              <CustomText
                size={12}
                fontFamily={INTER.BOLD}
                color={COLORS.LIGHT_BLACK}
                center
                numberOfLines={1}
                style={{lineHeight: RF(19), ...SPACING.mb9}}>
                {child_name}
              </CustomText>
              <NestedText2
                text={names}
                size={10}
                fontFamily={INTER.BOLD}
                color={COLORS.LIGHT_BLACK}
                numberOfLines={2}
                Ntext={' have been alerted.'}
                Nsize={10}
                Ncolor={COLORS.LIGHT_BLACK}
                NfontFamily={INTER.REGULAR}
                Nstyle={{lineHeight: RF(16)}}
                style={{
                  lineHeight: RF(16),
                  maxWidth: '90%',
                }}
                containerStyle={{...SPACING.mt3, ...SPACING.mb5}}
              />
              <CustomButton
                title="Done"
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
  imgCon: {
    alignSelf: 'center',
    height: RF(55),
    width: RF(55),
    borderRadius: RF(55 / 2),
    ...SPACING.mb2,
  },
});

export default GeofencingCrossedModal;
