import {ICONS} from '@assets';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React from 'react';
import {FlatList, StyleSheet, View, ViewStyle} from 'react-native';

interface EmergencyContactsProps {
  contacts: any;
  setContacts: any;
  modal?: any;
  setModal?: any;
  toggleModal?: any;
  diableAll?: boolean;
  deleteContact: any;
  containerStyle?: ViewStyle | any;
}

const EmergencyContacts = (props: Partial<EmergencyContactsProps>) => {
  const {
    contacts = [],
    setContacts = () => {},
    modal,
    setModal = () => {},
    toggleModal = () => {},
    diableAll = false,
    containerStyle,
    deleteContact = () => {},
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <CustomText
        size={20}
        fontFamily={INTER.BOLD}
        color={COLORS.LIGHT_GRAY}
        style={{lineHeight: RF(25)}}>
        Emergency Contacts
      </CustomText>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item?.id}
        data={contacts}
        renderItem={({item, index}: any) => (
          <RenderItem
            item={item}
            index={index}
            deleteContact={deleteContact}
            contacts={contacts}
            setContacts={setContacts}
            disabled={diableAll}
          />
        )}
        ListFooterComponent={
          <View
            style={[
              {
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                ...SPACING.px4,
              },
              contacts?.length < 4 && {justifyContent: 'flex-end'},
              contacts?.length > 0 && {...SPACING.mt4},
            ]}>
            {contacts?.length == 4 && (
              <CustomText
                size={10}
                fontFamily={INTER.REGULAR}
                color={COLORS.WHITE}
                style={{lineHeight: RF(16), width: '90%'}}>
                You can only add up to 4 emergency contacts.
              </CustomText>
            )}
            <CustomIcon
              path={ICONS.ADD}
              resizeMode="cover"
              tintColor={
                contacts?.length == 4 ? COLORS.DARK_GRAY : COLORS.WHITE
              }
              customStyle={styles.add}
              containerStyle={[
                styles.addCon,
                contacts?.length == 4 && {
                  backgroundColor: COLORS.LIGHT_GRAY_02,
                },
              ]}
              onPress={() =>
                contacts?.length < 4 &&
                !diableAll &&
                toggleModal('addFromContacts', true)
              }
            />
          </View>
        }
        contentContainerStyle={[{...SPACING.mt7}, diableAll && {opacity: 0.4}]}
      />
    </View>
  );
};

const RenderItem = ({
  item,
  index,
  contacts,
  deleteContact,
  setContacts = () => {},
  disabled = false,
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
          !disabled &&
          deleteContact(contacts?.filter((i: any) => i?.id != item?.id))
        }
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
    width: '100%',
    borderRadius: RF(7),
    ...SPACING.p4,
    backgroundColor: COLORS.LIGHT_BLACK,
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
  add: {
    height: RF(12),
    width: RF(12),
  },
  addCon: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    ...SPACING.py2,
    ...SPACING.px4,
    borderRadius: RF(7),
    backgroundColor: COLORS.PRIMARY,
  },
});

export default EmergencyContacts;
