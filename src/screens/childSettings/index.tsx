import ChildSettingsHeader from '@components/childSettingsHeader';
import {useSafeArea} from '@components/safeAreaInsets';
import Wrapper from '@components/wrapper';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS} from '@theme/colors';
import {HP, RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React, {useState} from 'react';
import {FlatList, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Footer from './components/Footer';
import Header from './components/Header';
import RenderItem from './components/RenderItem';
import {handleChildSettings} from './helper';
import {getTotalAccountAdded} from '@utils/helper';
import {TOTAL_ACCOUNTS_LIMIT} from '@utils/constants';
import CustomFooter from '@components/customFooter';

const ChildSettings = () => {
  const {user} = useSelector((state: any) => state.root.user);
  const [selected, setSelected] = useState(
    user?.handle_child_settings || false,
  );
  const insets: any = useSafeArea();
  const tabBarHeight = useBottomTabBarHeight();
  const dispatch: any = useDispatch();

  return (
    <Wrapper barStyle="dark-content" noPaddingTop noPaddingBottom>
      <ChildSettingsHeader
        selected={selected}
        setSelected={setSelected}
        onPressSelected={() =>
          handleChildSettings(user?.email, !selected, dispatch)
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          {paddingBottom: insets?.bottom + tabBarHeight + RF(12)},
        ]}>
        <FlatList
          keyExtractor={(item: any) => item?.id}
          data={user?.child_settings?.child_account || []}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}: any) => (
            <RenderItem
              item={item}
              index={index}
              disabled={!selected}
              containerStyle={{...SPACING.mb5}}
            />
          )}
          ListHeaderComponent={
            <Header
              childList={user?.child_settings?.child_account || []}
              disabled={!selected}
            />
          }
          ListFooterComponent={
            user?.child_settings?.child_account &&
            user?.child_settings?.child_account?.length > 0 && (
              <Footer
                childList={user?.child_settings?.child_account || []}
                disabled={
                  selected == false
                    ? true
                    : getTotalAccountAdded(user) >= TOTAL_ACCOUNTS_LIMIT
                }
              />
            )
          }
          contentContainerStyle={[
            typeof user?.child_settings?.child_account != 'undefined' &&
              user?.child_settings?.child_account?.length > 0 &&
              styles.flatlistCon,
            !selected && {opacity: 0.4},
          ]}
        />
        <CustomFooter
          fontColor={COLORS.LIGHT_GRAY_05}
          containerStyle={{bottom: -RF(12)}}
        />
      </ScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: HP(70),
    paddingHorizontal: WP(8),
    marginTop: -RF(10),
    borderTopLeftRadius: RF(7),
    borderTopRightRadius: RF(7),
    ...SPACING.pt8,
    backgroundColor: COLORS.DARK_GRAY_04,
  },
  flatlistCon: {
    ...SPACING.p3,
    borderRadius: RF(7),
    backgroundColor: COLORS.LIGHT_BLACK_4,
  },
});

export default ChildSettings;
