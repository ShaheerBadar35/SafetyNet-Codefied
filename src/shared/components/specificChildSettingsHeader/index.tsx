import {ICONS} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {navigationRef} from '@services/NavService';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

interface SpecificChildSettingsHeaderProps {
  name: string;
  setShowEditModal?: any;
  onPressChangePassword?: any;
}

const SpecificChildSettingsHeader = (
  props: Partial<SpecificChildSettingsHeaderProps>,
) => {
  const {
    name = '',
    setShowEditModal = () => {},
    onPressChangePassword = () => {},
  } = props;
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
          Settings for {name}
        </CustomText>
        <CustomText
          size={10}
          fontFamily={INTER.REGULAR}
          color={COLORS.LIGHT_BLACK}
          numberOfLines={1}
          style={{lineHeight: RF(16), ...SPACING.mt2}}>
          Edit specific settings for your child
        </CustomText>
      </View>
      <View
        style={[styles.row, {justifyContent: 'space-between', ...SPACING.mt4}]}>
        <Pressable
          style={[styles.row]}
          onPress={() => setShowEditModal && setShowEditModal(true)}>
          <CustomIcon
            path={ICONS.RENAME}
            resizeMode="cover"
            containerStyle={{height: RF(13), width: RF(13), ...SPACING.mr1}}
          />
          <CustomText
            size={10}
            fontFamily={INTER.MEDIUM}
            color={COLORS.PRIMARY}
            numberOfLines={1}
            style={{lineHeight: RF(12), textDecorationLine: 'underline'}}>
            Rename
          </CustomText>
        </Pressable>
        <CustomText
          size={10}
          fontFamily={INTER.MEDIUM}
          color={COLORS.PRIMARY}
          numberOfLines={1}
          onPress={onPressChangePassword && onPressChangePassword}
          style={{lineHeight: RF(12), textDecorationLine: 'underline'}}>
          Change Password
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
    ...SPACING.pb3,
    backgroundColor: COLORS.LIGHT_GRAY_04,
  },
  iconCon: {
    width: RF(9),
    height: RF(15),
    ...SPACING.mb9,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default SpecificChildSettingsHeader;
