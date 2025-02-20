import {useSafeArea} from '@components/safeAreaInsets';
import {COLORS} from '@theme/colors';
import {RF, isTablet} from '@theme/responsive';
import {ANDROID} from '@utils/constants';
import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
const {WHITE} = COLORS;

interface Props {
  children: any;
  noPaddingTop: any;
  noPaddingBottom: any;
  bgColor?: string;
  barStyle: 'dark-content' | 'default' | 'light-content';
  tabBarHeight?: number;
}
const Wrapper = ({
  barStyle = 'dark-content',
  children,
  noPaddingTop,
  noPaddingBottom,
  bgColor = WHITE,
  tabBarHeight,
}: Partial<Props>) => {
  const insets: any = useSafeArea();
  const paddingTop = noPaddingTop
    ? 0
    : isTablet
    ? insets.top + RF(12)
    : insets.top;
  const paddingBottom = tabBarHeight
    ? tabBarHeight
    : noPaddingBottom
    ? 0
    : ANDROID
    ? RF(12)
    : insets.bottom;

  return (
    <>
      <StatusBar
        barStyle={barStyle}
        translucent
        backgroundColor="transparent"
      />
      <View
        style={[
          styles.container,
          {
            paddingBottom,
            paddingTop,
            backgroundColor: bgColor,
          },
        ]}>
        {children}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Wrapper;
