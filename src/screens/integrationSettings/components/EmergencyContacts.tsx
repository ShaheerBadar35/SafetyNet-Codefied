import {ICONS} from '@assets';
import AddFromEmergencyContactModal from '@components/addFromEmergencyContacts';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, ViewStyle} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {handleIntegrationEmergencyContacts} from '../helper';

interface EmergencyContactsProps {
  disabled?: boolean;
  containerStyle?: ViewStyle | any;
}

const EmergencyContacts = (props: Partial<EmergencyContactsProps>) => {
  const {disabled = false, containerStyle} = props;
  const {user} = useSelector((state: any) => state.root.user);
  const [showModal, setShowModal] = useState(false);
  const [selectedContactsList, setSelectedContactsList] = useState(
    user?.integration_settings?.heartbeat_monitoring?.emergency_contacts || [],
  );
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (
      (typeof user?.emergency_contacts == 'undefined' &&
        selectedContactsList?.length > 0) ||
      (selectedContactsList?.length != user?.emergency_contacts?.length &&
        selectedContactsList?.length > 0)
    ) {
      handleIntegrationEmergencyContacts(
        user?.email,
        selectedContactsList,
        dispatch,
      );
    }
  }, [selectedContactsList]);

  return (
    <View style={[styles.container, containerStyle]}>
      <CustomText
        size={12}
        fontFamily={INTER.BOLD}
        color={COLORS.LIGHT_GRAY_04}
        style={{lineHeight: RF(19)}}
        numberOfLines={1}>
        Emergency Contacts
      </CustomText>
      <CustomText
        size={10}
        fontFamily={INTER.REGULAR}
        color={COLORS.DARK_GRAY}
        style={{lineHeight: RF(16), ...SPACING.mt1, ...SPACING.mb4}}
        numberOfLines={2}>
        Select up to 4 contacts who you would like to get an emergency alert.
      </CustomText>
      <FlatList
        keyExtractor={(item: any) => item?.id}
        data={selectedContactsList}
        renderItem={({item, index}: any) => (
          <RenderItem
            item={item}
            index={index}
            disabled={disabled}
            contacts={selectedContactsList}
            setContacts={setSelectedContactsList}
          />
        )}
        ListFooterComponent={
          <CustomIcon
            path={ICONS.ADD}
            resizeMode="cover"
            customStyle={styles.icon}
            containerStyle={[styles.iconCon, {alignSelf: 'flex-end'}]}
            onPress={() => !disabled && setShowModal(true)}
          />
        }
        contentContainerStyle={{...SPACING.px5}}
      />
      <AddFromEmergencyContactModal
        open={showModal}
        selectedContactsList={selectedContactsList}
        setSelectedContactsList={setSelectedContactsList}
        onPressClose={() => setShowModal(false)}
        onPressBtn={() => setShowModal(false)}
        contacts={user?.emergency_contacts || []}
      />
    </View>
  );
};

const handleDeleteContact = (
  id: any,
  contacts: any = [],
  setContacts: any = () => {},
) => {
  setContacts && setContacts(contacts?.filter((item: any) => item?.id != id));
};

const RenderItem = ({
  item,
  index,
  disabled = false,
  contacts,
  setContacts = () => {},
}: any) => {
  return (
    <View style={styles.contactCon}>
      <View style={styles.row}>
        <View style={styles.nameCon}>
          <CustomText
            size={12}
            fontFamily={INTER.BOLD}
            color={COLORS.DARK_GRAY_03}
            style={{lineHeight: RF(19)}}>
            {item?.name?.[0]}
          </CustomText>
        </View>
        <CustomText
          size={12}
          fontFamily={INTER.BOLD}
          color={COLORS.LIGHT_GRAY_04}
          style={{lineHeight: RF(19), ...SPACING.ml2}}>
          {item?.name}
        </CustomText>
      </View>
      <CustomIcon
        path={ICONS.DELETE}
        resizeMode="cover"
        containerStyle={styles.deleteIcon}
        onPress={() =>
          !disabled && handleDeleteContact(item?.id, contacts, setContacts)
        }
      />
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
    borderRadius: RF(7),
    ...SPACING.py2,
    ...SPACING.px4,
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
    borderBottomWidth: RF(1),
    borderBottomColor: COLORS.WHITE,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameCon: {
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
  },
});

export default EmergencyContacts;
