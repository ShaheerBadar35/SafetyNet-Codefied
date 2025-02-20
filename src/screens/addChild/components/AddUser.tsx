import AppInput from '@components/appInput';
import CustomFooter from '@components/customFooter';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface AddUser {
  value: any;
  setValue: any;
  editable?: boolean;
  isToggleDisabled?: boolean;
  containerStyle?: ViewStyle | any;
}

const AddUser = (props: Partial<AddUser>) => {
  const {
    value = {},
    setValue = () => {},
    editable = true,
    isToggleDisabled = false,
    containerStyle,
  } = props;
  const [name, setName] = useState(value?.name || '');
  const [username, setUsername] = useState(value?.username || '');
  const tabBarHeight: any = useBottomTabBarHeight();
  useEffect(() => {
    setValue({...value, name: name, username: username});
  }, [name, username]);

  return (
    <View style={[styles.container, containerStyle]}>
      <AppInput
        editable={!isToggleDisabled}
        title={'Child name'}
        titleColor={COLORS.DARK_GRAY}
        titleSize={12}
        titleStyle={{fontFamily: INTER.LIGHT, lineHeight: RF(19)}}
        value={name}
        onChangeText={(val: any) => setName(val)}
        inputStyle={styles.input}
        containerStyle={[
          styles.inputCon,
          name?.length > 0 && {backgroundColor: COLORS.DARK_GRAY_05},
        ]}
      />
      <AppInput
        editable={isToggleDisabled ? !isToggleDisabled : editable}
        title={'Child Userame'}
        titleColor={COLORS.DARK_GRAY}
        titleSize={12}
        titleStyle={{fontFamily: INTER.LIGHT, lineHeight: RF(19)}}
        value={username}
        onChangeText={(val: any) => setUsername(val)}
        inputStyle={styles.input}
        containerStyle={[
          styles.inputCon,
          username?.length > 0 && {backgroundColor: COLORS.DARK_GRAY_05},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    paddingRight: 0,
    paddingVertical: 0,
  },
  inputCon: {
    borderRadius: RF(7),
    borderWidth: RF(1),
    borderColor: COLORS.LIGHT_GRAY,
    ...SPACING.py3,
    ...SPACING.px3,
    backgroundColor: 'transparent',
  },
});

export default AddUser;
