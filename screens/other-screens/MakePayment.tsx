import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CustomerRequestStack } from "../../types/extras/CustomerRequestStackNav";
import HeadingText from "../../components/Interface/HeadingText";
import { Feather, Ionicons } from "@expo/vector-icons";
import PressableIcon from "../../components/Interface/PressableIcon";
import useServiceRequest from "../../hooks/queries/requests/useServiceRequest";
import LoadingComp from "../../components/Interface/LoadingComp";
import SummaryItem from "../../components/requests/SummaryItem";
import getTimeString from "../../utils/GetTimeString";
import PrimaryButton from "../../components/Interface/PrimaryButton";
import Modal from "react-native-modal";
import ModalWrapper from "../../components/modals/ModalWrapper";
import FormTextInput from "../../components/Interface/FormTextInput";
import ModalHeader from "../../components/modals/ModalHeader";
import { SubscriptionDto } from "../../hooks/mutations/payments/useSubscription";
import useUser from "../../hooks/queries/useUser";
import useStripePayment from "../../hooks/mutations/payments/useStripePayment";
import useUpdateApplication from "../../hooks/mutations/requests/useUpdateApplication";
import SuccessModal from "../../components/modals/SuccessModal";
import BalanceCard from "../../components/payments/balanceCard";

export type MakePaymentScreenProps = NativeStackScreenProps<
  CustomerRequestStack,
  "makePayment"
