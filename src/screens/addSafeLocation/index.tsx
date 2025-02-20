import AddSafeLocationHeader from '@components/addSafeLocationHeader';
import AppInput from '@components/appInput';
import CustomButton from '@components/customButton';
import LocationInput from '@components/locationInput';
import Wrapper from '@components/wrapper';
import useDebounce from '@hooks/useDebounce';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {AddSafeLocationSchema} from '@theme/validations';
import {Formik} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCurrentLocation, getPlacesList, submitHandler} from './helper';
import CustomFooter from '@components/customFooter';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WheelPicker from 'react-native-wheely';
import TimeInput from '@components/timeInput';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<{
    params: {
      child?: any;
      location?: any;
      locationsList?: any;
      setLocationsList?: any;
    } | undefined;
  }>;
}

const AddSafeLocation = ({route, navigation}: Props) => {
  const {
    child = {},
    location = {},
    locationsList = [],
    setLocationsList = () => {},
  } = route?.params || {};
  const {user} = useSelector((state: any) => state.root.user);
  const dispatch: any = useDispatch();
  const formikRef: any = useRef<any>(null);
  const initialValues: any = useRef<any>({
    location: location?.location || '',
    latitude: location?.latitude,
    longitude: location?.longitude,
    tag: location?.tag || '',
    start_time_hours: location?.start_time_hours || '',
    start_time_minutes: location?.start_time_minutes || '',
    start_time_periods: location?.start_time_periods || '',
    end_time_hours: location?.end_time_hours || '',
    end_time_minutes: location?.end_time_minutes || '',
    end_time_periods: location?.end_time_periods || '',
  });
  const [loading, setLoading] = useState(false);
  const [locationQuery, setLocationQuery] = useState('');
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const insets: any = useSafeAreaInsets();
  const tabBarHeight: any = useBottomTabBarHeight();
  const submitHandlerWrapper = (values: any) => {
    submitHandler(
      user?.email,
      child?.username,
      values,
      setLoading,
      location,
      locationsList,
      setLocationsList,
      dispatch,
    );
  };

  useDebounce(
    () => {
      setLocationQuery(() => input);
    },
    [input],
    500,
  );

  useEffect(() => {
    if (locationQuery?.length > 0) {
      getPlacesList(locationQuery, setSuggestions, currentLocation);
    }
  }, [locationQuery]);

  useEffect(() => {
    fetchCurrentLocation(setCurrentLocation);
  }, []);

  return (
    <Wrapper noPaddingTop noPaddingBottom>
      <AddSafeLocationHeader />
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.container,
          {
            paddingBottom: tabBarHeight + insets?.bottom + RF(12),
          },
        ]}>
        <Formik
          initialValues={initialValues?.current}
          innerRef={formikRef}
          validationSchema={AddSafeLocationSchema}
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
              <LocationInput
                title={'Set Location'}
                titleColor={COLORS.LIGHT_GRAY}
                dropDownData={suggestions}
                value={values?.location}
                editable={!location?.location}
                required
                placeholder={'Location'}
                onChangeText={(val: any) => {
                  handleChange('location')(val);
                  setInput(val);
                }}
                onPressSuggestion={(item: any) => {
                   // $&
                  setFieldValue('location', item?.title);
                  setFieldValue(
                    'latitude',
                    item?.access?.[0]?.lat || item?.position?.lat,
                  );
                  setFieldValue(
                    'longitude',
                    item?.access?.[0]?.lng || item?.position?.lng,
                  );
                  setSuggestions(() => []);
                }}
                autoCapitalize="none"
                error={
                  touched.location && errors.location ? errors.location : ''
                }
                containerStyle={styles.inputContainer}
                mainContainerStyle={{...SPACING.mb8}}
              />
              <AppInput
                title={'Location Tag'}
                titleColor={COLORS.LIGHT_GRAY}
                value={values?.tag}
                placeholder={'Location tag'}
                onChangeText={handleChange('tag')}
                autoCapitalize="none"
                error={touched.tag && errors.tag ? errors.tag : ''}
                containerStyle={styles.inputContainer}
                mainContainerStyle={{...SPACING.mb8}}
              />
              <TimeInput
                title={'Set Start Time'}
                titleColor={COLORS.LIGHT_GRAY}
                value={
                  (values?.start_time_hours || values?.start_time_hours == 0) &&
                  (values?.start_time_minutes ||
                    values?.start_time_minutes == 0) &&
                  values?.start_time_periods &&
                  (values?.start_time_hours || '0') +
                    ' : ' +
                    (values?.start_time_minutes || '00') +
                    ' ' +
                    (values?.start_time_periods || 'AM')
                }
                placeholder="Start Time"
                hoursData={values?.start_time_hours}
                minutesData={values?.start_time_minutes}
                periodsData={values?.start_time_periods}
                setHoursData={(hours: any) =>
                  setFieldValue('start_time_hours', hours)
                }
                setMinutesData={(minutes: any) =>
                  setFieldValue('start_time_minutes', minutes)
                }
                setPeriodsData={(periods: any) =>
                  setFieldValue('start_time_periods', periods)
                }
                error={
                  (touched.start_time_hours && errors.start_time_hours)
                    ? errors.start_time_hours
                    : (touched.start_time_minutes && errors.start_time_minutes)
                    ? errors.start_time_minutes
                    : (touched.start_time_periods && errors.start_time_periods)
                    ? errors.start_time_periods
                    : ''
                }
                containerStyle={styles.inputContainer}
                mainContainerStyle={{...SPACING.mb8}}
              />
              <TimeInput
                title={'Set End Time'}
                titleColor={COLORS.LIGHT_GRAY}
                value={
                  (values?.end_time_hours || values?.end_time_hours == 0) &&
                  (values?.end_time_minutes || values?.end_time_minutes == 0) &&
                  values?.end_time_periods &&
                  (values?.end_time_hours || '1') +
                    ' : ' +
                    (values?.end_time_minutes || '00') +
                    ' ' +
                    (values?.end_time_periods || 'AM')
                }
                placeholder="End Time"
                hoursData={values?.end_time_hours}
                minutesData={values?.end_time_minutes}
                periodsData={values?.end_time_periods}
                setHoursData={(hours: any) =>
                  setFieldValue('end_time_hours', hours)
                }
                setMinutesData={(minutes: any) =>
                  setFieldValue('end_time_minutes', minutes)
                }
                setPeriodsData={(periods: any) =>
                  setFieldValue('end_time_periods', periods)
                }
                error={
                  touched.end_time_hours && errors.end_time_hours
                    ? errors.end_time_hours
                    : touched.end_time_minutes && errors.end_time_minutes
                    ? errors.end_time_minutes
                    : touched.end_time_periods && errors.end_time_periods
                    ? errors.end_time_periods
                    : ''
                }
                containerStyle={styles.inputContainer}
                mainContainerStyle={{...SPACING.mb8}}
              />
              <CustomButton
                title="Done"
                titleSize={18}
                titleFontFamily={INTER.BOLD}
                titleColor={
                  values?.location?.length == 0 || values?.tag?.length == 0
                    ? COLORS.DARK_GRAY
                    : COLORS.LIGHT_GRAY_04
                }
                isloading={loading}
                titleStyle={{lineHeight: RF(22)}}
                disabled={
                  values?.location?.length == 0 || values?.tag?.length == 0
                }
                customContainerStyle={{...SPACING.mt8}}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      <CustomFooter
        fontColor={COLORS.LIGHT_GRAY_05}
        containerStyle={{bottom: tabBarHeight + insets?.bottom}}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    minHeight: HP(70),
    borderTopLeftRadius: RF(7),
    borderTopRightRadius: RF(7),
    marginTop: -RF(10),
    paddingHorizontal: WP(8),
    ...SPACING.pt8,
    backgroundColor: COLORS.DARK_GRAY_04,
  },
  inputContainer: {
    borderWidth: RF(3),
    borderColor: COLORS.LIGHT_GRAY_04,
    paddingRight: 0,
    ...SPACING.py2,
    ...SPACING.px3,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  wheely: {
    height: HP(30),
    width: WP(25),
  },
});

export default AddSafeLocation;
