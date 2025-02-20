import {ICONS} from '@assets';
import AppInput from '@components/appInput';
import CustomButton from '@components/customButton';
import CustomIcon from '@components/customIcon';
import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React, {useState} from 'react';
import {FlatList, StyleSheet, View, ViewStyle} from 'react-native';
import UserInput from './UserInput';
import {addPlanUsers} from '@services/UserService';
import {useDispatch, useSelector} from 'react-redux';
import {setFamilyPlanUsers} from '@redux/reducers/userReducer';
import {handleAddUsers} from '../helper';
import {getTotalAccountAdded} from '@utils/helper';
import {TOTAL_ACCOUNTS_LIMIT} from '@utils/constants';

interface AddUsersProps {
  users?: any;
  setUsers?: any;
  message?: any;
  setMessage?: any;
  setShowAddUsers?: any;
  containerStyle?: ViewStyle | any;
}

const AddUsers = (props: Partial<AddUsersProps>) => {
  const {
    users = [],
    setUsers = () => {},
    message = '',
    setMessage = () => {},
    setShowAddUsers = () => {},
    containerStyle,
  } = props;
  const {user} = useSelector((state: any) => state.root.user);
  const [addUsers, setAddUsers] = useState([{email: ''}]);
  const [loading, setLoading] = useState(false);
  const dispatch: any = useDispatch();
  return (
    <View style={[styles.conainer, containerStyle]}>
      <View>
        <CustomText
          size={20}
          fontFamily={INTER.BOLD}
          color={COLORS.LIGHT_GRAY}
          style={{lineHeight: RF(25)}}>
          Add users
        </CustomText>
        <FlatList
          data={addUsers}
          renderItem={({item, index}: any) => {
            return (
              <>
                {index == 0 && (
                  <CustomText
                    size={12}
                    fontFamily={INTER.LIGHT}
                    color={COLORS.DARK_GRAY}
                    style={{
                      lineHeight: RF(19),
                      ...SPACING.mt7,
                      ...SPACING.mb1,
                    }}>
                    Email Address
                  </CustomText>
                )}
                <UserInput
                  value={item?.email}
                  setValue={(val: any, id: any) => {
                    setAddUsers((pre: any) => {
                      const temp = pre;
                      temp[index] = {email: val};
                      return temp;
                    });
                  }}
                />
              </>
            );
          }}
        />
        <CustomIcon
          path={ICONS.ADD}
          resizeMode="cover"
          tintColor={
            addUsers?.length + getTotalAccountAdded(user) < TOTAL_ACCOUNTS_LIMIT
              ? COLORS.WHITE
              : COLORS.DARK_GRAY
          }
          customStyle={styles.addIcon}
          containerStyle={[
            styles.addIconCon,
            addUsers?.length + getTotalAccountAdded(user) >=
              TOTAL_ACCOUNTS_LIMIT && {
              backgroundColor: COLORS.LIGHT_GRAY_02,
            },
          ]}
          onPress={() =>
            addUsers?.length + getTotalAccountAdded(user) < TOTAL_ACCOUNTS_LIMIT
              ? addUser(addUsers, setAddUsers)
              : {}
          }
        />
      </View>
      <View style={{paddingTop: RF(60)}}>
        <CustomText
          size={12}
          fontFamily={INTER.LIGHT}
          color={COLORS.DARK_GRAY}
          style={{
            lineHeight: RF(19),
            ...SPACING.mb1,
          }}>
          Message
        </CustomText>
        <AppInput
          titleSize={12}
          titleColor={COLORS.LIGHT_BLACK}
          placeholder="Hello, I would like to add you to my SafetyNet Plan so you can enjoy the benefits with me."
          placeHolderColor={COLORS.BLACK}
          value={message}
          onChangeText={(val: any) => setMessage(val)}
          keyboardType="ascii-capable"
          scrollEnabled
          multiline
          inputStyle={{
            alignSelf: 'flex-start',
            lineHeight: RF(19),
            fontFamily: INTER.REGULAR,
            color: COLORS.BLACK,
            textDecorationLine: 'none',
            height: RF(95),
          }}
          containerStyle={{
            ...SPACING.p5,
            backgroundColor: COLORS.LIGHT_GRAY_04,
          }}
        />
        <CustomButton
          title="Add users"
          titleSize={18}
          titleFontFamily={INTER.BOLD}
          titleColor={COLORS.LIGHT_GARY_03}
          isloading={loading}
          titleStyle={{lineHeight: RF(23)}}
          customStyle={{...SPACING.py4}}
          onPress={async () => {
            await handleAddUsers(
              setLoading,
              setUsers,
              addUsers,
              users,
              message,
              user,
              dispatch,
              setShowAddUsers,
            );
          }}
        />
      </View>
    </View>
  );
};

const addUser = (users: any, setUsers: any) => {
  if (users?.length < 4) {
    setUsers((pre: any) => {
      return [...pre, {email: '', id: pre?.length}];
    });
  }
};

const styles = StyleSheet.create({
  conainer: {
    justifyContent: 'space-between',
  },
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
    backgroundColor: COLORS.PRIMARY,
  },
});

export default AddUsers;
