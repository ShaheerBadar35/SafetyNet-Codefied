import {ICONS} from '@assets';
import CustomIcon from '@components/customIcon';
import {navigationRef} from '@services/NavService';
import {RF} from '@theme/responsive';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface HeaderProps {
  showBack?: any;
  containerStyle?: ViewStyle | any;
}

const Header = (props: Partial<HeaderProps>) => {
  const {showBack = true, containerStyle} = props;
  return (
    <View
      style={[
        styles.container,
        showBack && {justifyContent: 'space-between'},
        containerStyle,
      ]}>
      {showBack && (
        <CustomIcon
          path={ICONS.BACK}
          resizeMode={'contain'}
          containerStyle={styles.backIconCon}
          onPress={() => navigationRef?.current?.goBack()}
        />
      )}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <CustomIcon
          path={ICONS.APP}
          resizeMode={'cover'}
          containerStyle={styles.iconCon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconCon: {
    height: RF(15),
    width: RF(20),
  },
  iconCon: {
    height: RF(114),
    width: RF(92),
  },
});

export default Header;
