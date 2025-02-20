import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface BulletPointProps {
  heading?: any;
  text?: any;
  containerStyle?: ViewStyle | any;
}

const BulletPoint = (props: Partial<BulletPointProps>) => {
  const {heading = '', text = '', containerStyle} = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.bulletCon} />
      <CustomText
        size={10}
        fontFamily={INTER.BOLD}
        color={COLORS.LIGHT_BLACK}
        style={{lineHeight: RF(16)}}>
        {heading}:{' '}
      </CustomText>
      <CustomText
        size={10}
        fontFamily={INTER.REGULAR}
        color={COLORS.LIGHT_BLACK}
        style={{lineHeight: RF(16)}}>
        {text}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bulletCon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: RF(7),
    width: RF(7),
    borderRadius: RF(7 / 2),
    borderWidth: RF(2),
    borderColor: COLORS.LIGHT_BLACK,
    ...SPACING.mr1,
    backgroundColor: COLORS.WHITE,
  },
});

export default BulletPoint;
