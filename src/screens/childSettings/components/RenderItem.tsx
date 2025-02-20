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
import {StyleSheet, View} from 'react-native';

interface RenderItemProps {
  item: any;
  index: any;
  disabled?: boolean;
  containerStyle?: any;
}

const RenderItem = (props: Partial<RenderItemProps>) => {
  const {item = {}, index, disabled = false, containerStyle} = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <View>
        <CustomText
          size={12}
          fontFamily={INTER.BOLD}
          color={COLORS.LIGHT_GRAY}
          numberOfLines={1}
          style={{lineHeight: RF(19)}}>
          {item?.name}
        </CustomText>
        <CustomText
          size={10}
          fontFamily={INTER.REGULAR}
          color={COLORS.LIGHT_GRAY}
          numberOfLines={1}
          style={{lineHeight: RF(16), ...SPACING.mt1}}>
          {item?.username}
        </CustomText>
      </View>
      <CustomIcon
        path={ICONS.EDIT}
        tintColor={COLORS.WHITE}
        resizeMode="cover"
        containerStyle={styles.iconCon}
        onPress={() =>
          !disabled &&
          navigate(ROUTES.SPECIFIC_CHILD_SETTINGS, {
            child: item,
          })
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
    alignItems: 'flex-end',
    borderBottomWidth: RF(1),
    borderBottomColor: COLORS.WHITE,
    ...SPACING.mx6,
    ...SPACING.pb3,
  },
  iconCon: {
    height: RF(15),
    width: RF(15),
  },
});

export default RenderItem;
