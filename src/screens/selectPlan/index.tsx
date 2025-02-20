import CustomButton from '@components/customButton';
import PlanCard from '@components/planCard';
import {useSafeArea} from '@components/safeAreaInsets';
import SelectPlanHeader from '@components/selectPlanHeader';
import Wrapper from '@components/wrapper';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {COLORS} from '@theme/colors';
import {INTER} from '@theme/fonts';
import {RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {handleSubmit} from './helper';
import SuccessModal from '@components/successModal';
import {ICONS} from '@assets';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<{
    params:
      | {
          email?: any;
        }
      | undefined;
  }>;
}

const SelectPlan = ({route, navigation}: Props) => {
  const {email} = route?.params || {};
  const insets: any = useSafeArea();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  return (
    <Wrapper barStyle="dark-content" noPaddingTop noPaddingBottom>
      <SelectPlanHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          {paddingBottom: insets?.bottom + RF(24)},
        ]}>
        <PlanCard
          title="Single Plan"
          desc="Single user plan for only"
          price="9.99"
          isSelected={selectedPlan == 1}
          onPress={() => setSelectedPlan(1)}
        />
        <PlanCard
          title="Family Plan"
          desc="Four user plan for only"
          price="15.99"
          isSelected={selectedPlan == 2}
          containerStyle={{...SPACING.mt4}}
          onPress={() => setSelectedPlan(2)}
        />
        <CustomButton
          title="Select plan"
          titleSize={18}
          titleFontFamily={INTER.BOLD}
          titleColor={
            selectedPlan == 0 ? COLORS.DARK_GRAY : COLORS.LIGHT_GARY_03
          }
          disabled={selectedPlan == 0}
          isloading={loading}
          bgColor={selectedPlan == 0 ? COLORS.LIGHT_GRAY_02 : COLORS.PRIMARY}
          titleStyle={{lineHeight: RF(23)}}
          customStyle={{...SPACING.py4}}
          customContainerStyle={{...SPACING.mt11}}
          onPress={() =>
            handleSubmit(
              {email: email, planId: selectedPlan},
              setLoading,
              setShowSuccessModal,
            )
          }
        />
        <SuccessModal
          title={'Plan purchased successfully'}
          icon={ICONS.PLAN_SUCCESS}
          open={showSuccessModal}
          onPressClose={() => setShowSuccessModal(false)}
        />
      </ScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WP(8),
    ...SPACING.pt6,
  },
});

export default SelectPlan;
