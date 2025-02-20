import { ICONS } from '@assets';
import ClipboardText from '@components/clipboardText';
import CustomFooter from '@components/customFooter';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import { useSafeArea } from '@components/safeAreaInsets';
import SimpleHeader from '@components/simpleHeader';
import TextWrapper from '@components/textWrapper';
import Wrapper from '@components/wrapper';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { navigate } from '@services/NavService';
import { COLORS } from '@theme/colors';
import { INTER } from '@theme/fonts';
import { RF, WP } from '@theme/responsive';
import { SPACING } from '@theme/spacing';
import { CONTACT_US_EMAIL, CONTACT_US_TEXT } from '@utils/constants';
import { ROUTES } from '@utils/routes';
import React from 'react';
import { ScrollView, StyleSheet, View, Linking } from 'react-native';
import CustomButton from '@components/customButton';

const ContactUs = () => {
  const tabBarHeight: any = useBottomTabBarHeight();
  const insets: any = useSafeArea();
  return (
    <Wrapper barStyle="dark-content" noPaddingTop noPaddingBottom>
      <SimpleHeader
        title="Contact us"
        containerStyle={{
          paddingTop: insets?.top + RF(36),
          ...SPACING.pb9,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <CustomText
          size={15}
          fontFamily={INTER.BOLD}
          color={COLORS.LIGHT_GARY_03}
          style={{ lineHeight: RF(19) }}>
          {CONTACT_US_TEXT}
        </CustomText>
        <ClipboardText
          text={CONTACT_US_EMAIL}
          containerStyle={{ ...SPACING.mt3 }}
        />
        <CustomButton
          title="Contact Us"
          titleSize={16}
          titleFontFamily={INTER.BOLD}
          titleColor={COLORS.BLACK} 
          bgColor={COLORS.WHITE}      
          customContainerStyle={{
            marginTop: RF(20),
            width: WP(40),
            borderWidth: 1,
            borderColor: COLORS.BLACK, // Green border
            borderRadius: RF(8),
            elevation: 3, // Android shadow
            shadowColor: '#000', // iOS shadow
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            alignSelf: 'center',
          }}
          onPress={() => {
            Linking.openURL(`mailto:${CONTACT_US_EMAIL}`);
          }}
        />

      </ScrollView>
      <View style={styles.logoCon}>
        <CustomIcon
          path={ICONS.LOGO_TRANSPARENT}
          resizeMode="contain"
          customStyle={styles.logo}
          containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        />
        <View
          style={[
            styles.bottom,
            { paddingBottom: tabBarHeight + insets?.bottom },
          ]}>
          <View style={styles.row}>
            <TextWrapper
              size={12}
              fontFamily={INTER.REGULAR}
              color={COLORS.LIGHT_BLACK}
              style={{ lineHeight: RF(16), textDecorationLine: 'underline' }}
              numberOfLines={1}
              onPress={() => navigate(ROUTES.TERMS_AND_CONDITIONS)}>
              Terms of Service
            </TextWrapper>
            <CustomText
              size={12}
              fontFamily={INTER.REGULAR}
              color={COLORS.LIGHT_BLACK}
              style={{ lineHeight: RF(16), ...SPACING.mx1 }}
              numberOfLines={1}>
              |
            </CustomText>
            <TextWrapper
              size={12}
              fontFamily={INTER.REGULAR}
              color={COLORS.LIGHT_BLACK}
              style={{ lineHeight: RF(16), textDecorationLine: 'underline' }}
              numberOfLines={1}
              onPress={() => navigate(ROUTES.PRIVACY_POLICY)}>
              Privacy Policy
            </TextWrapper>
          </View>
          <CustomFooter containerStyle={{ ...SPACING.mt3 }} />
        </View>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    top: -RF(12),
    display: 'flex',
    flex: 1,
    paddingHorizontal: WP(8),
    borderTopLeftRadius: RF(7),
    borderTopRightRadius: RF(7),
    ...SPACING.pt5,
    backgroundColor: COLORS.PRIMARY,
  },
  logo: {
    width: WP(60),
    height: WP(30),
  },
  logoCon: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContactUs;
