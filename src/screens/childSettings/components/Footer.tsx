import {ICONS} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {navigate} from '@services/NavService';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {ADD_ACCOUNT_LIMIT_REACHED_MESSAGE, TOAST_TYPES} from '@utils/constants';
import {ROUTES} from '@utils/routes';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Toast from 'react-native-toast-message';

interface FooterProps {
  childList: any;
  disabled?: boolean;
}

const Footer = (props: Partial<FooterProps>) => {
  const {childList = [], disabled = false} = props;
  return !childList ? (
    <></>
  ) : (
    <View style={styles.container}>
      <CustomText
        size={10}
        fontFamily={INTER.REGULAR}
        color={COLORS.DARK_GRAY}
        style={{lineHeight: RF(16)}}>
        You can only add up to 4 children.
      </CustomText>
      <CustomIcon
        path={ICONS.ADD}
        resizeMode="cover"
        tintColor={disabled ? COLORS.DARK_GRAY : COLORS.WHITE}
        customStyle={styles.icon}
        containerStyle={[
          styles.iconCon,
          disabled && {backgroundColor: COLORS.LIGHT_GRAY_02},
        ]}
        onPress={() =>
          disabled
            ? Toast.show({
                type: TOAST_TYPES.ERROR,
                props: {
                  title: ADD_ACCOUNT_LIMIT_REACHED_MESSAGE,
                },
              })
            : navigate(ROUTES.ADD_CHILD)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    height: RF(12),
    width: RF(12),
  },
  iconCon: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RF(7),
    ...SPACING.py2,
    ...SPACING.px4,
    backgroundColor: COLORS.PRIMARY,
  },
});

export default Footer;
