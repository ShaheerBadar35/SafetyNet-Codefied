//NO VALIDATION OF PHONE NUMBER ONLY CODE PICKER

// import React, {forwardRef, useState} from 'react';
// import {StyleSheet, View, TextInput, Pressable} from 'react-native';
// import CountryPicker, {
//   Country,
//   CountryCode,
// } from 'react-native-country-picker-modal';
// import CustomText from '@components/customText';
// import {COLORS} from '@theme/colors';
// import {SPACING} from '@theme/spacing';
// import {RF} from '@theme/responsive';
// import {ICONS} from '@assets/icons';
// import CustomIcon from '@components/customIcon';

// interface PhoneNumberInputProps {
//   title?: string;
//   titleSize?: number;
//   titleColor?: string;
//   placeholder?: string;
//   value: string;
//   onChangeText: (text: string) => void;
//   onCountryChange?: (country: Country) => void; // Updated type
//   containerStyle?: any;
//   inputStyle?: any;
//   titleStyle?: any;
//   disabled?: boolean;
// }

// const PhoneNumberInput = forwardRef(
//   (
//     {
//       title,
//       titleSize = 12,
//       titleColor = COLORS.DARK_GRAY,
//       placeholder = '+12 34567890',
//       value,
//       onChangeText,
//       onCountryChange,
//       containerStyle,
//       inputStyle,
//       titleStyle,
//       disabled = false,
//     }: PhoneNumberInputProps,
//     ref: any,
//   ) => {
//     const [countryCode, setCountryCode] = useState<CountryCode>('US');
//     const [country, setCountry] = useState<Country | null>(null);
//     const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);

//     const handleCountrySelect = (country: Country) => {
//       setCountryCode(country.cca2);
//       setCountry(country);
//       onCountryChange?.(country); // Call the callback with the selected country
//       setCountryPickerVisible(false);
//     };

//     return (
//       <View style={[styles.mainContainer, containerStyle]}>
//         {!!title && (
//           <CustomText
//             size={titleSize}
//             color={titleColor}
//             style={[styles.title, titleStyle]}>
//             {title}
//           </CustomText>
//         )}

//         <View style={styles.inputContainer}>
//           {/* Country Code Picker */}
//           <Pressable
//             style={styles.countryCodeContainer}
//             onPress={() => setCountryPickerVisible(true)}
//             disabled={disabled}>
//             <CustomText style={styles.countryCodeText}>
//               {country ? `+${country.callingCode[0]}` : '+1'}
//             </CustomText>
//             {/* <CustomIcon
//               path={ICONS.UPDATE}
//               tintColor={COLORS.DARK_GRAY}
//             //   style={styles.dropdownIcon}
//             /> */}
//           </Pressable>

//           {/* Phone Number Input */}
//           <TextInput
//             ref={ref}
//             style={[styles.input, inputStyle]}
//             placeholder={placeholder}
//             placeholderTextColor={COLORS.DARK_GRAY}
//             value={value}
//             onChangeText={onChangeText}
//             keyboardType="phone-pad"
//             editable={!disabled}
//           />
//         </View>

//         {/* Country Picker Modal */}
//         <CountryPicker
//           visible={isCountryPickerVisible}
//           withCallingCode
//           withFilter
//           withFlag
//           withAlphaFilter
//           withCallingCodeButton
//           withEmoji
//           countryCode={countryCode}
//           onSelect={handleCountrySelect}
//           onClose={() => setCountryPickerVisible(false)}
//           containerButtonStyle={styles.countryPickerButton}
//         />
//       </View>
//     );
//   },
// );

// const styles = StyleSheet.create({
//   mainContainer: {
//     width: '100%',
//     ...SPACING.mb10,
//   },
//   title: {
//     lineHeight: RF(19),
//     ...SPACING.mb2,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: COLORS.LIGHT_GRAY_02,
//     borderRadius: RF(7),
//     paddingHorizontal: RF(16),
//     paddingVertical: RF(12),
//   },
//   countryCodeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: RF(10),
//   },
//   countryCodeText: {
//     fontSize: RF(14),
//     color: COLORS.DARK_GRAY,
//     marginRight: RF(5),
//   },
//   dropdownIcon: {
//     width: RF(12),
//     height: RF(12),
//   },
//   input: {
//     flex: 1,
//     fontSize: RF(14),
//     color: COLORS.DARK_GRAY,
//     paddingVertical: 0,
//   },
//   countryPickerButton: {
//     display: 'none', // Hide the default button
//   },
// });

