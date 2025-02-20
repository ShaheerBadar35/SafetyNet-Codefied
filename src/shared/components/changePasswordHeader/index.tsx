import {ICONS, IMAGES} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {useSafeArea} from '@components/safeAreaInsets';
import {navigationRef} from '@services/NavService';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF, WP} from '@theme/responsive';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface ChangePasswordHeaderProps {
  containerStyle?: ViewStyle | any;
}

const ChangePasswordHeader = (props: Partial<ChangePasswordHeaderProps>) => {
  const {containerStyle} = props;
  const insets: any = useSafeArea();
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.subContainer, {paddingTop: insets?.top + RF(40)}]}>
        <CustomIcon
          path={ICONS.BACK}
          resizeMode="contain"
          containerStyle={styles.backIcon}
          onPress={() => navigationRef?.current?.goBack()}
        />
        <CustomText
          size={24}
          fontFamily={INTER.BOLD}
          color={COLORS.LIGHT_GRAY}
          style={{lineHeight: RF(31)}}>
          Change{'\n'}
          Password
        </CustomText>
      </View>
      <CustomIcon
        path={IMAGES.LOCK}
        resizeMode="contain"
        containerStyle={styles.lockImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HP(30),
    width: '100%',
    backgroundColor: COLORS.PRIMARY_DARK,
  },
  subContainer: {
    paddingHorizontal: WP(8),
  },
  backIcon: {
    height: RF(15),
    width: RF(15),
    marginBottom: RF(52),
  },
  lockImage: {
    position: 'absolute',
    height: HP(22),
    width: HP(20),
    right: RF(-10),
    bottom: RF(38),
  },
});

export default ChangePasswordHeader;
