import {ICONS} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import TextWrapper from '@components/textWrapper';
import {navigationRef} from '@services/NavService';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {handleEditImage} from '../helper';

interface HeaderProps {
  imgPath?: any;
  setImgPath?: any;
  containerStyle?: ViewStyle | any;
}

const Header = (props: Partial<HeaderProps>) => {
  const {imgPath = '', setImgPath = () => {}, containerStyle} = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.row, {width: '100%'}]}>
        <CustomIcon
          path={ICONS.BACK}
          resizeMode="contain"
          containerStyle={styles.iconCon}
          onPress={() => navigationRef?.current?.goBack()}
        />
        <CustomText
          size={24}
          fontFamily={INTER.MEDIUM}
          color={COLORS.LIGHT_BLACK}
          center
          style={{
            flex: 1,
            lineHeight: RF(31),
            textAlign: 'center',
          }}
          numberOfLines={1}>
          Edit Profile
        </CustomText>
      </View>
      <CustomIcon
        path={imgPath ? {uri: imgPath} : ICONS.DUMMY_PROFILE}
        resizeMode="cover"
        customStyle={styles.profile}
        containerStyle={styles.profileCon}
        onPress={() => handleEditImage(setImgPath)}
      />
      <TextWrapper
        size={15}
        fontFamily={INTER.REGULAR}
        color={COLORS.PRIMARY}
        center
        style={{lineHeight: RF(19), ...SPACING.mt3}}
        numberOfLines={1}
        onPress={() => handleEditImage(setImgPath)}>
        Edit
      </TextWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HP(40),
    width: '100%',
    paddingHorizontal: WP(8),
    backgroundColor: COLORS.LIGHT_GRAY_04,
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
  },
  profile: {
    height: RF(131),
    width: RF(131),
    borderRadius: RF(131 / 2),
  },
  profileCon: {
    height: RF(131),
    width: RF(131),
    borderRadius: RF(131 / 2),
    ...SPACING.mt8,
    alignSelf: 'center',
  },
});

export default Header;
