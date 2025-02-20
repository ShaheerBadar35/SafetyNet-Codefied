import {ICONS} from '@assets';
import CustomButton from '@components/customButton';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {ADD_CHILD_ACCOUNTS_MESSAGE} from '@utils/constants';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface FooterProps {
  isToggleDisabled?: boolean;
  isBtnDisabled?: boolean;
  isBtnLoading?: boolean;
  onPressAdd?: any;
  onPressBtn?: any;
}

const Footer = (props: Partial<FooterProps>) => {
  const {
    isToggleDisabled = false,
    isBtnDisabled = false,
    isBtnLoading = false,
    onPressAdd = () => {},
    onPressBtn = () => {},
  } = props;
  return (
    <View style={[styles.container]}>
      <CustomIcon
        path={ICONS.ADD}
        resizeMode="cover"
        customStyle={styles.icon}
        containerStyle={[
          styles.iconCon,
          isBtnDisabled && {backgroundColor: COLORS.LIGHT_GRAY_02},
        ]}
        onPress={isToggleDisabled ? () => {} : !isBtnDisabled && onPressAdd}
      />
      <View style={styles.messageContainer}>
        <CustomText
          size={12}
          fontFamily={INTER.LIGHT}
          color={COLORS.DARK_GRAY}
          style={{lineHeight: RF(19)}}>
          Message
        </CustomText>
        <View style={styles.messageCon}>
          <CustomText
            size={12}
            fontFamily={INTER.REGULAR}
            color={COLORS.LIGHT_GRAY}
            style={{lineHeight: RF(19)}}>
            {ADD_CHILD_ACCOUNTS_MESSAGE}
          </CustomText>
        </View>
        <CustomButton
          title="Add Child"
          titleSize={18}
          titleFontFamily={INTER.BOLD}
          titleColor={COLORS.LIGHT_GRAY}
          isloading={isBtnLoading}
          titleStyle={{lineHeight: RF(22)}}
          customStyle={{...SPACING.py4}}
          onPress={isToggleDisabled ? () => {} : onPressBtn && onPressBtn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...SPACING.mt1,
  },
  icon: {
    height: RF(12),
    width: RF(12),
  },
  iconCon: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: RF(7),
    ...SPACING.py2,
    ...SPACING.px4,
    backgroundColor: COLORS.PRIMARY,
  },
  messageContainer: {
    ...SPACING.mt15,
  },
  messageCon: {
    borderRadius: RF(7),
    borderWidth: RF(1),
    borderColor: COLORS.LIGHT_GRAY,
    ...SPACING.px4,
    ...SPACING.pt7,
    ...SPACING.pb15,
    ...SPACING.mt1,
    ...SPACING.mb8,
    backgroundColor: COLORS.DARK_GRAY_05,
  },
});

export default Footer;
