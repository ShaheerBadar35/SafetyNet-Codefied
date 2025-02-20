import {ICONS} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const DROPDOWN_DATA: any = [
  {
    id: 1,
    icon: ICONS.EDIT2,
    title: 'Edit Profile',
    onPress: () => {},
  },
  {
    id: 2,
    icon: ICONS.SETTINGS,
    title: 'Settings',
    onPress: () => {},
  },
  {
    id: 3,
    icon: ICONS.LOGOUT,
    title: 'Logout',
    onPress: () => {},
  },
];

interface DropDownProps {
  profile?: any;
}

const DropDown = (props: Partial<DropDownProps>) => {
  const {profile} = props;
  return (
    <SelectDropdown
      showsVerticalScrollIndicator={false}
      data={DROPDOWN_DATA}
      dropdownStyle={{
        position: 'absolute',
        borderRadius: RF(5),
        ...SPACING.p1,
        maxWidth: WP(100),
      }}
      rowStyle={styles.dropdownRowStyle}
      renderCustomizedButtonChild={(value: any) => (
        <CustomIcon
          path={profile}
          resizeMode="cover"
          containerStyle={styles.profileCon}
        />
      )}
      renderCustomizedRowChild={(item, index) => {
        return (
          <View style={styles.row}>
            <CustomIcon
              path={item?.icon}
              resizeMode="cover"
              tintColor={COLORS.LIGHT_BLACK}
              containerStyle={styles.iconCon}
            />
            <CustomText
              size={10}
              fontFamily={INTER.REGULAR}
              color={COLORS.LIGHT_BLACK}
              style={{lineHeight: RF(16)}}>
              {item?.title}
            </CustomText>
          </View>
        );
      }}
      onSelect={(selectedItem, index) => {}}
    />
  );
};

const styles = StyleSheet.create({
  profileCon: {
    height: RF(57),
    width: RF(57),
    borderRadius: RF(57 / 2),
  },
  dropDownIcon: {
    width: RF(24),
    height: RF(24),
  },
  dropDownIconContainer: {
    width: RF(24),
    height: RF(24),
    marginTop: 100,
  },
  dropdownRowStyle: {
    alignSelf: 'flex-end',
    height: RF(35),
    borderBottomColor: COLORS.LIGHT_BLACK,
    ...SPACING.pl2,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconCon: {
    height: RF(15),
    width: RF(15),
    ...SPACING.mr1,
  },
});

export default DropDown;
