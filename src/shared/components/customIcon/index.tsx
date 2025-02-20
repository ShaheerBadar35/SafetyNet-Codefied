import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';

interface Props {
  path: any;
  uri: any;
  resizeMode: 'contain' | 'center' | 'cover' | 'stretch';
  customStyle: any;
  onPress: () => void;
  tintColor: string;
  containerStyle?: any;
}

const CustomIcon = ({
  path,
  uri,
  resizeMode = 'cover',
  customStyle,
  onPress,
  tintColor,
  containerStyle,
}: Partial<Props>) => {
  return (
    <>
      <TouchableOpacity
        disabled={!onPress}
        onPress={onPress}
        hitSlop={GST.HITSLOP}
        style={[styles.container, containerStyle]}>
        <FastImage
          source={uri ? {uri} : path}
          resizeMode={resizeMode}
          style={[
            {
              width: '100%',
              height: '100%',
            },
            customStyle,
          ]}
          tintColor={tintColor}
        />
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    height: RF(24),
    width: RF(24),
  },
});
export default CustomIcon;
