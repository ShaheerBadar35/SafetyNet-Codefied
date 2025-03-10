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
import {ScrollView, StyleSheet, View, Platform,} from 'react-native';
import Header from '../components/Header';
import {useSelector} from 'react-redux';
import {hitGoogleAssistantWalkthroughAPI} from '../helper';
import { Linking, Alert } from 'react-native';
// import IntentLauncher from 'react-native-intent-launcher';

const Settings = () => {
  const {user} = useSelector((state: any) => state.root.user);
  const insets: any = useSafeArea();

  // const checkGoogleAssistant = () => {
  //   Linking.openSettings();
  // };

  // const openGoogleServicesSettings = ()=>{
  //   if(Platform.OS === 'android'){
  //     IntentLauncher.startActivity({
  //         action:'android.intent.action.MAIN',
  //         packageName: 'com.google.android.gms',
  //         className: 'com.google.android.gms.app.settings.GoogleSettingsActivity'
  //       })
  //   }
  //   else{
  //      // $&
  //   }
  // }
  // const openGoogleServicesSettings = async () => {
  //   if (Platform.OS === 'android') {
  //     const intentURI = 'intent:#Intent;component=com.google.android.gms/.app.settings.GoogleSettingsActivity;end';
  //     try {
  //       await Linking.openURL(intentURI);
  //     } catch (error) {
  //       console.error('Failed to open settings:', error);
  //     }
  //   } else {
  //      // $&
  //   }
  // };  
  const openGoogleServicesSettings = async () => { 
     // $&
    try{
      const supported = await Linking.canOpenURL('android.settings.VOICE_SEARCH_SETTINGS');
      if (!supported) {
        Alert.alert(
          'Not Supported',
          'This device does not support opening Google Assistant settings directly. Please open it manually from the Google app.'
        );
         // $&        
        return;
      }      
      await Linking.openURL('android.settings.VOICE_SEARCH_SETTINGS'); 
    } catch (error) {
      console.error('Failed to open Google Assistant settings:', error);
    }
     // $&
  
  };
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
            numberOfLines={1}>
            2. Open Assistant Settings
          </CustomText>
          <CustomText
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.LIGHT_BLACK}
            style={{lineHeight: RF(16), ...SPACING.mt7, ...SPACING.mb4}}>
            First, we'll open the Google Assitant Settings:
          </CustomText>
          <NestedText2
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.LIGHT_BLACK}
            style={{lineHeight: RF(16)}}
            text={'1. Open your device\'s phone settings and search for '}
            Ntext={'‘Google Settings’ '}
            Nsize={10}
            NfontFamily={INTER.BOLD}
            Ncolor={COLORS.LIGHT_BLACK}
            Nstyle={{lineHeight: RF(16)}}
            N2text={
              'This will take you right to your phone’s Google settings.'
            }
            N2size={10}
            N2fontFamily={INTER.REGULAR}
            N2color={COLORS.LIGHT_BLACK}
            N2style={{lineHeight: RF(16)}}
          />
          <NestedText2
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.LIGHT_BLACK}
            style={{lineHeight: RF(16)}}
            text={'2. Once you’re in the settings, look for a section called  '}
            Ntext={'‘Hey Google & Voice Match’ '}
            Nsize={10}
            NfontFamily={INTER.BOLD}
            Ncolor={COLORS.LIGHT_BLACK}
            Nstyle={{lineHeight: RF(16)}}
            N2text={'or sometimes just'}
            N2size={10}
            N2fontFamily={INTER.REGULAR}
            N2color={COLORS.LIGHT_BLACK}
            N2style={{lineHeight: RF(16)}}
            N3text={' ‘Voice Match’,'}
            N3size={10}
            N3fontFamily={INTER.BOLD}
            N3color={COLORS.LIGHT_BLACK}
            N3style={{lineHeight: RF(16)}}
            containerStyle={{...SPACING.mt1}}
          />
          <NestedText2
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.LIGHT_BLACK}
            style={{lineHeight: RF(16)}}
            text={
              'If you don’t see it immediately, try clicking on \'All Services\' tab and look for '
            }
            Ntext={'‘Search, Assistant and Voice’'}
            Nsize={10}
            NfontFamily={INTER.BOLD}
            Ncolor={COLORS.LIGHT_BLACK}
            Nstyle={{lineHeight: RF(16)}}
            // N2text={' or '}
            N2size={10}
            N2fontFamily={INTER.REGULAR}
            N2color={COLORS.LIGHT_BLACK}
            N2style={{lineHeight: RF(16)}}
            // N3text={' ‘All Settings’.'}
            N3size={10}
            N3fontFamily={INTER.BOLD}
            N3color={COLORS.LIGHT_BLACK}
            N3style={{lineHeight: RF(16)}}
            containerStyle={{...SPACING.mt4}}
          />
          {/* <CustomButton
            title={'Open Assitant Settings'}
            titleSize={12}
            titleColor={COLORS.DARK_GRAY}
            titleFontFamily={INTER.BOLD}
            titleStyle={{lineHeight: RF(16)}}
            bgColor={'transparent'}
            customStyle={{
              ...SPACING.py2,
              ...SPACING.px4,
              borderWidth: RF(2),
              borderColor: COLORS.DARK_GRAY,
            }}
            customContainerStyle={{width: WP(50), ...SPACING.mt5}}
            onPress={openGoogleServicesSettings}
          /> */}
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
          onPress={() => navigate(ROUTES.ASSISTANT_VOICE)}
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

export default Settings;
