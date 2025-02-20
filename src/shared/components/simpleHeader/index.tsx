import {ICONS} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF, WP} from '@theme/responsive';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface SimpleHeaderProps {
  title: string;
  icon?: string;
  containerStyle?: ViewStyle | any;
}

const SimpleHeader = (props: Partial<SimpleHeaderProps>) => {
  const {title = '', icon, containerStyle} = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <CustomText
        size={24}
        fontFamily={INTER.BOLD}
        color={COLORS.LIGHT_BLACK}
        style={{lineHeight: RF(31), maxWidth: '70%'}}
        numberOfLines={1}>
        {title}
      </CustomText>
      {icon && (
        <CustomIcon
          path={icon}
          resizeMode="cover"
          containerStyle={styles.icon}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WP(8),
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_GRAY_04,
  },
  icon: {
    height: RF(51),
    width: RF(51),
    borderRadius: RF(51 / 2),
  },
});

export default SimpleHeader;
