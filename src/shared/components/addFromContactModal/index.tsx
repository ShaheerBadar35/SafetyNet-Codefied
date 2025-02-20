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

interface AddFromContactModalProps {
  open: boolean;
  selected: any;
  setSelected: any;
  onPressClose: any;
  onPressBtn: any;
  alertContainerStyle?: ViewStyle;
}

const AddFromContactModal = ({
  open,
  selected = '',
  setSelected = () => {},
  onPressClose = () => {},
  onPressBtn = () => {},
  alertContainerStyle,
}: Partial<AddFromContactModalProps>) => {
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
              <CustomText
                center
                size={20}
                fontFamily={INTER.BOLD}
                color={COLORS.LIGHT_BLACK}
                style={{lineHeight: RF(25), ...SPACING.mt1, ...SPACING.mb7}}>
                Add contact from
              </CustomText>
              <CustomButton
                title="Existing contacts"
                titleSize={18}
                titleFontFamily={INTER.MEDIUM}
                titleColor={selected == 1 ? COLORS.WHITE : COLORS.LIGHT_BLACK}
                bgColor={selected == 1 ? COLORS.PRIMARY : COLORS.LIGHT_GRAY_02}
                titleStyle={{lineHeight: RF(22)}}
                customStyle={{...SPACING.py3}}
                customContainerStyle={{width: '100%', ...SPACING.mb3}}
                onPress={() => setSelected && setSelected(1)}
              />
              <CustomButton
                title="New contact"
                titleSize={18}
                titleFontFamily={INTER.MEDIUM}
                titleColor={selected == 2 ? COLORS.WHITE : COLORS.LIGHT_BLACK}
                bgColor={selected == 2 ? COLORS.PRIMARY : COLORS.LIGHT_GRAY_02}
                titleStyle={{lineHeight: RF(22)}}
                customStyle={{...SPACING.py3}}
                customContainerStyle={{width: '100%', ...SPACING.mb8}}
                onPress={() => setSelected && setSelected(2)}
              />
              <CustomButton
                title="Select"
                titleSize={18}
                titleFontFamily={INTER.BOLD}
                titleColor={selected ? COLORS.WHITE : COLORS.LIGHT_BLACK}
                bgColor={selected ? COLORS.PRIMARY : COLORS.LIGHT_GRAY_02}
                titleStyle={{lineHeight: RF(23)}}
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
  crossIcon: {
    height: RF(19),
    width: RF(19),
  },
  crossIconCon: {
    width: '100%',
    alignSelf: 'flex-end',
  },
});

export default AddFromContactModal;
