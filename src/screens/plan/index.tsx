import ChangePlanHeader from '@components/changePlanHeader';
import CustomButton from '@components/customButton';
import CustomFooter from '@components/customFooter';
import DowngradePlanModal from '@components/downgradePlanModal';
import PaymentIssueModal from '@components/paymentIssueModal';
import PaymentUnsuccessfulModal from '@components/paymentUnsuccessfulModal';
import PlanCancellationModal from '@components/planCancellationModal';
import PlanCard from '@components/planCard';
import PlanResubscribeModal from '@components/planResubscribeModal';
import UpgradePlanModal from '@components/upgradePlanModal';
import { useSafeArea } from '@components/safeAreaInsets';
import Wrapper from '@components/wrapper';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS } from '@theme/colors';
import { INTER } from '@theme/fonts';
import { RF, WP } from '@theme/responsive';
import { SPACING } from '@theme/spacing';
import { PLANS, SKUS, TOAST_TYPES } from '@utils/constants';
import { isChildACcount } from '@utils/helper';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import SelectedRow from './components/SelectedRow';
import {
  handleOnPress,
  hitCancelSubscriptionAPI,
  isButtonDisabled,
  purchaseSubscription,
  setAvailableSubscriptions,
  showButtonTitle,
} from './helper';
import { getSubscriptions } from 'react-native-iap';
import * as RNIap from 'react-native-iap';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