>;
export default function MakePayment({
  navigation,
  route,
}: MakePaymentScreenProps) {
  const {
    requestId,
    rate,
    applicationId,
    cancellation: cancellationRates,
  } = route.params;
  const { data, isLoading } = useServiceRequest(requestId);
  const { mutate, isLoading: paymentLoading } = useStripePayment();
  const updateApplication = useUpdateApplication(applicationId);

  const { data: userData } = useUser();

  const [success, setSuccess] = useState(false);

  const serviceData = data && data;
  const userCurrency = (serviceData?.country as any)?.currency;

  const discount = "0%";
  const hasRehearsals = serviceData?.rehearsal;

  let cancellation = cancellationRates?.map(({ interval, percentage }) => {
    let hours = interval * 24;
    return `${hours} hours - ${percentage}% \n`;
  });

  const plan_expiry = new Date();
  plan_expiry.setMonth(new Date().getMonth() + 1);

  const [isPaying, setIsPaying] = useState(false);

  const currency = userCurrency === "GBP" ? "stripe" : userCurrency;
  const walletBalance = userData?.wallet[currency] ?? 0;
  const amount = rate;

  // use the payment with wallet route  - pass the current wallet balance

  const [formData, setFormData] = useState<SubscriptionDto>({
    amount,
    card_number: "",
    currency: userCurrency,
    cvv: "",
    email: userData?.email,
    expiry_month: new Date().getMonth().toString(),
    expiry_year: new Date().getFullYear().toString(),
    Interval: serviceData?.recurring ? "MONTHLY" : "MONTHLY", //use the recurring interval instead
    name: `${userData?.firstName} ${userData?.lastName}`,
    paymentType: "PAYMENT",
    plan: "premium",
    plan_expiry: plan_expiry.toISOString(),
    status: "payment",
    trx_ref: applicationId,
    userId: userData?._id,
  });

  function formDataUpdater(key: string, value: string | number) {
    setFormData((p) => ({ ...p, [key]: value }));
  }

  function closeModal() {
    setIsPaying(false);
  }

  function handlePayment() {
    setIsPaying(true);
  }

  function payWithWallet() {
    alert("Coming Soon");
    //make a request to two factor auth
    //then user will enter the pin sent to their email
    //send pin back to backend to confirm
    //once confirmed (check when they hit 6 digits and proceed), they make payment
    //using the pay with wallet route
  }

  function completePayment() {
    mutate(formData, {
      onSuccess: (d) => {
        if (d?.status === "SUCCESS") {
          updateApplication.mutate("accepted", {
            onSuccess: () => {
              closeModal();
              setTimeout(() => {
                setSuccess(true);
              }, 2000);
            },
            onError: (e: any) => alert(e?.response?.data?.message),
          });
        } else {
          alert(d?.massage);
        }
      },
      onError: (e: any) => alert(e?.response?.data?.message),
    });
  }

  return (
    <>
      {/* Success Modal */}
      <SuccessModal
        message="Your payment has been completed. You can track your event progress in
        My requests tab"
        title="Payment Successful"
        setVisibility={setSuccess}
        visible={success}
        CTA={
          <PrimaryButton
            title="Back Home"
            onPress={() => navigation.navigate("requests")}
          />
        }
      />

      {/* Modal for making payments */}
      <View>
        <Modal isVisible={isPaying} onBackdropPress={closeModal} avoidKeyboard>
          <ModalWrapper>
            <ModalHeader
              title={`Make Payment`}
              onClose={closeModal}
              extraStyles={{ marginBottom: 20 }}
            />

            <View style={{ width: "100%" }}>
              <FormTextInput
                label="Card number"
                placeholder="Card Number"
                onChangeText={(t) => formDataUpdater("card_number", t)}
                extraInputOptions={{ keyboardType: "number-pad" }}
              />
              <FormTextInput
                label="CVV"
                placeholder="CVV"
                onChangeText={(t) => formDataUpdater("cvv", t)}
                extraInputOptions={{ keyboardType: "number-pad" }}
              />
              <View style={styles.expiryDate}>
                <FormTextInput
                  label="Expiry Date"
                  placeholder="MM"
                  onChangeText={(t) => formDataUpdater("expiry_month", t)}
                  extraInputOptions={{ keyboardType: "number-pad" }}
                  extraStyles={{ width: "48%" }}
                />
                <FormTextInput
                  label=""
                  placeholder="YY"
                  onChangeText={(t) => formDataUpdater("expiry_year", t)}
                  extraInputOptions={{ keyboardType: "number-pad" }}
                  extraStyles={{ width: "48%" }}
                />
              </View>

              <PrimaryButton
                title={`Pay ${userCurrency}${amount}.00`}
                onPress={completePayment}
                isLoading={paymentLoading}
              />
            </View>
          </ModalWrapper>
        </Modal>
      </View>

      {/* Main Screen */}
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <PressableIcon
            icon={<Feather size={24} name="arrow-left" />}
            onPress={navigation.goBack}
          />
          <HeadingText extraStyles={styles.headingText}>
            Make Payment
          </HeadingText>
        </View>

        {/* Body */}
        {isLoading ? (
          <LoadingComp />
        ) : (
          <>
            <View style={styles.wrapper}>
              <HeadingText extraStyles={{ marginBottom: 16 }} lg>
                Request Summary
              </HeadingText>

              <SummaryItem
                label="Service"
                value={serviceData?.title}
                hideEdit
              />
              <SummaryItem
                label="Event Type"
                value={serviceData?.eventType.name}
                hideEdit
              />
              <SummaryItem
                label="Date"
                value={new Date(serviceData?.date).toDateString()}
                hideEdit
              />
              <SummaryItem
                label="Time"
                value={getTimeString({ date: new Date(serviceData?.date) })}
                hideEdit
              />
              <SummaryItem
                label="Duration"
                value={`${serviceData?.hours} hours`}
                hideEdit
              />
              <SummaryItem
                label="Dress Code"
                value={serviceData?.dressCode.name}
                hideEdit
              />
            </View>

            <View style={styles.wrapper}>
              <SummaryItem
                label="Address"
                value={serviceData?.address}
                hideLabel
                hideEdit
              />
            </View>

            <View style={styles.wrapper}>
              <SummaryItem
                label="Base Rate"
                value={`${userCurrency}${rate}/2h`}
                hideEdit
              />
              <SummaryItem label="Discount" value={discount} hideEdit />
              <SummaryItem
                label="Cancellation Fees"
                value={cancellation.toString()}
                hideEdit
              />
            </View>

            <View style={styles.wrapper}>
              <SummaryItem
                label="Total"
                value={`${userCurrency}${rate}`}
                hideEdit
              />
            </View>

            {/* Payment */}
            <View style={{ marginHorizontal: 20 }}>
              <PrimaryButton title="Pay with Card" onPress={handlePayment} />
              {walletBalance ? (
                <PrimaryButton
                  title={`Pay with Wallet   (${userCurrency}${userData.wallet[currency]}.00)`}
                  onPress={payWithWallet}
                  extraStyles={styles.payWallet}
                />
              ) : (
                <></>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#FAFAFA",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headingText: {
    marginLeft: 12,
  },
  wrapper: {
    marginHorizontal: 20,
    marginTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  expiryDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  payWallet: {
    marginTop: 16,
    backgroundColor: "#000",
  },
});
