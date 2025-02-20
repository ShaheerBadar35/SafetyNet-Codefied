import {ICONS} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';

interface ChevronNaivgationProps {
  title: string;
  onPress: any;
  containerStyle?: ViewStyle | any;
}

const ChevronNaivgation = (props: Partial<ChevronNaivgationProps>) => {
  const {title = '', onPress = () => {}, containerStyle} = props;
  return (
    <Pressable
      style={[styles.container, containerStyle]}
      onPress={onPress && onPress}>
      <CustomText
        size={18}
        fontFamily={INTER.BOLD}
        color={COLORS.LIGHT_GRAY_04}
        style={{lineHeight: RF(22), maxWidth: '80%'}}
        numberOfLines={2}>
        {title}
      </CustomText>
      <CustomIcon
        path={ICONS.BACK}
        tintColor={COLORS.LIGHT_GRAY_04}
        resizeMode="cover"
        containerStyle={styles.iconCon}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: RF(7),
    borderWidth: RF(3),
    borderColor: COLORS.PRIMARY,
    ...SPACING.py3,
    ...SPACING.px4,
  },
  iconCon: {
    width: RF(9),
    height: RF(15),
    transform: [{rotate: '180deg'}],
  },
});

export default ChevronNaivgation;
