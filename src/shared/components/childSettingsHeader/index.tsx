import {ICONS} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {useSafeArea} from '@components/safeAreaInsets';
import Toggle from '@components/toggle';
import {navigationRef} from '@services/NavService';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface ChildSettingsHeaderProps {
  selected: boolean;
  setSelected: any;
  showDescription?: boolean;
  onPressSelected: any;
}

const ChildSettingsHeader = (props: Partial<ChildSettingsHeaderProps>) => {
  const {
    selected = false,
    setSelected = () => {},
    showDescription = true,
    onPressSelected = () => {},
  } = props;
  const insets: any = useSafeArea();
  return (
    <View style={[styles.container, {paddingTop: insets?.top + RF(40)}]}>
      <CustomIcon
        path={ICONS.BACK}
        resizeMode="cover"
        containerStyle={styles.iconCon}
        onPress={() => navigationRef?.current?.goBack()}
      />
      <View
        style={[
          styles.row,
          showDescription ? {...SPACING.mb9} : {...SPACING.mb15},
        ]}>
        <View style={{maxWidth: '70%'}}>
          <CustomText
            size={24}
            fontFamily={INTER.BOLD}
            color={COLORS.LIGHT_BLACK}
            numberOfLines={1}
            style={{lineHeight: RF(31)}}>
            Child Settings
          </CustomText>
          {showDescription && (
            <CustomText
              size={10}
              fontFamily={INTER.REGULAR}
              color={COLORS.LIGHT_BLACK}
              numberOfLines={2}
              style={{lineHeight: RF(16), ...SPACING.mt2}}>
              Add or edit your children’s settings in app
            </CustomText>
          )}
        </View>
        <Toggle
          color={COLORS.LIGHT_BLACK}
          selected={selected}
          setSelected={setSelected}
          onPress={onPressSelected && onPressSelected}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: HP(30),
    justifyContent: 'space-between',
    paddingHorizontal: WP(8),
    backgroundColor: COLORS.LIGHT_GRAY_04,
  },
  iconCon: {
    width: RF(9),
    height: RF(15),
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

export default ChildSettingsHeader;
