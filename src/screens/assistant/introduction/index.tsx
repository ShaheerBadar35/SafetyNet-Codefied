import {ICONS} from '@assets';
import CustomButton from '@components/customButton';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import NestedText2 from '@components/nestedText2';
import {useSafeArea} from '@components/safeAreaInsets';
import Wrapper from '@components/wrapper';
import {navigate} from '@services/NavService';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {ROUTES} from '@utils/routes';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import BulletPoint from '../components/BulletPoint';
import Header from '../components/Header';
import {useSelector} from 'react-redux';
import {hitGoogleAssistantWalkthroughAPI} from '../helper';

const Introduction = () => {
  const {user} = useSelector((state: any) => state.root.user);
  const insets: any = useSafeArea();
  return (
    <Wrapper noPaddingBottom>
      <View style={styles.contianer}>
        <Header showBack={false} containerStyle={{...SPACING.mb5}} />
        <ScrollView style={styles.scrollCon}>
          <CustomText
            size={20}
            fontFamily={INTER.BOLD}
            color={COLORS.LIGHT_BLACK}
            style={{lineHeight: RF(25)}}
            numberOfLines={1}>
            1. Introduction
          </CustomText>
          <CustomText
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.LIGHT_BLACK}
            style={{lineHeight: RF(16), ...SPACING.mt7, ...SPACING.mb4}}>
            For Safety Net  to work with just your voice—even when your phone is
            locked—you’ll need to turn on two features in Google Assistant
          </CustomText>
          <BulletPoint
            heading={'Voice Match'}
            text={'So Assistant recognizes only your voice.'}
          />
          <BulletPoint
            heading={'Lock Screen Access'}
            text={'So Assistant can help you even when your screen is off.'}
            containerStyle={{...SPACING.mt1}}
          />
          <CustomText
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.LIGHT_BLACK}
            style={{lineHeight: RF(16), ...SPACING.my4}}
            numberOfLines={1}>
            If you don't have Google Assistant on your device yet:
          </CustomText>
          <NestedText2
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.LIGHT_BLACK}
            style={{lineHeight: RF(16)}}
            text={'1. Open the '}
            Ntext={'Google Play Store'}
            Nsize={10}
            NfontFamily={INTER.BOLD}
            Ncolor={COLORS.LIGHT_BLACK}
            Nstyle={{lineHeight: RF(16)}}
          />
          <NestedText2
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.LIGHT_BLACK}
            style={{lineHeight: RF(16)}}
            text={'2. Search for '}
            Ntext={"'Google Assistant'."}
            Nsize={10}
            NfontFamily={INTER.BOLD}
            Ncolor={COLORS.LIGHT_BLACK}
            Nstyle={{lineHeight: RF(16)}}
            containerStyle={{...SPACING.my1}}
          />
          <NestedText2
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.LIGHT_BLACK}
            style={{lineHeight: RF(16)}}
            text={'3. Tap '}
            Ntext={"'Install'."}
            Nsize={10}
            NfontFamily={INTER.BOLD}
            Ncolor={COLORS.LIGHT_BLACK}
            Nstyle={{lineHeight: RF(16)}}
          />
          <NestedText2
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.LIGHT_BLACK}
            style={{lineHeight: RF(16)}}
            text={'4. Once installed, return here and tap '}
            Ntext={"'Next'"}
            Nsize={10}
            NfontFamily={INTER.BOLD}
            Ncolor={COLORS.LIGHT_BLACK}
            Nstyle={{lineHeight: RF(16)}}
            N2text={'to continue.'}
            N2size={10}
            N2fontFamily={INTER.REGULAR}
            N2color={COLORS.LIGHT_BLACK}
            N2style={{lineHeight: RF(16)}}
            containerStyle={{...SPACING.mt1}}
          />
        </ScrollView>
        <CustomIcon
          path={ICONS.ASSISTANT}
          resizeMode="cover"
          containerStyle={styles.assistantIconCon}
        />
      </View>
      <View
        style={[styles.bottomCon, {paddingBottom: insets?.bottom + RF(12)}]}>
        <CustomButton
          title={'Skip'}
          titleSize={12}
          titleColor={COLORS.LIGHT_BLACK}
          titleFontFamily={INTER.REGULAR}
          titleStyle={{lineHeight: RF(16)}}
          bgColor={'transparent'}
          customStyle={{...SPACING.py2, ...SPACING.px4}}
          onPress={() =>
            hitGoogleAssistantWalkthroughAPI({
              email: user?.email,
            })
          }
        />
        <CustomButton
          title={'Next'}
          titleSize={12}
          titleColor={COLORS.LIGHT_GRAY_04}
          titleFontFamily={INTER.REGULAR}
          rightIcon={ICONS.BACK}
          rightIconColor={COLORS.LIGHT_GRAY_04}
          rightIconStyle={{
            height: RF(10),
            width: RF(10),
            transform: [{rotate: '180deg'}],
          }}
          titleStyle={{lineHeight: RF(16)}}
          customStyle={{...SPACING.py2, ...SPACING.px4}}
          onPress={() => navigate(ROUTES.ASSISTANT_SETTINGS)}
        />
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  contianer: {
    minHeight: HP(100),
    paddingHorizontal: WP(4),
    backgroundColor: COLORS.LIGHT_GRAY_04,
  },
  scrollCon: {
    marginHorizontal: WP(8),
  },
  assistantIconCon: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: HP(20),
    height: RF(175),
    width: RF(226),
  },
  bottomCon: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: WP(8),
  },
});

export default Introduction;
