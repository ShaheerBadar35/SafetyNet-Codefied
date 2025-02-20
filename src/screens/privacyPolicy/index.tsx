import {ICONS} from '@assets';
import {useSafeArea} from '@components/safeAreaInsets';
import SimpleHeader from '@components/simpleHeader';
import Wrapper from '@components/wrapper';
import {COLORS} from '@theme/colors';
import {RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {StyleSheet} from 'react-native';
import WebView from 'react-native-webview';

const PrivacyPolicy = () => {
  const insets: any = useSafeArea();
  return (
    <Wrapper>
      <SimpleHeader
        title="Privacy Policy"
        icon={ICONS.HELP}
        containerStyle={{
          paddingTop: insets?.top + RF(36),
          ...SPACING.pb9,
        }}
      />
      <WebView
        source={{
          uri: 'https://www.safetynet.jwnlimited.com/app/privacypolicy/',
        }}
        style={[styles.container, {paddingBottom: insets?.bottom + RF(20)}]}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    paddingHorizontal: WP(8),
    borderTopLeftRadius: RF(7),
    borderTopRightRadius: RF(7),
    backgroundColor: COLORS.PRIMARY,
  },
});

export default PrivacyPolicy;
