import AppInput from '@components/appInput';
import CustomButton from '@components/customButton';
import CustomText from '@components/customText';
import {useSafeArea} from '@components/safeAreaInsets';
import TextWrapper from '@components/textWrapper';
import Wrapper from '@components/wrapper';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {navigate} from '@services/NavService';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {EditProfileChildSchema, EditProfileSchema} from '@theme/validations';
import {isChildACcount} from '@utils/helper';
import {ROUTES} from '@utils/routes';
import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import Header from './components/Header';
import {submitHandler} from './helper';
import CustomFooter from '@components/customFooter';

const EditProfile = () => {
  const {user} = useSelector((state: any) => state.root.user);
  const formikRef: any = useRef<any>(null);
  const [imgPath, setImgPath] = useState(user?.profile?.profileImage || '');
  const initialValues: any = useRef<any>({
    name: user?.profile?.name || '',
    number: user?.profile?.number || '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);
  const isChild = isChildACcount(user);
  const insets: any = useSafeArea();
  const tabBarHeight: any = useBottomTabBarHeight();
  const dispatch: any = useDispatch();
  const submitHandlerWrapper = (values: any) => {
    const params = {
      ...values,
      image: imgPath,
    };
    if (isChild ? imgPath : true) submitHandler(params, setLoading, dispatch);
  };
  return (
    <Wrapper barStyle="dark-content" noPaddingTop noPaddingBottom>
      <Header
        imgPath={imgPath}
        setImgPath={setImgPath}
        containerStyle={{paddingTop: insets?.top + RF(32)}}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          {paddingBottom: insets?.bottom + tabBarHeight},
        ]}>
        <Formik
          initialValues={initialValues?.current}
          innerRef={formikRef}
          validationSchema={
            isChild ? EditProfileChildSchema : EditProfileSchema
          }
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
              <View style={[isChild && {opacity: 0.4}]}>
                <AppInput
                  title={'Name'}
                  titleSize={12}
                  tintColor={COLORS.LIGHT_GRAY_04}
                  value={values?.name}
                  containerStyle={{...SPACING.py3}}
                  mainContainerStyle={{...SPACING.mb0}}
                  inputStyle={styles.input}
                  required
                  editable={!isChild}
                  placeholder={'Jay Manson'}
                  onChangeText={handleChange('name')}
                  autoCapitalize="none"
                  error={touched.name && errors.name ? errors.name : ''}
                />
                <CustomText style={{...SPACING.mb3}}>
                  <CustomText
                    size={10}
                    fontFamily={INTER.REGULAR}
                    color={COLORS.LIGHT_BLACK}
                    style={{
                      lineHeight: RF(16),
                      textDecorationLine: 'underline',
                    }}>
                    Disclaimer:
                  </CustomText>
                  <CustomText
                    size={10}
                    fontFamily={INTER.REGULAR}
                    color={COLORS.LIGHT_BLACK}
                    style={{lineHeight: RF(16)}}>
                    {' '}
                    Must use real name as it will be used with your emergency
                    contacts.
                  </CustomText>
                </CustomText>
                {!isChild && (
                  <AppInput
                    keyboardNumberic
                    title={'Phone Number'}
                    titleSize={12}
                    tintColor={COLORS.LIGHT_GRAY_04}
                    value={values?.number}
                    inputStyle={styles.input}
                    containerStyle={{...SPACING.py3}}
                    required
                    placeholder={'+12 34567890'}
                    onChangeText={handleChange('number')}
                    autoCapitalize="none"
                    error={touched.number && errors.number ? errors.number : ''}
                  />
                )}
                <AppInput
                  editable={false}
                  title={'Email Address'}
                  titleSize={12}
                  tintColor={COLORS.LIGHT_GRAY_04}
                  value={values?.email}
                  containerStyle={{...SPACING.py3}}
                  inputStyle={styles.input}
                  required
                  placeholder={'jaymanson@gmail.com'}
                  autoCapitalize="none"
                />
                <TextWrapper
                  size={15}
                  fontFamily={INTER.REGULAR}
                  color={COLORS.PRIMARY}
                  style={{lineHeight: RF(19), ...SPACING.mt3, ...SPACING.mb10}}
                  onPress={() => !isChild && navigate(ROUTES.CHANGE_PASSWORD)}>
                  Change Password
                </TextWrapper>
              </View>
              <CustomButton
                title="Save"
                titleSize={18}
                titleFontFamily={INTER.BOLD}
                titleColor={COLORS.WHITE}
                isloading={loading}
                onPress={handleSubmit}
                customContainerStyle={{
                  opacity: 1,
                  zIndex: 10000,
                  ...SPACING.pb3,
                }}
              />
            </>
          )}
        </Formik>
        <CustomFooter containerStyle={{...SPACING.mt3}} />
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WP(10),
    ...SPACING.pt3,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  input: {
    paddingLeft: 0,
    paddingRight: 0,
    color: COLORS.LIGHT_BLACK,
  },
});

export default EditProfile;