// export default PhoneNumberInput;

//FIXING VALIDATION
import React, {forwardRef, useState} from 'react';
import {StyleSheet, View, TextInput, Pressable} from 'react-native';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import {parsePhoneNumberFromString} from 'libphonenumber-js';
import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {SPACING} from '@theme/spacing';
import {RF} from '@theme/responsive';
import {ICONS} from '@assets/icons';
import CustomIcon from '@components/customIcon';

interface PhoneNumberInputProps {
  title?: string;
  titleSize?: number;
  titleColor?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onCountryChange?: (country: Country) => void;
  containerStyle?: any;
  inputStyle?: any;
  titleStyle?: any;
  disabled?: boolean;
}

const PhoneNumberInput = forwardRef(
  (
    {
      title,
      titleSize = 12,
      titleColor = COLORS.DARK_GRAY,
      placeholder = '+12 34567890',
      value,
      onChangeText,
      onCountryChange,
      containerStyle,
      inputStyle,
      titleStyle,
      disabled = false,
    }: PhoneNumberInputProps,
    ref: any,
  ) => {
    const [countryCode, setCountryCode] = useState<CountryCode>('US');
    const [country, setCountry] = useState<Country | null>(null);
    const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);

    const handleCountrySelect = (country: Country) => {
      setCountryCode(country.cca2);
      setCountry(country);
      onCountryChange?.(country);
      setCountryPickerVisible(false);
    };

    const handlePhoneNumberChange = (text: string) => {
      // Allow only numeric input
      const numericText = text.replace(/[^0-9]/g, '');
      onChangeText(numericText);
    };

    return (
      <View style={[styles.mainContainer, containerStyle]}>
        {!!title && (
          <CustomText
            size={titleSize}
            color={titleColor}
            style={[styles.title, titleStyle]}>
            {title}
          </CustomText>
        )}

        <View style={styles.inputContainer}>
          {/* Country Code Picker */}
          <Pressable
            style={styles.countryCodeContainer}
            onPress={() => setCountryPickerVisible(true)}
            disabled={disabled}>
            <CustomText style={styles.countryCodeText}>
              {country ? `+${country.callingCode[0]}` : '+1'}
            </CustomText>
          </Pressable>

          {/* Phone Number Input */}
          <TextInput
            ref={ref}
            style={[styles.input, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor={COLORS.DARK_GRAY}
            value={value}
            onChangeText={handlePhoneNumberChange}
            keyboardType="phone-pad"
            editable={!disabled}
            maxLength={15} // Limit input length
          />
        </View>

        {/* Country Picker Modal */}
        <CountryPicker
          visible={isCountryPickerVisible}
          withCallingCode
          withFilter
          withFlag
          withAlphaFilter
          withCallingCodeButton
          withEmoji
          countryCode={countryCode}
          onSelect={handleCountrySelect}
          onClose={() => setCountryPickerVisible(false)}
          containerButtonStyle={styles.countryPickerButton}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    ...SPACING.mb10,
  },
  title: {
    lineHeight: RF(19),
    ...SPACING.mb2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_GRAY_02,
    borderRadius: RF(7),
    paddingHorizontal: RF(16),
    paddingVertical: RF(12),
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: RF(10),
  },
  countryCodeText: {
    fontSize: RF(14),
    color: COLORS.DARK_GRAY,
    marginRight: RF(5),
  },
  dropdownIcon: {
    width: RF(12),
    height: RF(12),
  },
  input: {
    flex: 1,
    fontSize: RF(14),
    color: COLORS.DARK_GRAY,
    paddingVertical: 0,
  },
  countryPickerButton: {
    display: 'none', // Hide the default button
  },
});

export default PhoneNumberInput;