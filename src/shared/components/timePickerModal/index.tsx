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
import {Modal, StyleSheet, View, ViewStyle} from 'react-native';
import WheelPicker from 'react-native-wheely';

const hoursList: any = Array.from({length: 12}, (_, i) =>
  String(i).padStart(2, '0'),
);
const minutesAndSecondsList: any = Array.from({length: 60}, (_, i) =>
  String(i).padStart(2, '0'),
);
const periodsList: any = ['AM', 'PM'];

interface SuccessModalProps {
  open: boolean;
  title: any;
  icon: any;
  showCloseIcon: any;
  onPressClose: any;
  hoursData: any;
  minutesData: any;
  periodsData: any;
  setHoursData: any;
  setMinutesData: any;
  setPeriodsData: any;
  onPressBtn?: any;
  alertContainerStyle?: ViewStyle;
}

const TimePickerModal = ({
  open,
  title = '',
  icon = '',
  showCloseIcon = true,
  onPressClose = () => {},
  hoursData = 0,
  minutesData = 0,
  periodsData = 0,
  setHoursData = () => {},
  setMinutesData = () => {},
  setPeriodsData = () => {},
  onPressBtn = () => {},
  alertContainerStyle,
}: Partial<SuccessModalProps>) => {
  const [hours, setHours] = useState(
    (hoursData && hoursList?.indexOf(hoursData)) || 0,
  );
  const [minutes, setMinutes] = useState(
    (minutesData && minutesAndSecondsList?.indexOf(minutesData)) || 0,
  );
  const [period, setPeriod] = useState(
    (periodsData && periodsList?.indexOf(periodsData)) || 0,
  );

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
              <CustomIcon
                path={ICONS.CROSS}
                resizeMode="cover"
                containerStyle={styles.iconCon}
                onPress={onPressClose && onPressClose}
              />
              <CustomText
                size={20}
                fontFamily={INTER.BOLD}
                color={COLORS.LIGHT_BLACK}
                center
                numberOfLines={2}
                style={{lineHeight: RF(26), maxWidth: '70%', ...SPACING.mb3}}>
                Select Geofencing Start Time
              </CustomText>
              <View style={styles.row}>
                <WheelPicker
                  selectedIndex={hours}
                  options={hoursList}
                  onChange={index => setHours(index)}
                  selectedIndicatorStyle={{backgroundColor: COLORS.PRIMARY}}
                  containerStyle={styles.wheely}
                />
                <CustomText
                  size={20}
                  fontFamily={INTER.BOLD}
                  color={COLORS.LIGHT_BLACK}
                  style={{lineHeight: RF(32), ...SPACING.mx2}}>
                  :
                </CustomText>
                <WheelPicker
                  selectedIndex={minutes}
                  options={minutesAndSecondsList}
                  onChange={index => setMinutes(index)}
                  selectedIndicatorStyle={{backgroundColor: COLORS.PRIMARY}}
                  containerStyle={styles.wheely}
                />
                <CustomText
                  size={20}
                  fontFamily={INTER.BOLD}
                  color={COLORS.LIGHT_BLACK}
                  style={{lineHeight: RF(32), ...SPACING.mx2}}>
                  :
                </CustomText>
                <WheelPicker
                  selectedIndex={period}
                  options={periodsList}
                  onChange={index => setPeriod(index)}
                  selectedIndicatorStyle={{backgroundColor: COLORS.PRIMARY}}
                  containerStyle={styles.wheely}
                />
              </View>
              <CustomButton
                title="Save"
                titleSize={18}
                titleFontFamily={INTER.BOLD}
                titleColor={COLORS.LIGHT_GARY_03}
                titleStyle={{lineHeight: RF(22)}}
                customStyle={{...SPACING.py1}}
                customContainerStyle={{width: '60%', ...SPACING.mt3}}
                onPress={() => {
                  setHoursData && setHoursData(hoursList?.[hours]);
                  setMinutesData &&
                    setMinutesData(minutesAndSecondsList?.[minutes]);
                  setPeriodsData && setPeriodsData(periodsList?.[period]);
                  setTimeout(() => {
                    onPressBtn && onPressBtn();
                  }, 500);
                }}
              />
            </View>
          </View>
        </BlurView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  alertCon: {
    width: WP(80),
    alignItems: 'center',
    borderRadius: RF(10),
    ...SPACING.p3,
    backgroundColor: COLORS.LIGHT_GRAY_04,
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
  iconCon: {
    height: RF(19),
    width: RF(19),
    alignSelf: 'flex-end',
    ...SPACING.mb3,
  },
  successIcon: {
    height: RF(90),
    width: RF(90),
  },
  successIconCon: {
    height: RF(90),
    width: RF(90),
    ...SPACING.mb6,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: WP(4),
    backgroundColor: 'white',
  },
  wheely: {
    // height: HP(40),
    alignItems: 'center',
    width: WP(18),
  },
});

export default TimePickerModal;
