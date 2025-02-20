import {COLORS} from '@theme/colors';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React, {useRef, useState} from 'react';
import {Animated, Pressable, StyleSheet, View} from 'react-native';

interface ToggleProps {
  color?: any;
  selected: boolean;
  setSelected?: any;
  disabled?: boolean;
  onPress: any;
}

const Toggle = (props: Partial<ToggleProps>) => {
  const {
    color = COLORS.LIGHT_GRAY_04,
    selected = false,
    setSelected = () => {},
    disabled = false,
    onPress = () => {},
  } = props;
  const [isSelected, setIsSelected] = useState(selected);

  const animatedValue = useRef(new Animated.Value(isSelected ? 1 : 0)).current;

  const toggleSwitch = () => {
    if (!disabled) {
      Animated.timing(animatedValue, {
        toValue: isSelected ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
      let temp = !isSelected;
      setIsSelected(temp);
      setSelected && setSelected(temp);
      onPress && onPress();
    }
  };

  const toggleTranslate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, RF(16)],
  });

  return (
    <Pressable
      style={[styles.container, color && {borderColor: color}]}
      onPress={toggleSwitch}>
      <Animated.View
        style={[
          styles.toggle,
          {backgroundColor: isSelected ? COLORS.PRIMARY : color},
          {transform: [{translateX: toggleTranslate}]},
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: RF(45),
    height: RF(26),
    borderRadius: RF(6),
    borderWidth: RF(3),
    borderColor: COLORS.LIGHT_GRAY_04,
    ...SPACING.px1,
  },
  toggle: {
    height: RF(14),
    width: RF(16),
    borderRadius: RF(1),
  },
});

export default Toggle;
