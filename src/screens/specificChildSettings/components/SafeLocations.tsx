import {ICONS} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {navigate} from '@services/NavService';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {ROUTES} from '@utils/routes';
import React, {useState} from 'react';
import {FlatList, StyleSheet, View, ViewStyle} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {handleDeleteSafeLocation} from '../helper';

interface SafeLocationsProps {
  child: any;
  containerStyle?: ViewStyle | any;
}

const SafeLocations = (props: Partial<SafeLocationsProps>) => {
  const {child = {}, containerStyle} = props;
  const {user} = useSelector((state: any) => state.root.user);
  const [locationsList, setLocationsList] = useState(
    child?.geofencing_settings?.safe_locations || [],
  );
  const dispatch: any = useDispatch();

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item?.id}
        data={locationsList}
        renderItem={({item, index}: any) => (
          <RenderItem
            child={child}
            item={item}
            index={index}
            locationsList={locationsList}
            setLocationsList={setLocationsList}
            onPressDelete={async () =>
              handleDeleteSafeLocation(
                user?.email,
                child?.username,
                item?.location,
                item?.tag,
                dispatch,
                setLocationsList,
              )
            }
          />
        )}
        ListHeaderComponent={
          <View>
            <CustomText
              size={12}
              fontFamily={INTER.BOLD}
              color={COLORS.LIGHT_GRAY_04}
              style={{lineHeight: RF(19)}}>
              Safe Locations
            </CustomText>
            <CustomText
              size={10}
              fontFamily={INTER.REGULAR}
              color={COLORS.DARK_GRAY}
              style={{lineHeight: RF(16)}}>
              Select up to 4 locations Emily can be at:
            </CustomText>
          </View>
        }
        ListFooterComponent={
          <CustomIcon
            path={ICONS.ADD}
            resizeMode="cover"
            customStyle={styles.icon}
            containerStyle={[
              styles.iconCon,
              locationsList?.length >= 4 && {
                backgroundColor: COLORS.LIGHT_GRAY_02,
              },
            ]}
            onPress={() =>
              locationsList?.length < 4 &&
              navigate(ROUTES.ADD_SAFE_LOCATION, {
                child: child,
                locationsList: locationsList,
                setLocationsList: setLocationsList,
              })
            }
            // onPress={() =>
            //   selectedContactsList?.length < 4 &&
            //   toggleModal('addFromContacts', true)
            // }
          />
        }
      />
    </View>
  );
};

const RenderItem = ({
  child,
  item,
  index,
  locationsList = [],
  setLocationsList = () => {},
  onPressDelete = () => {},
}: any) => {
  return (
    <View style={[styles.contactCon, {maxWidth: '100%'}]}>
      <View style={[styles.row, {maxWidth: '70%'}]}>
        <CustomIcon
          path={ICONS.LOCATION}
          resizeMode="cover"
          customStyle={styles.locationIcon}
          containerStyle={styles.locationIconCon}
        />
        <View style={{...SPACING.ml3, maxWidth: '100%'}}>
          <CustomText
            size={12}
            fontFamily={INTER.BOLD}
            color={COLORS.LIGHT_GRAY_04}
            style={{lineHeight: RF(19)}}
            numberOfLines={1}>
            {item?.location}
          </CustomText>
          <CustomText
            size={10}
            fontFamily={INTER.REGULAR}
            color={COLORS.WHITE}
            style={{lineHeight: RF(16)}}
            numberOfLines={1}>
            {item?.tag}
          </CustomText>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <CustomIcon
          path={ICONS.DELETE}
          tintColor={COLORS.LIGHT_GRAY_04}
          resizeMode="cover"
          containerStyle={[styles.deleteIcon, {...SPACING.mr3}]}
          onPress={onPressDelete}
        />
        <CustomIcon
          path={ICONS.EDIT}
          tintColor={COLORS.LIGHT_GRAY_04}
          resizeMode="cover"
          containerStyle={styles.deleteIcon}
          onPress={() =>
            navigate(ROUTES.ADD_SAFE_LOCATION, {
              child: child,
              location: {id: index, ...item},
              locationsList: locationsList,
              setLocationsList: setLocationsList,
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: RF(7),
    ...SPACING.p3,
    backgroundColor: COLORS.LIGHT_BLACK_4,
  },
  icon: {
    height: RF(12),
    width: RF(12),
  },
  iconCon: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: RF(7),
    ...SPACING.py2,
    ...SPACING.px4,
    ...SPACING.mt4,
    backgroundColor: COLORS.PRIMARY,
  },
  contactCon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...SPACING.mx4,
    ...SPACING.pb2,
    ...SPACING.mb2,
    ...SPACING.mt5,
    borderBottomWidth: RF(1),
    borderBottomColor: COLORS.WHITE,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  locationIcon: {
    height: RF(20),
    width: RF(20),
  },
  locationIconCon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: RF(26),
    width: RF(26),
    borderRadius: RF(26 / 2),
    backgroundColor: COLORS.LIGHT_GRAY_02,
  },
  deleteIcon: {
    height: RF(16),
    width: RF(16),
    alignContent: 'flex-end',
  },
});

export default SafeLocations;
