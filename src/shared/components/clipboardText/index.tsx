import {ICONS} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import Clipboard from '@react-native-clipboard/clipboard';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface ClipboardTextProps {
  text: string;
  containerStyle?: ViewStyle | any;
}

const ClipboardText = (props: Partial<ClipboardTextProps>) => {
  const {text = '', containerStyle} = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <CustomText
        size={15}
        fontFamily={INTER.REGULAR}
        color={COLORS.LIGHT_GARY_03}
        style={{lineHeight: RF(19)}}>
        {text}
      </CustomText>
      <CustomIcon
        path={ICONS.COPY}
        resizeMode="cover"
        customStyle={{height: RF(26), width: RF(26)}}
        containerStyle={{height: RF(26), width: RF(26)}}
        onPress={() => Clipboard.setString(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: RF(7),
    borderWidth: RF(2),
    borderColor: COLORS.BLACK,
    ...SPACING.py1,
    ...SPACING.px4,
  },
});

export default ClipboardText;
