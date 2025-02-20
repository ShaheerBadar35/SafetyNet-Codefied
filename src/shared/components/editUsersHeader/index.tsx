import {ICONS, IMAGES} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {navigationRef} from '@services/NavService';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface EditUsersHeader {
  containerStyle?: ViewStyle | any;
}

const EditUsersHeader = (props: Partial<EditUsersHeader>) => {
  const {containerStyle} = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{width: '50%'}}>
        <CustomIcon
          path={ICONS.BACK}
          resizeMode="cover"
          containerStyle={styles.backIcon}
          onPress={() => navigationRef?.current?.goBack()}
        />
        <CustomText
          size={24}
          fontFamily={INTER.BOLD}
          color={COLORS.LIGHT_BLACK}
          style={{lineHeight: RF(31), maxWidth: '80%', ...SPACING.pl2}}>
          Edit users in plan
        </CustomText>
      </View>
      <CustomIcon
        path={ICONS.LOGO_TRANSPARENT}
        resizeMode="cover"
        containerStyle={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    height: HP(30),
    paddingHorizontal: WP(8),
    ...SPACING.pb7,
    backgroundColor: COLORS.LIGHT_GRAY_04,
  },
  backIcon: {
    height: RF(15),
    width: RF(9),
    ...SPACING.mb9,
  },
  logo: {
    position: 'absolute',
    height: RF(80),
    width: RF(152),
    right: RF(20),
    bottom: RF(47),
  },
});

export default EditUsersHeader;
