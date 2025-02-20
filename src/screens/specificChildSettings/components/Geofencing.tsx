import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import GeofencingTimer from './GeofencingTimer';
import SafeZone from './SafeZone';
import EmergencyContacts from './EmergencyContacts';
import {SPACING} from '@theme/spacing';
import SafeLocations from './SafeLocations';

interface GeofencingProps {
  child: any;
  timer?: any;
  setTimer?: any;
  safezone?: any;
  setSafeZone?: any;
  containerStyle?: ViewStyle | any;
}

const Geofencing = (props: Partial<GeofencingProps>) => {
  const {
    child,
    timer,
    setTimer = () => {},
    safezone,
    setSafeZone,
    containerStyle,
  } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <GeofencingTimer
        child={child}
        timer={timer}
        setTimer={setTimer}
        containerStyle={{...SPACING.mb4}}
      />
      <SafeLocations child={child} containerStyle={{...SPACING.mb4}} />
      <SafeZone
        child={child}
        safezone={safezone}
        setSafezone={setSafeZone}
        containerStyle={{...SPACING.mb4}}
      />
      <EmergencyContacts child={child} containerStyle={{...SPACING.mb4}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Geofencing;
