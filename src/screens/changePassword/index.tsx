import AppInput from '@components/appInput';
import CustomButton from '@components/customButton';
import Wrapper from '@components/wrapper';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {ChangePasswordSchema} from '@theme/validations';
import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ChangePasswordHeader from '@components/changePasswordHeader';
import ForgotPasswordModal from '@components/forgotPasswordModal';
import {navigate} from '@services/NavService';
import {ROUTES} from '@utils/routes';
import {useSelector} from 'react-redux';
import {submitHandler} from './helper';
import {GST} from '@theme/globalStyles';
import CustomFooter from '@components/customFooter';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ChangePassword = () => {
  const {user} = useSelector((state: any) => state.root.user);
  const formikRef: any = useRef<any>(null);
  const initialValues: any = useRef<any>({
    current_password: '',
    password: '',
    confirm_password: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const insets: any = useSafeAreaInsets();
  const tabBarHeight: any = useBottomTabBarHeight();
  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const submitHandlerWrapper = (values: any) => {
    submitHandler(user?.email, values, setLoading);
  };
  return (
    <Wrapper barStyle="dark-content" noPaddingTop noPaddingBottom>
      <ChangePasswordHeader />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          {paddingBottom: tabBarHeight + insets?.bottom + RF(12)},
        ]}
        // style={styles.container}
      >
        <Formik
          initialValues={initialValues?.current}
          innerRef={formikRef}
          validationSchema={ChangePasswordSchema}
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
                title={'Current Passwod'}
                titleSize={12}
                tintColor={COLORS.LIGHT_GRAY_04}
                value={values?.current_password}
                inputType="password"
                toggleShowPassword={toggleShowCurrentPassword}
                showPassword={showCurrentPassword}
                secureTextEntry={!showCurrentPassword}
                placeholder={'Current Password'}
                onChangeText={handleChange('current_password')}
                autoCapitalize="none"
                error={
                  touched.current_password && errors.current_password
                    ? errors.current_password
                    : ''
                }
                inputStyle={styles.input}
                containerStyle={{...SPACING.py3}}
                mainContainerStyle={GST.mb5}
              />
              <AppInput
                title={'New Passwod'}
                titleSize={12}
                tintColor={COLORS.LIGHT_GRAY_04}
                value={values?.password}
                inputType="password"
                toggleShowPassword={toggleShowPassword}
                showPassword={showPassword}
                secureTextEntry={!showPassword}
                placeholder={'New Password'}
                onChangeText={handleChange('password')}
                autoCapitalize="none"
                error={
                  touched.password && errors.password ? errors.password : ''
                }
                inputStyle={styles.input}
                containerStyle={{...SPACING.py3}}
                mainContainerStyle={GST.mb5}
              />
              <AppInput
                title={'Confirm New Passwod'}
                titleSize={12}
                tintColor={COLORS.LIGHT_GRAY_04}
                value={values?.confirm_password}
                inputType="password"
                toggleShowPassword={toggleShowConfirmPassword}
                showPassword={showConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                placeholder={'Confirm New Password'}
                onChangeText={handleChange('confirm_password')}
                autoCapitalize="none"
                error={
                  touched.confirm_password && errors.confirm_password
                    ? errors.confirm_password
                    : ''
                }
                inputStyle={styles.input}
                containerStyle={{...SPACING.py3}}
                mainContainerStyle={GST.mb5}
              />
              <CustomButton
                title="Save Password"
                titleSize={18}
                titleFontFamily={INTER.BOLD}
                titleColor={
                  values?.current_password?.length == 0 ||
                  values?.password?.length == 0 ||
                  values?.confirm_password?.length == 0
                    ? COLORS.DARK_GRAY
                    : COLORS.WHITE
                }
                isloading={loading}
                disabled={
                  values?.current_password?.length == 0 ||
                  values?.password?.length == 0 ||
                  values?.confirm_password?.length == 0
                }
                customStyle={{...SPACING.py4}}
                customContainerStyle={{...SPACING.mt7}}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
        <CustomFooter containerStyle={{bottom: -RF(12), ...SPACING.mt3}} />
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
    // flex: 1,
    paddingHorizontal: WP(8),
    ...SPACING.pt10,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  input: {
    paddingLeft: 0,
    paddingRight: RF(8),
    color: COLORS.LIGHT_BLACK,
  },
});

export default ChangePassword;
