import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {FlatList, Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {handleGeofencingSafeZone} from '../helper';
import {GEOFENCING_SAFE_ZONE_DATA} from '@utils/constants';
interface SafeZoneProps {
  child: any;
  safezone?: any;
  setSafezone?: any;
  containerStyle?: ViewStyle | any;
}

const SafeZone = (props: Partial<SafeZoneProps>) => {
  const {
    child = {},
    safezone = 1,
    setSafezone = () => {},
    containerStyle,
  } = props;
  const {user} = useSelector((state: any) => state.root.user);
  const dispatch: any = useDispatch();
  return (
    <View style={[styles.container, containerStyle]}>
      <CustomText
        size={12}
        fontFamily={INTER.BOLD}
        color={COLORS.LIGHT_GRAY_04}
        style={{lineHeight: RF(19)}}>
        Safe Zone
      </CustomText>
      <CustomText
        size={10}
        fontFamily={INTER.BOLD}
        color={COLORS.DARK_GRAY}
        style={{lineHeight: RF(16), ...SPACING.mt1, ...SPACING.mb3}}>
        Select the distance your child is allowed to go from a place.
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
              safezone == item?.id
                ? {backgroundColor: COLORS.PRIMARY}
                : {backgroundColor: COLORS.LIGHT_GRAY_04},
              index < GEOFENCING_SAFE_ZONE_DATA?.length - 1 && {...SPACING.mr3},
            ]}
            onPress={() => {
              handleGeofencingSafeZone(
                user?.email,
                child?.username,
                item?.id,
                dispatch,
              );
              setSafezone(item?.id);
            }}>
            <CustomText
              size={16}
              fontFamily={INTER.SEMI_BOLD}
              color={safezone == item?.id ? COLORS.LIGHT_GRAY_04 : COLORS.BLACK}
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

export default SafeZone;
