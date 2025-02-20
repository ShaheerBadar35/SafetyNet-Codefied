import CustomButton from '@components/customButton';
import CustomText from '@components/customText';
import EmailVerifiedModal from '@components/emailVerifiedModal';
import SignedOutModal from '@components/signedOutModal';
import VerificationHeader from '@components/verificationHeader';
import Wrapper from '@components/wrapper';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {handleSendOtpEmail, onPressBtn} from './helper';
import {navigate} from '@services/NavService';
import {ROUTES} from '@utils/routes';

const CELL_COUNT = 6;

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<{
    params:
      | {
          email?: any;
          isEmailVerification?: boolean;
          isSignedOut?: boolean;
        }
      | undefined;
  }>;
}

const Verification = ({route, navigation}: Props) => {
  const {
    email,
    isSignedOut = false,
    isEmailVerification = false,
  } = route?.params || {};
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    signedOut: false,
    emailVerification: false,
  });
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const toggleModal = (modalName: string, isVisible: boolean) => {
    setModal(prevModals => ({...prevModals, [modalName]: isVisible}));
  };

  useEffect(() => {
    handleSendOtpEmail({email: email});
  }, []);

  return (
    <Wrapper barStyle="dark-content" noPaddingTop noPaddingBottom>
      <VerificationHeader />
      <KeyboardAwareScrollView style={styles.container}>
        <CustomText
          size={10}
          fontFamily={INTER.REGULAR}
          color={COLORS.LIGHT_BLACK}
          style={{lineHeight: RF(16)}}>
          Please enter the OTP sent to your email.
        </CustomText>
        <CodeField
          ref={ref}
          {...props}
          caretHidden={true}
          value={value}
          onChangeText={setValue}
          onFocus={() => error && setError('')}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          onSubmitEditing={Keyboard.dismiss}
          renderCell={({index, symbol, isFocused}: any) => (
            <View
              key={index}
              style={[
                styles.cell,
                isFocused && styles.focusCell,
                symbol && styles.focusCell,
                error && styles.errorCell,
              ]}
              onLayout={getCellOnLayoutHandler(index)}>
              <CustomText
                size={16}
                fontFamily={INTER.MEDIUM}
                color={symbol ? COLORS.LIGHT_BLACK : COLORS.LIGHT_GRAY_04}>
                {symbol ? symbol : ''}
              </CustomText>
            </View>
          )}
        />
        <CustomButton
          title="Done"
          titleSize={18}
          titleFontFamily={INTER.BOLD}
          titleColor={
            value?.length == CELL_COUNT
              ? COLORS.LIGHT_GARY_03
              : COLORS.DARK_GRAY
          }
          bgColor={
            value?.length == CELL_COUNT ? COLORS.PRIMARY : COLORS.LIGHT_GRAY_02
          }
          disabled={value?.length != CELL_COUNT}
          customStyle={{...SPACING.py4}}
          customContainerStyle={{...SPACING.mt12}}
          isloading={loading}
          onPress={() =>
            onPressBtn(
              {email: email, otp: value},
              setLoading,
              isEmailVerification,
              isSignedOut,
              toggleModal,
            )
          }
        />
        <SignedOutModal
          open={modal?.signedOut}
          onPressBtn={() => {
            toggleModal('signedOut', false);
            navigate(ROUTES.LOGIN);
          }}
        />
        <EmailVerifiedModal
          open={modal?.emailVerification}
          onPressBtn={() => {
            toggleModal('emailVerification', false);
            navigate(ROUTES.SELECT_PLAN, {
              email: email,
            });
          }}
        />
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: WP(8),
    ...SPACING.pt10,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  codeFieldRoot: {
    ...SPACING.mt4,
  },
  cell: {
    width: WP(12),
    height: RF(55),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: RF(1.5),
    borderRadius: RF(8),
    borderColor: COLORS.LIGHT_GRAY_02,
    backgroundColor: COLORS.LIGHT_GRAY_02,
  },
  focusCell: {
    borderColor: COLORS.LIGHT_GRAY_04,
    borderWidth: RF(1.5),
    backgroundColor: COLORS.LIGHT_GRAY_04,
  },
  errorCell: {
    borderColor: COLORS.WARNING_50,
  },
});

export default Verification;
