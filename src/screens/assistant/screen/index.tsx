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
import Header from '../components/Header';
import {useSelector} from 'react-redux';
import {hitGoogleAssistantWalkthroughAPI} from '../helper';

const Screen = () => {
  const {user} = useSelector((state: any) => state.root.user);
  const insets: any = useSafeArea();
  return (
    <Wrapper noPaddingBottom>
      <View style={styles.contianer}>
        <Header containerStyle={{...SPACING.mb5}} />
        <ScrollView style={styles.scrollCon}>
          <CustomText
            size={20}
            fontFamily={INTER.BOLD}
            color={COLORS.LIGHT_BLACK}
            style={{lineHeight: RF(25)}}
            numberOfLines={2}>
            4. Allowing Assistant on Lock Screen
          </CustomText>
          <CustomText
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.LIGHT_BLACK}
            style={{lineHeight: RF(16), ...SPACING.mt7, ...SPACING.mb4}}>
            Next, let’s let Assistant help you even when your phone is locked:
          </CustomText>
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
            text={'1. In the Assistant settings, look for an option like '}
            Ntext={'‘Lock screen personal results’ '}
            Nsize={10}
            NfontFamily={INTER.BOLD}
            Ncolor={COLORS.LIGHT_BLACK}
            Nstyle={{lineHeight: RF(16)}}
            N2text={'or something mentioning lock screen.This might be under '}
            N2size={10}
            N2fontFamily={INTER.REGULAR}
            N2color={COLORS.LIGHT_BLACK}
            N2style={{lineHeight: RF(16)}}
            N3text={'‘Assistant devices (Phone)’ or a similar section.'}
            N3size={10}
            N3fontFamily={INTER.BOLD}
            N3color={COLORS.LIGHT_BLACK}
            N3style={{lineHeight: RF(16)}}
          />
          <NestedText2
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.LIGHT_BLACK}
            style={{lineHeight: RF(16)}}
            text={
              '2. Turn on the feature that lets Google Assistant respond from the lock screen.'
            }
            containerStyle={{...SPACING.my1}}
          />
          <NestedText2
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.LIGHT_BLACK}
            style={{lineHeight: RF(16)}}
            text={
              '3. This ensures you can ask questions or give commands without unlocking your phone.'
            }
            Nstyle={{lineHeight: RF(16)}}
          />
          <NestedText2
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.LIGHT_BLACK}
            style={{lineHeight: RF(16)}}
            text={'4. After enabling this, return to SafetyNet.'}
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
          title={'I’ve enabled lock screen access'}
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
          onPress={() => navigate(ROUTES.ASSISTANT_TESTING)}
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

export default Screen;
