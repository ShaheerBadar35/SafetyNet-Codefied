// import CustomText from '@components/customText';
// import FeatureUnavailableModal from '@components/featureUnavailableModal';
// import {useSafeArea} from '@components/safeAreaInsets';
// import {BlurView} from '@react-native-community/blur';
// import {navigate} from '@services/NavService';
// import {COLORS} from '@theme/colors';
// import {INTER} from '@theme/fonts';
// import {GST} from '@theme/globalStyles';
// import {HP, RF, WP} from '@theme/responsive';
// import {SPACING} from '@theme/spacing';
// import {PLANS} from '@utils/constants';
// import {isChildACcount} from '@utils/helper';
// import {ROUTES} from '@utils/routes';
// import React, {useState} from 'react';
// import {Modal, Pressable, StyleSheet, View, ViewStyle} from 'react-native';
// import {useSelector} from 'react-redux';
// interface ThreeDotModalProps {
//   open: boolean;
//   onPressCancel: any;
//   alertContainerStyle?: ViewStyle;
// }
// const SettingsModal = ({
//   open,
//   onPressCancel = () => {},
//   alertContainerStyle,
// }: Partial<ThreeDotModalProps>) => {
//   const insets: any = useSafeArea();
//   const {user} = useSelector((state: any) => state.root.user);
//   const [disabled, setDisabled] = useState(
//     isChildACcount(user) || user?.plan?.plan_id == PLANS.SINGLE ? true : false,
//   );
//   const [showFeatureUnavailableModal, setShowFeatureUnavailableModal] =
//     useState(false);
//   return (
//     <>
//       <Modal animationType="fade" transparent={true} visible={open}>
//         <BlurView
//           style={styles.blurView}
//           blurType="light"
//           blurAmount={3}
//           reducedTransparencyFallbackColor="white">
//           <Pressable
//             style={[
//               styles.blurSubCon,
//               {paddingBottom: insets?.bottom + RF(100) + RF(12)},
//             ]}
//             onPress={onPressCancel}>
//             <View
//               style={[styles.alertCon, alertContainerStyle, {...SPACING.mb3}]}>
//               <Pressable
//                 style={[
//                   styles.alertCon,
//                   alertContainerStyle,
//                   {
//                     borderBottomWidth: RF(1),
//                     borderBottomColor: COLORS.LIGHT_BLACK,
//                   },
//                 ]}
//                 onPress={() => {
//                   onPressCancel();
//                   if (disabled) setShowFeatureUnavailableModal(true);
//                   !disabled && navigate(ROUTES.EDIT_USERS);
//                 }}>
//                 <CustomText
//                   size={16}
//                   fontFamily={INTER.REGULAR}
//                   color={COLORS.LIGHT_BLACK}
//                   style={{lineHeight: RF(26), ...SPACING.py3}}>
//                   User Settings
//                 </CustomText>
//               </Pressable>
//               <Pressable
//                 style={[
//                   styles.alertCon,
//                   alertContainerStyle,
//                   {
//                     borderBottomWidth: RF(1),
//                     borderBottomColor: COLORS.LIGHT_BLACK,
//                   },
//                 ]}
//                 onPress={() => {
//                   onPressCancel();
//                   if (disabled) setShowFeatureUnavailableModal(true);
//                   !disabled && navigate(ROUTES.CHILD_SETTINGS);
//                 }}>
//                 <CustomText
//                   size={16}
//                   fontFamily={INTER.REGULAR}
//                   color={COLORS.LIGHT_BLACK}
//                   style={{lineHeight: RF(25), ...SPACING.py3}}>
//                   Child Settings
//                 </CustomText>
//               </Pressable>
//               <Pressable
//                 style={[styles.alertCon, alertContainerStyle]}
//                 onPress={() => {
//                   onPressCancel();
//                   if (isChildACcount(user))
//                     setShowFeatureUnavailableModal(true);
//                   else navigate(ROUTES.INTEGRATION_SETTINGS);
//                 }}>
//                 <CustomText
//                   size={16}
//                   fontFamily={INTER.REGULAR}
//                   color={COLORS.LIGHT_BLACK}
//                   style={{lineHeight: RF(26), ...SPACING.py3}}>
//                   Integration Settings
//                 </CustomText>
//               </Pressable>
//             </View>
//           </Pressable>
//         </BlurView>
//       </Modal>
//       <FeatureUnavailableModal
//         open={showFeatureUnavailableModal}
//         isChild={user?.is_child_account || false}
//         onPressClose={() => setShowFeatureUnavailableModal(false)}
//         onPressBtn={() => {
//           setShowFeatureUnavailableModal(false);
//           setTimeout(() => {
//             navigate(ROUTES.Plan_STACK);
//           }, 1000);
//         }}
//       />
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   alertCon: {
//     width: WP(85),
//     alignItems: 'center',
//     borderRadius: RF(6),
//     ...SPACING.px6,
//     backgroundColor: COLORS.WHITE,
//   },
//   container: {
//     flex: 1,
//   },
//   blurView: {
//     height: HP(100),
//     width: WP(100),
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   blurSubCon: {
//     flex: 1,
//     width: WP(100),
//     backgroundColor: 'transparent',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   modal: {
//     ...GST.pt5,
//     width: '100%',
//     backgroundColor: 'red',
//     borderRadius: RF(10),
//   },
//   img: {
//     height: RF(100),
//     width: RF(100),
//     ...SPACING.mt10,
//   },
// });

// export default SettingsModal;


import CustomText from '@components/customText';
import FeatureUnavailableModal from '@components/featureUnavailableModal';
import {useSafeArea} from '@components/safeAreaInsets';
import {navigate} from '@services/NavService';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {PLANS} from '@utils/constants';
import {isChildACcount} from '@utils/helper';
import {ROUTES} from '@utils/routes';
import React, {useState} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {useSelector} from 'react-redux';

const SettingsScreen = () => {
  const insets: any = useSafeArea();
  const {user} = useSelector((state: any) => state.root.user);
  const [disabled, setDisabled] = useState(
    isChildACcount(user) || user?.plan?.plan_id == PLANS.SINGLE ? true : false,
  );
  const [showFeatureUnavailableModal, setShowFeatureUnavailableModal] =
    useState(false);

  return (
    <View style={styles.container}>
      {/* Green App Bar */}
      <View style={[styles.appBar, {marginTop: insets.top + RF(10)}]}>
        <CustomText
          size={20}
          fontFamily={INTER.BOLD}
          color={COLORS.WHITE}
          style={styles.appBarText}>
          Settings
        </CustomText>
      </View>

      {/* Settings Options */}
      <View style={[styles.optionsContainer, {marginTop: RF(30)}]}>
        <Pressable
          style={({pressed}) => [
            styles.optionButton,
            {opacity: pressed ? 0.8 : 1},
          ]}
          onPress={() => {
            if (disabled) setShowFeatureUnavailableModal(true);
            !disabled && navigate(ROUTES.EDIT_USERS);
          }}>
          <CustomText
            size={16}
            fontFamily={INTER.MEDIUM}
            color={COLORS.WHITE}
            style={styles.optionText}>
            User Settings
          </CustomText>
        </Pressable>

        <View style={styles.divider} />

        <Pressable
          style={({pressed}) => [
            styles.optionButton,
            {opacity: pressed ? 0.8 : 1},
          ]}
          onPress={() => {
            if (disabled) setShowFeatureUnavailableModal(true);
            !disabled && navigate(ROUTES.CHILD_SETTINGS);
          }}>
          <CustomText
            size={16}
            fontFamily={INTER.MEDIUM}
            color={COLORS.WHITE}
            style={styles.optionText}>
            Child Settings
          </CustomText>
        </Pressable>

        <View style={styles.divider} />

        <Pressable
          style={({pressed}) => [
            styles.optionButton,
            {opacity: pressed ? 0.8 : 1},
          ]}
          onPress={() => {
            if (isChildACcount(user)) setShowFeatureUnavailableModal(true);
            else navigate(ROUTES.INTEGRATION_SETTINGS);
          }}>
          <CustomText
            size={16}
            fontFamily={INTER.MEDIUM}
            color={COLORS.WHITE}
            style={styles.optionText}>
            Integration Settings
          </CustomText>
        </Pressable>
      </View>

      <FeatureUnavailableModal
        open={showFeatureUnavailableModal}
        isChild={user?.is_child_account || false}
        onPressClose={() => setShowFeatureUnavailableModal(false)}
        onPressBtn={() => {
          setShowFeatureUnavailableModal(false);
          setTimeout(() => {
            navigate(ROUTES.Plan_STACK);
          }, 1000);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },
  appBar: {
    backgroundColor: COLORS.LIGHT_GRAY, // Green color
    paddingVertical: RF(16),
    paddingHorizontal: WP(5),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  appBarText: {
    fontSize: RF(25),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  optionsContainer: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: COLORS.PRIMARY, // Green color
    borderRadius: RF(10),
    marginTop: RF(30),
    elevation: 3,
    shadowColor: COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: RF(1),
    borderColor: COLORS.BLACK, // Black border
  },
  optionButton: {
    paddingVertical: RF(16),
    paddingHorizontal: RF(20),
  },
  optionText: {
    lineHeight: RF(22),
    textAlign: 'center',
  },
  divider: {
    height: RF(1),
    backgroundColor: COLORS.BLACK, // Black divider
    marginHorizontal: RF(10),
  },
});

export default SettingsScreen;