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
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import {useSelector} from 'react-redux';
import {hitGoogleAssistantWalkthroughAPI} from '../helper';

const Testing = () => {
  const {user} = useSelector((state: any) => state.root.user);
  const insets: any = useSafeArea();
  const [isBtnLoading, setIsBtnLoading] = useState(false);
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
            5. Testing Your Setup
          </CustomText>
          <CustomText
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.LIGHT_BLACK}
            style={{lineHeight: RF(16), ...SPACING.mt7, ...SPACING.mb4}}>
            Great! You’ve set up Voice Match and allowed Assistant on the lock
            screen. Test it now:
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
            text={'1. Lock your phone or turn the screen off.'}
          />
          <NestedText2
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.LIGHT_BLACK}
            style={{lineHeight: RF(16)}}
            text={'2. Say  '}
            Ntext={'‘Hey Google’ '}
            Nsize={10}
            NfontFamily={INTER.BOLD}
            Ncolor={COLORS.LIGHT_BLACK}
            Nstyle={{lineHeight: RF(16)}}
            N2text={'and listen for the beep.'}
            N2size={10}
            N2fontFamily={INTER.REGULAR}
            N2color={COLORS.LIGHT_BLACK}
            N2style={{lineHeight: RF(16)}}
            containerStyle={{...SPACING.my1}}
          />
          <NestedText2
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.LIGHT_BLACK}
            style={{lineHeight: RF(16)}}
            text={'3. Ask a simple question like '}
            Ntext={'‘What’s the weather?'}
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
            text={
              '4. If Assistant responds without you unlocking the phone, everything’s working perfectly.'
            }
            containerStyle={{...SPACING.mt1}}
          />
          <NestedText2
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.LIGHT_BLACK}
            style={{lineHeight: RF(16)}}
            text={'You’re all set!'}
            containerStyle={{...SPACING.mt4}}
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
          title={'Done'}
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
          isloading={isBtnLoading}
          customStyle={{...SPACING.py2, ...SPACING.px4}}
          onPress={() =>
            hitGoogleAssistantWalkthroughAPI({
              email: user?.email,
              setIsBtnLoading,
            })
          }
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: WP(8),
  },
});

export default Testing;
