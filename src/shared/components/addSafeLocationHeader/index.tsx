import {ICONS} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {navigationRef} from '@services/NavService';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface AddSafeLocationHeaderProps {}

const AddSafeLocationHeader = (props: Partial<AddSafeLocationHeaderProps>) => {
  return (
    <View style={styles.container}>
      <CustomIcon
        path={ICONS.BACK}
        resizeMode="cover"
        containerStyle={styles.iconCon}
        onPress={() => navigationRef?.current?.goBack()}
      />
      <View>
        <CustomText
          size={24}
          fontFamily={INTER.BOLD}
          color={COLORS.LIGHT_BLACK}
          numberOfLines={1}
          style={{lineHeight: RF(31)}}>
          Safe Location
        </CustomText>
        <CustomText
          size={10}
          fontFamily={INTER.REGULAR}
          color={COLORS.LIGHT_BLACK}
          numberOfLines={1}
          style={{lineHeight: RF(16), ...SPACING.mt2}}>
          Set and name a safe location for Emily
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    width: '100%',
    height: HP(30),
    paddingHorizontal: WP(8),
    ...SPACING.pb9,
    backgroundColor: COLORS.LIGHT_GRAY_04,
  },
  iconCon: {
    width: RF(9),
    height: RF(15),
    ...SPACING.mb9,
  },
});

export default AddSafeLocationHeader;
