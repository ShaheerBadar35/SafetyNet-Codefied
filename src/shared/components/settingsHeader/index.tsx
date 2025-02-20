import {ICONS, IMAGES} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {useSafeArea} from '@components/safeAreaInsets';
import {navigationRef} from '@services/NavService';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const SettingsHeader = () => {
  const insets: any = useSafeArea();
  return (
    <View style={[styles.container, {paddingTop: insets?.top + RF(40)}]}>
      <View style={styles.subCon}>
        <CustomIcon
          path={ICONS.BACK}
          resizeMode="cover"
          containerStyle={styles.iconCon}
          onPress={() => navigationRef?.current?.goBack()}
        />
        <CustomText
          size={24}
          fontFamily={INTER.BOLD}
          color={COLORS.LIGHT_BLACK}
          style={{lineHeight: RF(31)}}>
          Settings
        </CustomText>
      </View>
      <CustomIcon
        path={IMAGES.Settings}
        resizeMode="contain"
        containerStyle={styles.settingsCon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: HP(30),
    backgroundColor: COLORS.LIGHT_GRAY_04,
  },
  subCon: {
    paddingLeft: WP(8),
  },
  iconCon: {
    height: RF(15),
    width: RF(9),
    ...SPACING.mb10,
  },
  settingsCon: {
    position: 'absolute',
    bottom: RF(20),
    right: -RF(20),
    height: HP(20),
    width: HP(20),
  },
});

export default SettingsHeader;
