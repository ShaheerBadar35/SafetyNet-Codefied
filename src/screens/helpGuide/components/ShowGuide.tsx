import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface ShowGuideProps {
  heading: string;
  desc1: string;
  desc2?: string;
  containerStyle?: ViewStyle | any;
}

const ShowGuide = (props: Partial<ShowGuideProps>) => {
  const {heading = '', desc1 = '', desc2 = '', containerStyle} = props;
  return (
    <View style={styles.container}>
      <CustomText
        size={15}
        fontFamily={INTER.BOLD}
        color={COLORS.LIGHT_GARY_03}
        style={{lineHeight: RF(19)}}
        numberOfLines={1}>
        {heading}
      </CustomText>
      <View style={{...SPACING.pl3, ...SPACING.py4}}>
        <CustomText
          size={15}
          fontFamily={INTER.REGULAR}
          color={COLORS.LIGHT_GARY_03}
          style={{lineHeight: RF(19)}}>
          {desc1}
        </CustomText>
        {desc2 && (
          <CustomText
            size={15}
            fontFamily={INTER.REGULAR}
            color={COLORS.LIGHT_GARY_03}
            style={{lineHeight: RF(19), ...SPACING.pt6}}>
            {desc2}
          </CustomText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default ShowGuide;
