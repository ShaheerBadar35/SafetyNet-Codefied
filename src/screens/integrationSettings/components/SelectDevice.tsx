import {ICONS} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import WatchModal from '@components/watchModal';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {INTEGRATION_SETTINGS_DEVICE} from '@utils/constants';
import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {handleFitbitOAuthApi, handleGoogleWatchOAuth} from '../helper';

interface SelectDeviceProps {
  disabled?: boolean;
  containerStyle?: ViewStyle | any;
}

const SelectDevice = (props: Partial<SelectDeviceProps>) => {
  const {disabled = false, containerStyle} = props;
  const {user} = useSelector((state: any) => state.root.user);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(
    user?.integration_settings?.heartbeat_monitoring?.device || 0,
  );
  const dispatch: any = useDispatch();

  const WATCH_DATA = [
    {
      id: 1,
      name: 'FitBit',
      value: INTEGRATION_SETTINGS_DEVICE.FITBIT,
    },
    {
      id: 2,
      name: 'Google Watch',
      value: INTEGRATION_SETTINGS_DEVICE.GOOGLE_WATCH,
    },
  ];

  // useEffect(() => {
  //   if (selected && selected != 0)
  //     handleIntegrationDevice(user?.email, selected, dispatch);
  // }, [selected]);

  useEffect(() => {
    if (selected == INTEGRATION_SETTINGS_DEVICE?.FITBIT) {
      handleFitbitOAuthApi(user?.email, selected, dispatch);
    } else if (selected == INTEGRATION_SETTINGS_DEVICE?.GOOGLE_WATCH) {
      setOpenModal(true);
      // handleGoogleWatchOAuth(user?.email, selected, dispatch);
    }
  }, [selected]);

  return (
    <View style={[styles.container, containerStyle]}>
      <CustomText
        size={12}
        fontFamily={INTER.BOLD}
        color={COLORS.LIGHT_GRAY_04}
        style={{lineHeight: RF(19)}}
        numberOfLines={1}>
        Select Device
      </CustomText>
      <CustomText
        size={10}
        fontFamily={INTER.REGULAR}
        color={COLORS.DARK_GRAY}
        style={{lineHeight: RF(16), ...SPACING.mt1, ...SPACING.mb4}}
        numberOfLines={2}>
        Select the smartwatch for heartrate monitoring:
      </CustomText>
      <FlatList
        keyExtractor={(item: any) => item?.id}
        data={WATCH_DATA}
        renderItem={({item, index}: any) => (
          <RenderItem
            item={item}
            index={index}
            isSelected={selected == item?.value}
            onPress={() => (disabled ? {} : setSelected(item?.value))}
          />
        )}
      />
      <WatchModal
        open={openModal}
        icon={ICONS.WATCH}
        title={'Sign in to Google'}
        desc={
          'To use Google Watch, you must download Google Fit on your device and your watch. You must sign into the same Gmail account you used for your watch for the data to be synced with Safety Net'
        }
        onPress={() => {
          setOpenModal(false);
          setTimeout(() => {
            handleGoogleWatchOAuth(user?.email, selected, dispatch);
          }, 500);
        }}
      />
    </View>
  );
};

const RenderItem = ({
  item,
  index,
  isSelected = false,
  onPress = () => {},
}: any) => {
  return (
    <Pressable
      style={[
        styles.row,
        index > 0 && {borderTopWidth: RF(1), borderTopColor: COLORS.WHITE},
      ]}
      onPress={onPress && onPress}>
      <CustomText
        size={12}
        fontFamily={INTER.BOLD}
        color={COLORS.LIGHT_GRAY_04}
        style={{lineHeight: RF(19)}}
        numberOfLines={1}>
        {item?.name}
      </CustomText>
      {isSelected ? (
        <CustomIcon
          path={ICONS.ROUND_TICK}
          resizeMode="cover"
          containerStyle={styles.roundConSelected}
          onPress={onPress && onPress}
        />
      ) : (
        <Pressable style={styles.roundCon} onPress={onPress && onPress} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: RF(7),
    ...SPACING.p3,
    backgroundColor: COLORS.LIGHT_BLACK_4,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SPACING.mx5,
    ...SPACING.py3,
  },
  roundCon: {
    height: RF(16),
    width: RF(16),
    borderRadius: RF(16 / 2),
    borderWidth: RF(2),
    borderColor: COLORS.LIGHT_GRAY_04,
  },
  roundConSelected: {
    height: RF(19),
    width: RF(19),
  },
});

export default SelectDevice;
