import {ICONS} from '@assets';
import AppInput from '@components/appInput';
import CustomButton from '@components/customButton';
import NestedText2 from '@components/nestedText2';
import SignupHeader from '@components/signupHeader';
import SuccessModal from '@components/successModal';
import Wrapper from '@components/wrapper';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {navigate} from '@services/NavService';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {SignupStep2Schema} from '@theme/validations';
import {ROUTES} from '@utils/routes';
import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {submitHandler} from './helper';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<{
    params:
      | {
          email?: any;
          referral_code?: any;
        }
      | undefined;
  }>;
}

const SignupStep2 = ({route, navigation}: Props) => {
  const {email, referral_code} = route?.params || {};
  const formikRef: any = useRef<any>(null);
  const initialValues: any = useRef<any>({
    email: email,
    referral_code: referral_code,
    password: '',
    confirm_password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const submitHandlerWrapper = (values: any) => {
    submitHandler(values, setLoading, setShowSuccessModal);
  };
  return (
    <Wrapper barStyle="dark-content" noPaddingTop noPaddingBottom>
      <KeyboardAwareScrollView style={{backgroundColor: COLORS.LIGHT_GRAY}}>
        <SignupHeader />
        <View style={styles.formCon}>
          <Formik
            initialValues={initialValues?.current}
            innerRef={formikRef}
            validationSchema={SignupStep2Schema}
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
                  value={values?.password}
                  inputType="password"
                  toggleShowPassword={toggleShowPassword}
                  showPassword={showPassword}
                  secureTextEntry={!showPassword}
                  placeholder={'Password'}
                  onChangeText={handleChange('password')}
                  autoCapitalize="none"
                  error={
                    touched.password && errors.password ? errors.password : ''
                  }
                />
                <AppInput
                  value={values?.confirm_password}
                  inputType="password"
                  toggleShowPassword={toggleShowConfirmPassword}
                  showPassword={showConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  placeholder={'Confirm password'}
                  onChangeText={handleChange('confirm_password')}
                  autoCapitalize="none"
                  error={
                    touched.confirm_password && errors.confirm_password
                      ? errors.confirm_password
                      : ''
                  }
                />
                <NestedText2
                  size={15}
                  fontFamily={INTER.REGULAR}
                  style={{lineHeight: RF(19)}}
                  color={COLORS.LIGHT_BLACK}
                  text={'By selecting Agree and Continue below, I agree to '}
                  Ntext={'Terms of Service'}
                  Nsize={15}
                  NfontFamily={INTER.REGULAR}
                  Ncolor={COLORS.PRIMARY}
                  Nstyle={{lineHeight: RF(19), textDecorationLine: 'underline'}}
                  NonPress={() => navigate(ROUTES.TERMS_AND_CONDITIONS)}
                  N2text={' and '}
                  N2size={15}
                  N2fontFamily={INTER.REGULAR}
                  N2color={COLORS.LIGHT_BLACK}
                  N2style={{lineHeight: RF(19), textDecorationLine: 'none'}}
                  N3text={' Privacy Policy.'}
                  N3size={15}
                  N3fontFamily={INTER.REGULAR}
                  N3color={COLORS.PRIMARY}
                  N3style={{
                    lineHeight: RF(19),
                    textDecorationLine: 'underline',
                  }}
                  N3onPress={() => navigate(ROUTES.PRIVACY_POLICY)}
                  containerStyle={{...SPACING.mt3, ...SPACING.mb8}}
                />
                <CustomButton
                  title="Agree and continue"
                  titleSize={18}
                  titleFontFamily={INTER.BOLD}
                  titleColor={COLORS.WHITE}
                  isloading={loading}
                  onPress={handleSubmit}
                />
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
    textDecorationLine: 'none',
  },
});

export default SignupStep2;
