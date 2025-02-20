import AppInput from '@components/appInput';
import CustomButton from '@components/customButton';
import CustomText from '@components/customText';
import GoogleButton from '@components/googleButton';
import NestedText from '@components/nestedText';
import SignupHeader from '@components/signupHeader';
import TextWrapper from '@components/textWrapper';
import Wrapper from '@components/wrapper';
import {navigate} from '@services/NavService';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {SignupStep1Schema} from '@theme/validations';
import {ROUTES} from '@utils/routes';
import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {submitHandler} from './helper';
import {handleGoogleSignup} from '@services/GoogleService';
import SuccessModal from '@components/successModal';
import {ICONS} from '@assets';
import {GST} from '@theme/globalStyles';

const SignupStep1 = () => {
  const formikRef: any = useRef<any>(null);
  const initialValues: any = useRef<any>({
    email: '',
    referral_code: '',
  });
  const [loading, setLoading] = useState(false);
  const [googleBtnLoading, setGoogleBtnLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const submitHandlerWrapper = (values: any) => {
    submitHandler(values, setLoading);
  };
  return (
    <Wrapper barStyle="dark-content" noPaddingTop noPaddingBottom>
      <KeyboardAwareScrollView style={{backgroundColor: COLORS.LIGHT_GRAY}}>
        <SignupHeader />
        <View style={styles.formCon}>
          <Formik
            initialValues={initialValues?.current}
            innerRef={formikRef}
            validationSchema={SignupStep1Schema}
            onSubmit={submitHandlerWrapper}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <>
                <AppInput
                  value={values?.email}
                  required
                  placeholder={'Email'}
                  onChangeText={handleChange('email')}
                  autoCapitalize="none"
                  error={touched.email && errors.email ? errors.email : ''}
                />
                <CustomButton
                  title="Continue"
                  titleSize={18}
                  titleFontFamily={INTER.BOLD}
                  titleColor={COLORS.WHITE}
                  isloading={loading}
                  onPress={handleSubmit}
                />

                <CustomText
                  size={18}
                  fontFamily={INTER.LIGHT}
                  color={COLORS.DARK_GRAY}
                  center
                  style={{lineHeight: RF(29), ...SPACING.my4}}>
                  or
                </CustomText>
                <GoogleButton
                  title="Continue with Google"
                  isLoading={googleBtnLoading}
                  onPress={async () =>
                    await handleGoogleSignup(
                      setGoogleBtnLoading,
                      setShowSuccessModal,
                    )
                  }
                />
                <AppInput
                  value={values?.referral_code}
                  required
                  placeholder={'Referral code'}
                  onChangeText={handleChange('referral_code')}
                  autoCapitalize="characters"
                  error={
                    touched.referral_code && errors.referral_code
                      ? errors.referral_code
                      : ''
                  }
                  mainContainerStyle={GST.mt4}
                />
                <NestedText
                  size={15}
                  fontFamily={INTER.REGULAR}
                  style={{lineHeight: RF(19)}}
                  color={COLORS.LIGHT_BLACK}
                  text={'Already an account? '}
                  Ntext={'Login'}
                  Nsize={15}
                  NfontFamily={INTER.BOLD}
                  Ncolor={COLORS.PRIMARY}
                  Nstyle={{lineHeight: RF(19)}}
                  containerStyle={{marginTop: RF(50)}}
                  onPress={() => navigate(ROUTES.LOGIN)}
                />
                <TextWrapper
                  size={15}
                  fontFamily={INTER.BOLD}
                  color={COLORS.PRIMARY}
                  style={{lineHeight: RF(19), ...SPACING.mt4}}>
                  Forgot your password?
                </TextWrapper>
              </>
            )}
          </Formik>
        </View>
        <SuccessModal
          title={'Account created successfully'}
          icon={ICONS.ACCOUNT_SUCCESS}
          open={showSuccessModal}
          onPressClose={() => setShowSuccessModal(false)}
        />
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  formCon: {
    paddingHorizontal: WP(8),
    ...SPACING.pt10,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
});

export default SignupStep1;
