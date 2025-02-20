import CustomText from '@components/customText';
import Wrapper from '@components/wrapper';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Logout = () => {
  return (
    <Wrapper noPaddingBottom>
      <View style={styles.container}>
        <CustomText>Logout Screen</CustomText>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default Logout;
