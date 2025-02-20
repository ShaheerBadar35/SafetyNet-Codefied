import AlreadyLoggedInModal from '@components/alreadyLoggedInModal';
import AppInput from '@components/appInput';
import CustomButton from '@components/customButton';
import CustomText from '@components/customText';
import GoogleButton from '@components/googleButton';
import NestedText from '@components/nestedText';
import TextWrapper from '@components/textWrapper';
import Wrapper from '@components/wrapper';
import {handleGoogleSignin} from '@services/GoogleService';
import {navigate} from '@services/NavService';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {LoginSchema} from '@theme/validations';
import {CHILD_ACCOUNT_DOMAIN} from '@utils/constants';
import {ROUTES} from '@utils/routes';
import {Formik} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import Header from './components/Header';
import {submitHandler} from './helper';
import SuccessModal from '@components/successModal';
import {ICONS} from '@assets';

const Login = () => {
  const dispatch: any = useDispatch();
  const formikRef: any = useRef<any>(null);
  const initialValues: any = useRef<any>({
    email: '',
    password: '',
  });
  const email: any = useRef('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleBtnLoading, setGoogleBtnLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const submitHandlerWrapper = (values: any) => {
    let params: any = {
      ...values,
    };
    if (!values?.email?.includes('@')) {
      params = {
        ...params,
        email: params?.email + CHILD_ACCOUNT_DOMAIN,
      };
      email.current = values?.email + CHILD_ACCOUNT_DOMAIN;
    } else {
      email.current = values?.email;
    }
     // $&
    submitHandler(
      params,
      setLoading,
      setShowModal,
      setShowSuccessModal,
      dispatch,
    );
  };

  return (
    <Wrapper barStyle="dark-content" noPaddingTop noPaddingBottom>
      <KeyboardAwareScrollView style={{backgroundColor: COLORS.LIGHT_GRAY}}>
        <Header />
        <View style={styles.formCon}>
          <Formik
            initialValues={initialValues?.current}
            innerRef={formikRef}
            validationSchema={LoginSchema}
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
                  placeholder={'Email or Username'}
                  onChangeText={handleChange('email')}
                  autoCapitalize="none"
                  error={touched.email && errors.email ? errors.email : ''}
                />
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
                <CustomButton
                  title="Continue"
                  titleSize={18}
                  titleFontFamily={INTER.BOLD}
                  titleColor={COLORS.WHITE}
                  isloading={loading}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
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
              await handleGoogleSignin(
                email,
                setGoogleBtnLoading,
                setShowModal,
                setShowSuccessModal,
                dispatch,
              )
            }
          />
          <NestedText
            size={15}
            fontFamily={INTER.REGULAR}
            style={{lineHeight: RF(19)}}
            color={COLORS.LIGHT_BLACK}
            text={'Don’t have an account? '}
            Ntext={'Sign Up'}
            Nsize={15}
            NfontFamily={INTER.BOLD}
            Ncolor={COLORS.PRIMARY}
            Nstyle={{lineHeight: RF(19)}}
            containerStyle={{marginTop: RF(50)}}
            onPress={() => navigate(ROUTES.SIGNUP_STEP_1)}
          />
          <TextWrapper
            size={15}
            fontFamily={INTER.BOLD}
            color={COLORS.PRIMARY}
            style={{lineHeight: RF(19), ...SPACING.mt4}}
            onPress={() => navigate(ROUTES.FORGOT_PASSWORD)}>
            Forgot your password?
          </TextWrapper>
        </View>
        <AlreadyLoggedInModal
          open={showModal}
          onPressBtn={() => {
            setShowModal(false);
            navigate(ROUTES.VERIFICATION, {
              email: email?.current,
              isSignedOut: true,
            });
          }}
        />
        <SuccessModal
          title={'Signed in successfully'}
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

export default Login;
