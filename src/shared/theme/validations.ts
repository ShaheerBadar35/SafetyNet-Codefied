import * as Yup from 'yup';

const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    // .email('Please provide valid email')
    .required('Please enter your email address or username'),
  password: Yup.string()
    .matches(
      passwordRegExp,
      'Your password needs to be at least 8 characters long and include an uppercase letter, a lowercase letter, a special character, and a number.',
    )
    .required('Please enter your password.'),
});

export const SignupStep1Schema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Please provide valid email')
    .required('Please enter your email address'),
  referral_code: Yup.string().trim(),
});

export const SignupStep2Schema = Yup.object().shape({
  password: Yup.string()
    .matches(
      passwordRegExp,
      'Your password needs to be at least 8 characters long and include an uppercase letter, a lowercase letter, a special character, and a number.',
    )
    .required('Please enter your password.'),
  confirm_password: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const EditProfileSchema = Yup.object().shape({
  // name: Yup.string().required('Please enter name'),
  // number: Yup.string().required('Please enter phone number'),
  name: Yup.string(), // no longer required
  number: Yup.string(), // no longer required
  email: Yup.string()
    .trim()
    .email('Please provide valid email')
    .required('Please enter your email address'),
});

export const EditProfileChildSchema = Yup.object().shape({
  name: Yup.string().required('Please enter name'),
  email: Yup.string()
    .trim()
    .email('Please provide valid email')
    .required('Please enter your email address'),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Please provide valid email')
    .required('Please enter your email address'),
});

export const AddSafeLocationSchema = Yup.object().shape({
  location: Yup.string().trim().required('Please enter your location'),
  tag: Yup.string().trim().required('Please enter your location tag'),
  latitude: Yup.string().trim().required('Latitude is required'),
  longitude: Yup.string().trim().required('Longitude is required'),
  start_time_hours: Yup.string().trim().required('Start time is required'),
  start_time_minutes: Yup.string().trim().required('Start time is required'),
  start_time_periods: Yup.string().trim().required('Start time is required'),
  end_time_hours: Yup.string().trim().required('End time is required'),
  end_time_minutes: Yup.string().trim().required('End time is required'),
  end_time_periods: Yup.string().trim().required('End time is required'),
});

export const ChangePasswordSchema = Yup.object().shape({
  current_password: Yup.string()
    .matches(
      passwordRegExp,
      'Your password needs to be at least 8 characters long and include an uppercase letter, a lowercase letter, a special character, and a number.',
    )
    .required('Please enter your current password.'),
  password: Yup.string()
    .matches(
      passwordRegExp,
      'Your password needs to be at least 8 characters long and include an uppercase letter, a lowercase letter, a special character, and a number.',
    )
    .required('Please enter your new password.')
    .notOneOf(
      [Yup.ref('current_password'), null],
      'New password should be different from current one.',
    ),
  confirm_password: Yup.string()
    .required('Confirm new password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
