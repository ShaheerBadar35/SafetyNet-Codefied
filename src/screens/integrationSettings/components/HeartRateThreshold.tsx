import AppInput from '@components/appInput';
import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {handleIntegrationHeartrateThreshold} from '../helper';
import {useDispatch, useSelector} from 'react-redux';
import TextWrapper from '@components/textWrapper';

interface HeartRateThresholdProps {
  disabled?: boolean;
  containerStyle?: ViewStyle | any;
}

const HeartRateThreshold = (props: Partial<HeartRateThresholdProps>) => {
  const {disabled = false, containerStyle} = props;
  const {user} = useSelector((state: any) => state.root.user);
  const [lowerLimit, setLowerLimit] = useState(
    user?.integration_settings?.heartbeat_monitoring?.heartrate_threshold
      ?.lower_limit || '80',
  );
  const [upperLimit, setUpperLimit] = useState(
    user?.integration_settings?.heartbeat_monitoring?.heartrate_threshold
      ?.upper_limit || '120',
  );
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (
      lowerLimit !=
        user?.integration_settings?.heartbeat_monitoring?.heartrate_threshold
          ?.lower_limit ||
      upperLimit !=
        user?.integration_settings?.heartbeat_monitoring?.heartrate_threshold
          ?.upper_limit
    ) {
      // handleIntegrationHeartrateThreshold(
      //   user?.email,
      //   lowerLimit,
      //   upperLimit,
      //   dispatch,
      // );
    }
  }, [lowerLimit, upperLimit]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
        <CustomText
          size={12}
          fontFamily={INTER.BOLD}
          color={COLORS.LIGHT_GRAY_04}
          style={{lineHeight: RF(19)}}
          numberOfLines={1}>
          Heartrate Threshold
        </CustomText>
        <TextWrapper
          size={12}
          fontFamily={INTER.BOLD}
          color={COLORS.PRIMARY}
          style={{lineHeight: RF(19)}}
          numberOfLines={1}
          onPress={() => {
             // $&
            handleIntegrationHeartrateThreshold(
              user?.email,
              lowerLimit,
              upperLimit,
              dispatch,
            );
          }}>
          Save
        </TextWrapper>
      </View>
      <CustomText
        size={10}
        fontFamily={INTER.REGULAR}
        color={COLORS.DARK_GRAY}
        style={{lineHeight: RF(16), ...SPACING.mt1, ...SPACING.mb4}}
        numberOfLines={2}>
        Select the heartrate which, when reached, should trigger emergency
        contacts.
      </CustomText>
      <View style={styles.row}>
        <View style={{...SPACING.mr6}}>
          <CustomText
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.WHITE}
            center
            style={{lineHeight: RF(16), ...SPACING.mb1}}
            numberOfLines={1}>
            Lower Limit
          </CustomText>
          <AppInput
            value={lowerLimit}
            onChangeText={(val: any) => setLowerLimit(val)}
            keyboardNumberic
            editable={!disabled}
            inputStyle={styles.input}
            containerStyle={styles.inputCon}
            mainContainerStyle={styles.inputMainCon}
          />
        </View>
        <View>
          <CustomText
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.WHITE}
            center
            style={{lineHeight: RF(16), ...SPACING.mb1}}
            numberOfLines={1}>
            Upper Limit
          </CustomText>
          <AppInput
            value={upperLimit}
            onChangeText={(val: any) => setUpperLimit(val)}
            keyboardNumberic
            editable={!disabled}
            inputStyle={styles.input}
            containerStyle={styles.inputCon}
            mainContainerStyle={styles.inputMainCon}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: RF(7),
    ...SPACING.p3,
    backgroundColor: COLORS.LIGHT_BLACK_4,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    paddingRight: 0,
    textAlign: 'center',
  },
  inputCon: {
    ...SPACING.py1,
    ...SPACING.px2,
    backgroundColor: 'transparent',
  },
  inputMainCon: {
    width: WP(25),
    flex: 0,
    borderRadius: RF(7),
    borderWidth: RF(3),
    ...SPACING.mb0,
    borderColor: COLORS.LIGHT_GRAY_04,
  },
});

export default HeartRateThreshold;
