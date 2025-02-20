import {ICONS} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';

interface PlanCardProps {
  title: string;
  desc: string;
  price: string;
  isSelected?: boolean;
  disabled?: boolean;
  containerStyle?: ViewStyle | any;
  onPress?: any;
}

const PlanCard = (props: Partial<PlanCardProps>) => {
  const {
    title = '',
    desc = '',
    price = 0,
    isSelected = false,
    disabled = false,
    containerStyle,
    onPress = () => {},
  } = props;
  return (
    <Pressable
      style={[
        styles.container,
        containerStyle,
        isSelected && {backgroundColor: COLORS.PRIMARY},
      ]}
      onPress={onPress && onPress}>
      {isSelected ? (
        <CustomIcon
          path={ICONS.ROUND_TICK}
          resizeMode="cover"
          containerStyle={{
            height: RF(25),
            width: RF(25),
            borderRadius: RF(25 / 2),
            ...SPACING.mr8,
          }}
        />
      ) : (
        <View
          style={[
            styles.roundCon,
            {borderWidth: RF(1), borderColor: COLORS.LIGHT_BLACK},
          ]}
        />
      )}
      <View style={{flex: 1}}>
        <CustomText
          size={18}
          fontFamily={isSelected ? INTER.BOLD : INTER.MEDIUM}
          color={isSelected ? COLORS.LIGHT_GARY_03 : COLORS.LIGHT_BLACK}
          style={{lineHeight: RF(23)}}>
          {title}
        </CustomText>
        <CustomText
          size={12}
          fontFamily={isSelected ? INTER.BOLD : INTER.MEDIUM}
          color={isSelected ? COLORS.LIGHT_GARY_03 : COLORS.LIGHT_BLACK}
          style={{
            lineHeight: RF(15),
            marginBottom: RF(2),
            ...SPACING.mt2,
          }}>
          {desc}
        </CustomText>
        <CustomText
          size={12}
          fontFamily={INTER.BOLD}
          color={isSelected ? COLORS.LIGHT_GARY_03 : COLORS.LIGHT_BLACK}
          style={{lineHeight: RF(15)}}>
          ${price}
        </CustomText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: RF(10),
    ...SPACING.px6,
    ...SPACING.py4,
    backgroundColor: COLORS.LIGHT_GRAY_02,
  },
  round: {
    height: RF(10),
    width: RF(10),
  },
  roundCon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: RF(19),
    width: RF(19),
    borderRadius: RF(19 / 2),
    ...SPACING.mr8,
  },
});

export default PlanCard;
