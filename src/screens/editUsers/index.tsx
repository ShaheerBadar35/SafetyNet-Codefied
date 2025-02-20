import EditUsersHeader from '@components/editUsersHeader';
import Wrapper from '@components/wrapper';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS} from '@theme/colors';
import {HP, RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import AddUsers from './components/AddUsers';
import CurrentUsers from './components/CurrentUsers';
import CustomFooter from '@components/customFooter';

const EditUsers = () => {
  const {user} = useSelector((state: any) => state.root.user);
  const insets: any = useSafeAreaInsets();
  const tabBarHeight: any = useBottomTabBarHeight();
  const [showAddUsers, setShowAddUsers] = useState(false);
  const [users, setUsers] = useState<any>(user?.family_plan_users || []);
  const [message, setMessage] = useState(
    'Hello, I would like to add you to my SafetyNet Plan so you can enjoy the benefits with me.',
  );
  return (
    <Wrapper barStyle="dark-content" noPaddingTop noPaddingBottom>
      <EditUsersHeader />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={[
          styles.container,
          {paddingBottom: tabBarHeight + insets?.bottom + RF(12)},
        ]}>
        {!showAddUsers && (
          <CurrentUsers
            user={user}
            users={users}
            setUsers={setUsers}
            setShowAddUsers={setShowAddUsers}
          />
        )}
        {showAddUsers == true && (
          <AddUsers
            users={users}
            setUsers={setUsers}
            message={message}
            setMessage={setMessage}
            setShowAddUsers={setShowAddUsers}
            containerStyle={{
              flex: 1,
              width: '100%',
              minHeight: HP(100) - HP(30) - tabBarHeight - RF(24),
              paddingBottom: tabBarHeight + insets?.bottom + RF(12),
            }}
          />
        )}
        {showAddUsers == true && (
          <CustomFooter
            fontColor={COLORS.LIGHT_GRAY}
            containerStyle={{
              bottom: tabBarHeight + RF(24),
              ...SPACING.mt5,
            }}
          />
        )}
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WP(8),
    top: -RF(12),
    borderTopLeftRadius: RF(7),
    borderTopRightRadius: RF(7),
    ...SPACING.pt6,
    backgroundColor: COLORS.LIGHT_BLACK,
  },
});

export default EditUsers;
