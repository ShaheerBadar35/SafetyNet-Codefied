import AppInput from '@components/appInput';
import CustomButton from '@components/customButton';
import CustomText from '@components/customText';
import ForgotPasswordHeader from '@components/forgotPasswordHeader';
import Wrapper from '@components/wrapper';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {ForgotPasswordSchema} from '@theme/validations';
import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {submitHandler} from './helper';
import ForgotPasswordModal from '@components/forgotPasswordModal';
import {navigate} from '@services/NavService';
import {ROUTES} from '@utils/routes';

const ForgotPassword = () => {
  const formikRef: any = useRef<any>(null);
  const initialValues: any = useRef<any>({
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const submitHandlerWrapper = (values: any) => {
    submitHandler(values, setLoading, setShowModal);
  };
  return (
    <Wrapper barStyle="dark-content" noPaddingTop noPaddingBottom>
      <ForgotPasswordHeader />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <Formik
          initialValues={initialValues?.current}
          innerRef={formikRef}
          validationSchema={ForgotPasswordSchema}
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
              <CustomText
                size={10}
                fontFamily={INTER.REGULAR}
                color={COLORS.LIGHT_BLACK}
                style={{lineHeight: RF(16)}}>
                Please enter a valid email address to receive an OTP.
              </CustomText>
              <CustomButton
                title="Done"
                titleSize={18}
                titleFontFamily={INTER.BOLD}
                titleColor={COLORS.WHITE}
                isloading={loading}
                customStyle={{...SPACING.py4}}
                customContainerStyle={{...SPACING.mt7}}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      <ForgotPasswordModal
        open={showModal}
        onPressBtn={() => {
          setShowModal(false);
          navigate(ROUTES.LOGIN);
        }}
      />
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
});

export default ForgotPassword;
