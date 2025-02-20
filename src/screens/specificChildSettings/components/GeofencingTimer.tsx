import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {FlatList, Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import {handleGeofencingTimer} from '../helper';
import {useDispatch, useSelector} from 'react-redux';
import {GEOFENCING_SAFE_ZONE_DATA} from '@utils/constants';
interface GeofencingTimerProps {
  child: any;
  timer?: any;
  setTimer?: any;
  containerStyle?: ViewStyle | any;
}

const GeofencingTimer = (props: Partial<GeofencingTimerProps>) => {
  const {child = {}, timer = 1, setTimer = () => {}, containerStyle} = props;
  const {user} = useSelector((state: any) => state.root.user);
  const dispatch: any = useDispatch();
  return (
    <View style={[styles.container, containerStyle]}>
      <CustomText
        size={12}
        fontFamily={INTER.BOLD}
        color={COLORS.LIGHT_GRAY_04}
        style={{lineHeight: RF(19)}}>
        Timer
      </CustomText>
      <CustomText
        size={10}
        fontFamily={INTER.BOLD}
        color={COLORS.DARK_GRAY}
        style={{lineHeight: RF(16), ...SPACING.mt1, ...SPACING.mb3}}>
        Select the time your children can stay out of the defined perimeter.
      </CustomText>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: any) => item?.id}
        data={GEOFENCING_SAFE_ZONE_DATA}
        renderItem={({item, index}: any) => (
          <Pressable
            style={[
              {borderRadius: RF(7), ...SPACING.py3, ...SPACING.px5},
              timer == item?.id
                ? {backgroundColor: COLORS.PRIMARY}
                : {backgroundColor: COLORS.LIGHT_GRAY_04},
              index < GEOFENCING_SAFE_ZONE_DATA?.length - 1 && {...SPACING.mr3},
            ]}
            onPress={() => {
              handleGeofencingTimer(
                user?.email,
                child?.username,
                item?.id,
                dispatch,
              );
              setTimer(item?.id);
            }}>
            <CustomText
              size={16}
              fontFamily={INTER.SEMI_BOLD}
              color={timer == item?.id ? COLORS.LIGHT_GRAY_04 : COLORS.BLACK}
              style={{lineHeight: RF(20)}}>
              {item?.value} m
            </CustomText>
          </Pressable>
        )}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: RF(7),
    ...SPACING.py3,
    ...SPACING.px4,
    backgroundColor: COLORS.LIGHT_BLACK_4,
  },
});

export default GeofencingTimer;
