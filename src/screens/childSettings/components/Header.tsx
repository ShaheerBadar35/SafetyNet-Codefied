import {ICONS} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {navigate} from '@services/NavService';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {ROUTES} from '@utils/routes';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface HeaderProps {
  childList: any;
  disabled?: any;
  containerStyle?: ViewStyle | any;
}

const Header = (props: Partial<HeaderProps>) => {
  const {childList = [], disabled = false, containerStyle} = props;
  return (
    <View
      style={[
        styles.container,
        containerStyle,
        childList?.length > 0 && {...SPACING.mb6},
      ]}>
      <View>
        <CustomText
          size={16}
          fontFamily={INTER.MEDIUM}
          color={COLORS.LIGHT_GRAY}
          style={{lineHeight: RF(21)}}>
          Add child
        </CustomText>
        {(childList?.length == 0 || !childList) && (
          <CustomText
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.WHITE}
            style={{lineHeight: RF(16), ...SPACING.mt1}}>
            You can only add up to 4 children.
          </CustomText>
        )}
      </View>
      {(childList?.length == 0 || !childList) && (
        <CustomIcon
          path={ICONS.ADD}
          resizeMode="cover"
          customStyle={styles.icon}
          containerStyle={styles.iconCon}
          onPress={() => !disabled && navigate(ROUTES.ADD_CHILD)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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

export default Header;
