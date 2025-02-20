import {ICONS} from '@assets';
import AddFromContactModal from '@components/addFromContactModal';
import AddFromExistingContactModal from '@components/addFromExistingContactModal';
import AddNewContactModal from '@components/addNewContactModal';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, ViewStyle} from 'react-native';
import {
  addContact,
  getContacts,
  handleGeofencingEmergencyContacts,
  isContactsSame,
} from '../helper';
import {useDispatch, useSelector} from 'react-redux';

interface EmergencyContactsProps {
  child: any;
  containerStyle?: ViewStyle | any;
}

const EmergencyContacts = (props: Partial<EmergencyContactsProps>) => {
  const {child = {}, containerStyle} = props;
  const {user} = useSelector((state: any) => state.root.user);
  const dispatch: any = useDispatch();
  const [contactsList, setContactsList] = useState([]);
  const [selectedContactsList, setSelectedContactsList] = useState(
    child?.geofencing_settings?.emergency_contacts || [],
  );
  const [modal, setModal] = useState({
    addFromContacts: false,
    addFromExistingContact: false,
    addNewContact: false,
  });
  const [selectedContactOption, setSelectedContactOption] = useState<any>('');
  const toggleModal = (modalName: string, isVisible: boolean) => {
    setModal(prevModals => ({...prevModals, [modalName]: isVisible}));
  };

  useEffect(() => {
    if (modal?.addFromExistingContact) getContacts(setContactsList);
  }, [modal?.addFromExistingContact]);

   // $&

  useEffect(() => {
    if (
      (typeof child?.emergency_contacts == 'undefined' &&
        selectedContactsList?.length > 0) ||
      selectedContactsList?.length != child?.emergency_contacts?.length
    ) {
      if (
        !isContactsSame(
          child?.geofencing_settings?.emergency_contacts || [],
          selectedContactsList,
        )
      )
        handleGeofencingEmergencyContacts(
          user?.email,
          child?.username,
          selectedContactsList,
          dispatch,
        );
    }
  }, [selectedContactsList]);

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item?.id}
        data={selectedContactsList}
        renderItem={({item, index}: any) => (
          <RenderItem
            item={item}
            index={index}
            contacts={selectedContactsList}
            setContacts={setSelectedContactsList}
          />
        )}
        ListHeaderComponent={
          <View style={selectedContactsList?.length > 0 && {...SPACING.mb5}}>
            <CustomText
              size={12}
              fontFamily={INTER.BOLD}
              color={COLORS.LIGHT_GRAY_04}
              style={{lineHeight: RF(19)}}>
              Emergency Contacts
            </CustomText>
            <CustomText
              size={10}
              fontFamily={INTER.REGULAR}
              color={COLORS.DARK_GRAY}
              style={{lineHeight: RF(16)}}>
              Select up to 4 contacts who you would like to get an emergency
              alert.
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
              selectedContactsList?.length >= 4 && {
                backgroundColor: COLORS.LIGHT_GRAY_02,
              },
            ]}
            onPress={() =>
              selectedContactsList?.length < 4 &&
              toggleModal('addFromContacts', true)
            }
          />
        }
      />
      <AddFromContactModal
        open={modal?.addFromContacts}
        selected={selectedContactOption}
        setSelected={setSelectedContactOption}
        onPressClose={() => toggleModal('addFromContacts', false)}
        onPressBtn={() => {
          toggleModal('addFromContacts', false);
          setTimeout(() => {
            selectedContactOption &&
              selectedContactOption == 1 &&
              toggleModal('addFromExistingContact', true);
            selectedContactOption &&
              selectedContactOption == 2 &&
              toggleModal('addNewContact', true);
          }, 1000);
        }}
      />
      <AddFromExistingContactModal
        open={modal?.addFromExistingContact}
        selectedContactsList={selectedContactsList}
        setSelectedContactsList={setSelectedContactsList}
        onPressClose={() => toggleModal('addFromExistingContact', false)}
        onPressBtn={() => toggleModal('addFromExistingContact', false)}
        contacts={contactsList}
      />
      <AddNewContactModal
        open={modal?.addNewContact}
        disabled={selectedContactsList?.length == 4}
        onPressClose={() => toggleModal('addNewContact', false)}
        onPressBtn={(contact: any) => {
          addContact(setContactsList, setSelectedContactsList, contact);
          toggleModal('addNewContact', false);
        }}
      />
    </View>
  );
};

const RenderItem = ({item, index, contacts, setContacts = () => {}}: any) => {
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
        onPress={() => handleDeleteContact(item?.id, contacts, setContacts)}
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
