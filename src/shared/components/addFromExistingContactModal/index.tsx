import {ICONS} from '@assets';
import CustomButton from '@components/customButton';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {BlurView} from '@react-native-community/blur';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface AddFromExistingContactModalProps {
  open: boolean;
  selectedContactsList: any;
  setSelectedContactsList: any;
  onPressClose: any;
  onPressBtn: any;
  contacts?: any;
  alertContainerStyle?: ViewStyle;
  emergencyContacts? : any,
}

const AddFromExistingContactModal = ({
  open,
  selectedContactsList = [],
  setSelectedContactsList = () => {},
  onPressClose = () => {},
  onPressBtn = () => {},
  contacts = [],
  alertContainerStyle,
  emergencyContacts = [],
}: Partial<AddFromExistingContactModalProps>) => {
  const [loading, setLoading] = useState(false);
  const [selectedContacts, setSelectedContacts] =
    useState(selectedContactsList);
  return (
    <>
      <Modal animationType="fade" transparent={true} visible={open}>
        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={3}
          reducedTransparencyFallbackColor="white">
          <View style={styles.blurSubCon}>
            <View style={[styles.alertCon, alertContainerStyle]}>
              <View style={styles.crossIconCon}>
                <CustomIcon
                  path={ICONS.CROSS}
                  resizeMode="cover"
                  containerStyle={[
                    styles.crossIcon,
                    {alignSelf: 'flex-end', right: -RF(14)},
                  ]}
                  // onPress={onPressClose && onPressClose &&  // $&}
                  onPress={onPressClose && onPressClose }
                />
              </View>
              <CustomText
                center
                size={20}
                fontFamily={INTER.BOLD}
                color={COLORS.LIGHT_BLACK}
                style={{
                  alignSelf: 'center',
                  lineHeight: RF(25),
                  ...SPACING.mt1,
                  ...SPACING.mb7,
                }}>
                Add from existing contacts
              </CustomText>
              <FlatList
                showsVerticalScrollIndicator={false}
                scrollEnabled
                keyExtractor={(item: any) => item?.id}
                data={contacts}
                renderItem={({item, index}: any) => (
                  <RenderItem
                    item={item}
                    selectedContacts={selectedContacts}
                    setSelectedContacts={setSelectedContacts}
                    emergencyContacts = {emergencyContacts}
                  />
                )}
                contentContainerStyle={{
                  borderRadius: RF(10),
                  ...SPACING.p3,
                  backgroundColor: COLORS.WHITE,
                }}
              />
              <CustomButton
                title="Select"
                titleSize={18}
                titleFontFamily={INTER.BOLD}
                titleColor={COLORS.WHITE}
                isloading={loading}
                // Change the background color based on whether any contacts are selected
                bgColor={selectedContacts.length > 0 ? COLORS.PRIMARY : COLORS.LIGHT_GRAY_02}
                titleStyle={{lineHeight: RF(23)}}
                customStyle={{...SPACING.py1}}
                customContainerStyle={{
                  width: '60%',
                  alignSelf: 'center',
                  ...SPACING.mt6,
                }}
                onPress={() => {
                  // Only proceed if there is at least one selected contact
                  if (selectedContacts.length > 0) {
                    console.log("LENGTH: ",selectedContacts.length);
                    if((contacts?.find((itm: { number: any; })=>{itm.number===selectedContacts.number}))){
                      console.log("DUPLICATE");
                      // console.log("number: ",itm.number);
                      Alert.alert('Error', 'Number already in Emergency Contacts.');
                      return false;
                    }                    
                    setLoading(true);
                    setSelectedContactsList(selectedContacts);
                    setTimeout(() => {
                      setLoading(false);
                      onPressBtn();
                    }, 1000);
                  }
                }}
              />              
            </View>
          </View>
        </BlurView>
      </Modal>
    </>
  );
};