const Plan = () => {
  const { user } = useSelector((state: any) => state.root.user);
  const insets: any = useSafeArea();
  const tabBarHeight: any = useBottomTabBarHeight();

  // Initialize currentPlan and selectedPlan from the user state.
  const initialPlan =
    isChildACcount(user)
      ? PLANS.FAMILY
      : user?.plan?.plan_id === PLANS.SINGLE
      ? PLANS.SINGLE
      : PLANS.FAMILY;
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(initialPlan);
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [subscriptions, setSubscriptions] = useState<any>([]);
  const [disabled, setDisabled] = useState(isChildACcount(user));
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDowngradeModal, setShowDowngradeModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPaymentUnsuccessfulModal, setShowPaymentUnsuccessfulModal] = useState(false);
  const [showPaymentIssueModal, setShowPaymentIssueModal] = useState(false);
  const [showPlanResubscribeModal, setShowPlanResubscribeModal] = useState(false);
  const [showPlanCancellationModal, setShowPlanCancellationModal] = useState(false);
  const [isCancelBtnLoading, setIsCancelBtnLoading] = useState(false);

  useEffect(() => {
    setAvailableSubscriptions(setSubscriptions);
  }, []);

  // When the global user state updates (after a successful plan change),
  // update local currentPlan and selectedPlan accordingly.
  useEffect(() => {
    if (user?.plan?.plan_id) {
      setCurrentPlan(user.plan.plan_id);
      setSelectedPlan(user.plan.plan_id);
    }
  }, [user?.plan?.plan_id]);

  return (
    <Wrapper barStyle="dark-content" noPaddingTop noPaddingBottom>
      <ChangePlanHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          { paddingBottom: tabBarHeight + insets?.bottom + RF(24) },
        ]}
      >
        <View style={{ ...SPACING.pt8 }}>
          <PlanCard
            title="Single Plan"
            desc="Single user plan for only"
            price="9.99"
            isSelected={selectedPlan === PLANS.SINGLE}
            disabled={disabled}
            onPress={() => !disabled && setSelectedPlan(PLANS.SINGLE)}
            containerStyle={disabled && { opacity: 0.4 }}
          />
          {currentPlan === PLANS.SINGLE && (
            <SelectedRow
              onPressCancel={() => setShowPlanCancellationModal(true)}
              containerStyle={{ ...SPACING.mt2 }}
            />
          )}
          <PlanCard
            title="Family Plan"
            desc="Four user plan for only"
            price="15.99"
            isSelected={selectedPlan === PLANS.FAMILY}
            disabled={disabled}
            containerStyle={[{ ...SPACING.mt4 }, disabled && { opacity: 0.4 }]}
            onPress={() => !disabled && setSelectedPlan(PLANS.FAMILY)}
          />
          {currentPlan === PLANS.FAMILY && (
            <SelectedRow
              onPressCancel={() => setShowPlanCancellationModal(true)}
              containerStyle={{ ...SPACING.mt2 }}
            />
          )}
        </View>
        {/* Render the button only if a different plan is selected */}
        {selectedPlan !== currentPlan && (
          <CustomButton
            title={showButtonTitle(currentPlan, selectedPlan)}
            titleSize={18}
            titleFontFamily={INTER.BOLD}
            titleColor={
              isButtonDisabled(currentPlan, selectedPlan)
                ? COLORS.DARK_GRAY
                : COLORS.LIGHT_GARY_03
            }
            disabled={disabled ? true : isButtonDisabled(currentPlan, selectedPlan)}
            isloading={loading}
            bgColor={
              isButtonDisabled(currentPlan, selectedPlan)
                ? COLORS.LIGHT_GRAY_02
                : COLORS.PRIMARY
            }
            titleStyle={{ lineHeight: RF(23) }}
            customStyle={{ ...SPACING.py4 }}
            customContainerStyle={[
              { ...SPACING.mt11, width: '100%' },
              disabled && { opacity: 0.4 },
            ]}
            onPress={async () => {
              await handleOnPress(
                user?.email,
                setLoading,
                currentPlan,
                selectedPlan,
                setShowSuccessModal,
                setShowDowngradeModal,
                setShowUpgradeModal,
              );
              // After handleOnPress, the global user state is updated (via setUser)
              // which will trigger our effect to update currentPlan and selectedPlan.
            }}
          />
        )}
        <DowngradePlanModal
          open={showDowngradeModal}
          showCloseIcon
          onPressClose={() => setShowDowngradeModal(false)}
        />
        <UpgradePlanModal
          open={showUpgradeModal}
          showCloseIcon
          onPressClose={() => setShowUpgradeModal(false)}
        />
        <PaymentUnsuccessfulModal
          open={showPaymentUnsuccessfulModal}
          onPressBtn={() => setShowPaymentUnsuccessfulModal(false)}
          onPressClose={() => setShowPaymentUnsuccessfulModal(false)}
        />
        <PaymentIssueModal
          open={showPaymentIssueModal}
          onPressBtn={() => setShowPaymentIssueModal(false)}
          onPressClose={() => setShowPaymentIssueModal(false)}
        />
        <PlanResubscribeModal
          open={showPlanResubscribeModal}
          onPressBtn={() => setShowPlanResubscribeModal(false)}
          onPressClose={() => setShowPlanResubscribeModal(false)}
        />
        <PlanCancellationModal
          open={showPlanCancellationModal}
          isLoading={isCancelBtnLoading}
          onPressBtn={() =>{
            // console.log("USER: ",currentPlan);
            // console.log("USER: ",user);
            hitCancelSubscriptionAPI(
              user,
              setShowPlanCancellationModal,
              setIsCancelBtnLoading,
            )
          }
          }
          onPressClose={() => setShowPlanCancellationModal(false)}
        />
        <CustomButton
          title="Purchase Subscription"
          onPress={
            // console.log("SUBSCRIPTIONSS : ",subscriptions) &&
            () =>
            purchaseSubscription(
              subscriptions?.[0]?.productId,
              subscriptions?.[0]?.subscriptionOfferDetails,
              user?.email,
            )
          }
          customStyle={{ 
            ...SPACING.py4, // Adds vertical padding using theme spacing
            paddingHorizontal: RF(20) // Adds responsive horizontal padding
          }}          
        />
      </ScrollView>
      <CustomFooter
        containerStyle={{
          bottom: tabBarHeight + RF(5),
        }}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: WP(8),
    backgroundColor: COLORS.LIGHT_GRAY,
  },
});

export default Plan;

