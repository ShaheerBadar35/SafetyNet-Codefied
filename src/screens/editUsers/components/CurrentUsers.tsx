import {ICONS} from '@assets';
import ConfirmRemovalModal from '@components/confirmRemovalModal';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {HP, RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {
  ADD_ACCOUNT_LIMIT_REACHED_MESSAGE,
  TOAST_TYPES,
  TOTAL_ACCOUNTS_LIMIT,
} from '@utils/constants';
import {getTotalAccountAdded} from '@utils/helper';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, ViewStyle} from 'react-native';
import {useDispatch} from 'react-redux';
import {handleDeleteUser} from '../helper';
import SuccessModal from '@components/successModal';
import Toast from 'react-native-toast-message';
import CustomFooter from '@components/customFooter';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

interface CurrentUsersProps {
  user: any;
  users?: any;
  setUsers?: any;
  setShowAddUsers?: any;
  containerStyle?: ViewStyle | any;
}

const CurrentUsers = (props: Partial<CurrentUsersProps>) => {
  const {
    user = {},
    users = [],
    setUsers = () => {},
    setShowAddUsers = () => {},
    containerStyle,
  } = props;
  const [showRemovedModal, setShowRemovedModal] = useState(false);
  const tabBarHeight: any = useBottomTabBarHeight();

  useEffect(() => {
    if (showRemovedModal) {
      setTimeout(() => {
        setShowRemovedModal(false);
      }, 3000);
    }
  }, [showRemovedModal]);

  return (
    <View style={{minHeight: HP(70)}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item?.key}
        data={users}
        renderItem={({item, index}: any) => (
          <RenderItem
            item={item}
            index={index}
            user={user}
            setUsers={setUsers}
            setShowRemovedModal={setShowRemovedModal}
          />
        )}
        ListHeaderComponent={<Header />}
        ListFooterComponent={
          <Footer user={user} users={users} setShowAddUsers={setShowAddUsers} />
        }
        contentContainerStyle={[styles.container, containerStyle]}
      />
      <CustomFooter
        fontColor={COLORS.LIGHT_GRAY}
        containerStyle={{
          bottom: tabBarHeight + RF(24),
          ...SPACING.mt5,
        }}
      />
      <SuccessModal
        title={'User removed'}
        icon={ICONS.REMOVED}
        open={showRemovedModal}
      />
    </View>
  );
};

const Header = () => {
  return (
    <CustomText
      size={20}
      fontFamily={INTER.BOLD}
      color={COLORS.LIGHT_GRAY}
      style={{lineHeight: RF(25), ...SPACING.mb10}}>
      Current users
    </CustomText>
  );
};

const Footer = ({user = {}, users = [], setShowAddUsers = () => {}}: any) => {
  return (
    <CustomIcon
      path={ICONS.ADD}
      tintColor={users?.length < 4 ? COLORS.WHITE : COLORS.DARK_GRAY}
      resizeMode="cover"
      customStyle={styles.addIcon}
      containerStyle={[
        styles.addIconCon,
        getTotalAccountAdded(user) >= TOTAL_ACCOUNTS_LIMIT && {
          backgroundColor: COLORS.LIGHT_GRAY_02,
        },
      ]}
      onPress={() =>
        getTotalAccountAdded(user) < TOTAL_ACCOUNTS_LIMIT
          ? setShowAddUsers(true)
          : Toast.show({
              type: TOAST_TYPES.ERROR,
              props: {
                title: ADD_ACCOUNT_LIMIT_REACHED_MESSAGE,
              },
            })
      }
    />
  );
};

const RenderItem = ({
  item,
  index,
  user,
  setUsers,
  setShowRemovedModal = () => {},
}: any) => {
  const [showRemovalModal, setShowRemovalModal] = useState(false);
  const [isShowRemovalModalBtnLoading, setIsShowRemovalBtnLoading] =
    useState(false);
  const dispatch: any = useDispatch();

  return (
    <>
      <View
        style={[
          styles.row,
          {
            ...SPACING.mx4,
            ...SPACING.mb5,
            ...SPACING.pb3,
            borderBottomWidth: RF(1),
            borderBottomColor: COLORS.WHITE,
          },
        ]}>
        <CustomText
          size={10}
          fontFamily={INTER.REGULAR}
          color={COLORS.LIGHT_GRAY_04}
          style={{lineHeight: RF(16), ...SPACING.mx2}}
          numberOfLines={1}>
          {item?.email}
        </CustomText>
        <CustomIcon
          path={ICONS.DELETE}
          tintColor={COLORS.LIGHT_GRAY_04}
          resizeMode="cover"
          containerStyle={[styles.deleteIcon, {...SPACING.mr3}]}
          onPress={() => setShowRemovalModal(true)}
        />
      </View>
      <ConfirmRemovalModal
        open={showRemovalModal}
        desc={'Are you sure you want to remove this user from your plan?'}
        btnLoading={isShowRemovalModalBtnLoading}
        onPressClose={() => setShowRemovalModal(false)}
        onPressBtn={() =>
          handleDeleteUser(
            user?.email,
            item?.email,
            setIsShowRemovalBtnLoading,
            setUsers,
            setShowRemovalModal,
            setShowRemovedModal,
            dispatch,
          )
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  addIcon: {
    height: RF(13),
    width: RF(13),
  },
  addIconCon: {
    right: 0,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    height: RF(25),
    width: RF(43),
    borderRadius: RF(7),
    ...SPACING.mt3,
    ...SPACING.mr2,
    backgroundColor: COLORS.PRIMARY,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteIcon: {
    height: RF(16),
    width: RF(16),
  },
});

export default CurrentUsers;
