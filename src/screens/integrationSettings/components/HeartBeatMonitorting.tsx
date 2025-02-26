import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import HeartRateThreshold from './HeartRateThreshold';
import SelectDevice from './SelectDevice';
import {SPACING} from '@theme/spacing';
import EmergencyContacts from './EmergencyContacts';

interface HeartBeatMonitoringProps {
  disabled?: boolean;
  containerStyle?: ViewStyle | any;
}

const HeartBeatMonitoring = (props: HeartBeatMonitoringProps) => {
  const {disabled = false, containerStyle} = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <HeartRateThreshold disabled={disabled} />
      <SelectDevice disabled={disabled} containerStyle={{...SPACING.my4}} />
      {/* <EmergencyContacts disabled={disabled} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HeartBeatMonitoring;
