import ChildSettingsHeader from '@components/childSettingsHeader';
import CustomText from '@components/customText';
import {useSafeArea} from '@components/safeAreaInsets';
import Wrapper from '@components/wrapper';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {
  ADD_CHILD_ACCOUNTS_MESSAGE,
  TOTAL_ACCOUNTS_LIMIT,
} from '@utils/constants';
import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import AddUser from './components/AddUser';
import Footer from './components/Footer';
import {handleAdd, handleAddChildSettings, onPressBtn} from './helper';
import {getTotalAccountAdded} from '@utils/helper';
import CustomFooter from '@components/customFooter';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<{
    params: {} | undefined;
  }>;
}

const AddChild = ({route, navigation}: Props) => {
  const {} = route?.params || {};
  const {user} = useSelector((state: any) => state.root.user);
  const {child} = useSelector((state: any) => state.root.child);
  const [list, setList] = useState(
    // user?.child_settings?.child_account?.length > 0
    //   ? user?.child_settings?.child_account
    //   :
    [
      {
        id: user?.child_settings?.child_account?.length || 0,
        name: '',
        username: '',
      },
    ],
  );
  const [selected, setSelected] = useState(
    user?.handle_add_child_settings || false,
  );
  const [btnLoading, setBtnLoading] = useState(false);
  const insets: any = useSafeArea();
  const tabBarHeight = useBottomTabBarHeight();
  const dispatch: any = useDispatch();

  const updateList = (updatedItem: any, index: number) => {
    setList((prevList: any) => {
      const newList = [...prevList];
      newList[index] = updatedItem;
      return newList;
    });
  };

  return (
    <Wrapper barStyle="dark-content" noPaddingTop noPaddingBottom>
      <ChildSettingsHeader
        selected={selected}
        setSelected={setSelected}
        showDescription={false}
        onPressSelected={() =>
          handleAddChildSettings(user?.email, !selected, dispatch)
        }
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          {paddingBottom: insets?.bottom + tabBarHeight + RF(12)},
        ]}>
        <FlatList
          keyExtractor={(item: any) => item?.id}
          data={list}
          renderItem={({item, index}: any) => {
            return (
              <AddUser
                value={item}
                setValue={(updatedItem: any) => updateList(updatedItem, index)}
                // editable={
                //   index < user?.child_settings?.child_account?.length
                //     ? false
                //     : true
                // }
                isToggleDisabled={!selected}
                containerStyle={[index < list?.length - 1 && {...SPACING.mb5}]}
              />
            );
          }}
          ListHeaderComponent={
            <CustomText
              size={20}
              fontFamily={INTER.BOLD}
              color={COLORS.LIGHT_GRAY}
              style={{lineHeight: RF(26), ...SPACING.mb7}}>
              Add users
            </CustomText>
          }
          ListFooterComponent={
            <Footer
              isToggleDisabled={!selected}
              isBtnDisabled={
                getTotalAccountAdded(user) + list?.length >=
                  TOTAL_ACCOUNTS_LIMIT
              }
              isBtnLoading={btnLoading}
              onPressAdd={() =>
                handleAdd(
                  user?.child_settings?.child_account || [],
                  list,
                  setList,
                )
              }
              onPressBtn={() =>
                onPressBtn(
                  user?.email,
                  ADD_CHILD_ACCOUNTS_MESSAGE,
                  [...(user?.child_settings?.child_account || []), ...list],
                  setBtnLoading,
                  dispatch,
                )
              }
            />
          }
          contentContainerStyle={!selected && {opacity: 0.4}}
        />
        <CustomFooter
          fontColor={COLORS.LIGHT_GRAY}
          containerStyle={{
            ...SPACING.mt5,
          }}
        />
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WP(8),
    marginTop: -RF(10),
    borderTopLeftRadius: RF(7),
    borderTopRightRadius: RF(7),
    ...SPACING.pt8,
    backgroundColor: COLORS.DARK_GRAY_04,
  },
});

export default AddChild;