const RenderItem = ({
  item,
  selectedContacts = [],
  setSelectedContacts = () => {},
  emergencyContacts=[],
}: any) => {
  const [check, setCheck] = useState(
    selectedContacts?.some((obj: any) => obj?.['id'] === item?.id) || false,
  );
  return (
    <Pressable
      style={[styles.row, {width: '100%', ...SPACING.pb3}]}
      onPress={() => {
        if (selectedContacts?.length <= 3) {
          if (check) {
            setSelectedContacts((pre: any) => {
              return pre?.filter((itm: any) => itm?.id != item?.id);
            });
          } else {
            setSelectedContacts((pre: any) => {
              return [...pre, item];
            });
          }
        } else if (check == true) {
          setSelectedContacts((pre: any) => {
            return pre?.filter((itm: any) => itm?.id != item?.id);
          });
        }
        if (selectedContacts?.length <= 3) setCheck(!check);
      }}>
      <View style={[styles.row, {justifyContent: 'flex-start', width: '60%'}]}>
        <View style={styles.nameCon}>
          <CustomText
            size={12}
            fontFamily={INTER.BOLD}
            color={COLORS.DARK_GRAY_03}
            style={{lineHeight: RF(19)}}
            numberOfLines={1}>
            {item?.name?.[0]?.toUpperCase()}
          </CustomText>
        </View>
        <CustomText
          size={12}
          fontFamily={INTER.BOLD}
          color={COLORS.LIGHT_BLACK_3}
          style={{lineHeight: RF(19)}}
          numberOfLines={1}>
          {item?.name}
        </CustomText>
      </View>
      <Pressable style={[styles.iconCon]}>
        {check && (
          <CustomIcon
            path={ICONS.CHECKED}
            resizeMode="cover"
            tintColor={COLORS.PRIMARY}
            containerStyle={styles.checkedIcon}
            onPress={() => {
              // setCheck(!check)
              if (selectedContacts?.length <= 3) {
                if (check) {
                  setSelectedContacts((pre: any) => {
                    return pre?.filter((itm: any) => itm?.id != item?.id);
                  });
                } else {
                  setSelectedContacts((pre: any) => {
                    return [...pre, item];
                  });
                }
              } else if (check == true) {
                setSelectedContacts((pre: any) => {
                  return pre?.filter((itm: any) => itm?.id != item?.id);
                });
              }
              if (selectedContacts?.length <= 3) setCheck(!check);
            }}
          />
        )}
      </Pressable>
    </Pressable>
  );
};

// const RenderItem = ({ item, selectedContacts = [], setSelectedContacts = () => {} }: any) => {
//   // Derive selection state from selectedContacts prop
//   const isSelected = selectedContacts.some((obj: any) => obj?.id === item?.id);

//   const toggleSelection = () => {
//     if (isSelected) {
//       // Remove the item from selectedContacts
//       setSelectedContacts((prev: any) =>
//         prev.filter((itm: any) => itm?.id !== item?.id)
//       );
//     } else {
//       // Allow selection only if less than 3 items are selected
//       if (selectedContacts.length < 3) {
//         setSelectedContacts((prev: any) => [...prev, item]);
//       }
//     }
//   };

//   return (
//     <Pressable
//       style={[styles.row, { width: '100%', ...SPACING.pb3 }]}
//       onPress={toggleSelection}>
//       <View style={[styles.row, { justifyContent: 'flex-start', width: '60%' }]}>
//         <View style={styles.nameCon}>
//           <CustomText
//             size={12}
//             fontFamily={INTER.BOLD}
//             color={COLORS.DARK_GRAY_03}
//             style={{ lineHeight: RF(19) }}
//             numberOfLines={1}>
//             {item?.name?.[0]?.toUpperCase()}
//           </CustomText>
//         </View>
//         <CustomText
//           size={12}
//           fontFamily={INTER.BOLD}
//           color={COLORS.LIGHT_BLACK_3}
//           style={{ lineHeight: RF(19) }}
//           numberOfLines={1}>
//           {item?.name}
//         </CustomText>
//       </View>
//       <Pressable style={[styles.iconCon]} onPress={toggleSelection}>
//         {isSelected && (
//           <CustomIcon
//             path={ICONS.CHECKED}
//             resizeMode="cover"
//             tintColor={COLORS.PRIMARY}
//             containerStyle={styles.checkedIcon}
//           />
//         )}
//       </Pressable>
//     </Pressable>
//   );
// };

const styles = StyleSheet.create({
  alertCon: {
    width: WP(80),
    alignItems: 'center',
    borderRadius: RF(6),
    ...SPACING.px7,
    ...SPACING.py5,
    backgroundColor: COLORS.LIGHT_GRAY_04,
    maxHeight: HP(50),
  },
  container: {
    flex: 1,
  },
  blurView: {
    height: HP(100),
    width: WP(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  blurSubCon: {
    flex: 1,
    width: WP(100),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossIcon: {
    height: RF(19),
    width: RF(19),
  },
  crossIconCon: {
    width: '100%',
    alignSelf: 'flex-end',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameCon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: RF(26),
    width: RF(26),
    borderRadius: RF(26 / 2),
    ...SPACING.mr2,
    backgroundColor: COLORS.LIGHT_GRAY_02,
  },
  iconCon: {
    overflow: 'hidden',
    width: RF(18),
    height: RF(18),
    borderRadius: RF(3),
    borderWidth: RF(2),
    borderColor: COLORS.PRIMARY,
  },
  checkedIcon: {
    top: RF(-1),
    left: RF(-1),
    width: RF(17),
    height: RF(17),
  },
});

export default AddFromExistingContactModal;
