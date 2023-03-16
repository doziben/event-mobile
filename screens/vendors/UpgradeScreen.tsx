import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import DrawerHeader from "../../components/DrawerHeader";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AlertModal from "../../components/AlertModal";
import Freemium from "./upgrade-plans/Freemium";
import Premium from "./upgrade-plans/Premium";
import Elite from "./upgrade-plans/Elite";
import HeadingText from "../../components/Interface/HeadingText";
import UpgradeContext from "../../store/UpgradeContext";
import useSubscription, {
  SubscriptionDto,
} from "../../hooks/mutations/payments/useSubscription";
import useUser from "../../hooks/queries/useUser";
import Modal from "react-native-modal";
import ModalWrapper from "../../components/modals/ModalWrapper";
import ModalHeader from "../../components/modals/ModalHeader";
import FormTextInput from "../../components/Interface/FormTextInput";
import PrimaryButton from "../../components/Interface/PrimaryButton";
import usePlanPrices from "../../hooks/queries/payments/usePlanPrices";
import useUserCurrency from "../../hooks/custom/useUserCurrency";
import { flutterwaveCurrencies } from "../../data/flutterwave";

const Tab = createMaterialTopTabNavigator();

export default function UpgradeScreen({ navigation }) {
  const { data: userData } = useUser();
  const { data: plans } = usePlanPrices();

  const userCurrency = useUserCurrency();

  const planPrices = plans?.message;

  const { isLoading, mutate } = useSubscription();

  const plan_expiry = new Date();
  plan_expiry.setMonth(new Date().getMonth() + 1);

  const [isUpgrading, setIsUpgrading] = useState(false);
  const [formData, setFormData] = useState<SubscriptionDto>({
    amount: 0,
    card_number: "",
    currency: "USD",
    cvv: "",
    email: userData?.email,
    expiry_month: new Date().getMonth().toString(),
    expiry_year: new Date().getFullYear().toString(),
    Interval: "MONTHLY",
    name: `${userData?.firstName} ${userData?.lastName}`,
    paymentType: "PAYMENT",
    plan: "premium",
    plan_expiry: plan_expiry.toISOString(),
    status: "payment",
    trx_ref: `${userData?._id}_${new Date().getTime()}`,
    userId: userData?._id,
  });

  function formDataUpdater(key: string, value: string | number) {
    setFormData((p) => ({ ...p, [key]: value }));
  }

  function upgrade(e: "premium" | "elite", interval?: "MONTHLY" | "YEARLY") {
    formDataUpdater("plan", e);
    formDataUpdater("Interval", interval);

    const isFlutterwave = flutterwaveCurrencies.includes(userCurrency);

    if (isFlutterwave) return;
    setIsUpgrading(true);
  }

  function closeModal() {
    setIsUpgrading(false);
  }

  function submitForm() {
    mutate(formData, {
      onSuccess: () => {
        closeModal();
        alert("Upgrade Successful!");
      },
      onError: (e: any) => alert(e?.response?.data?.message),
    });
  }

  return (
    <UpgradeContext.Provider
      value={{
        upgrade,
        planPrices,
      }}
    >
      {/* Subscription Modal  */}
      <View>
        <Modal isVisible={isUpgrading} onBackdropPress={closeModal}>
          <ModalWrapper>
            <ModalHeader
              title={`Upgrade to ${formData?.plan}`}
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
                title="Upgrade"
                onPress={submitForm}
                isLoading={isLoading}
              />
            </View>
          </ModalWrapper>
        </Modal>
      </View>

      {/* Tabs */}
      <View style={styles.container}>
        <DrawerHeader onPressed={() => navigation.openDrawer()} />
        <AlertModal />
        <View style={styles.header}>
          <HeadingText>Upgrade Account</HeadingText>
          <Text style={styles.text}>
            Upgrade your yeve account to enjoy more features
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Tab.Navigator
            screenOptions={{
              tabBarIndicatorStyle: {
                backgroundColor: "#DE8E0E",
              },
              tabBarStyle: {
                elevation: 0,
                borderBottomWidth: 1,
                borderColor: "#E5E5E5",
                backgroundColor: "#FAFAFA",
              },
              tabBarLabelStyle: {
                textTransform: "none",
                fontFamily: "OpenSansSemiBold",
                fontSize: 14,
                lineHeight: 24,
              },
            }}
          >
            <Tab.Screen name="Freemium" component={Freemium} />
            <Tab.Screen name="Premium" component={Premium} />
            <Tab.Screen name="Elite" component={Elite} />
          </Tab.Navigator>
        </View>
      </View>
    </UpgradeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  text: {
    fontSize: 14,
    fontFamily: "OpenSansRegular",
    lineHeight: 24,
    color: "#767676",
    marginBottom: 10,
  },
  header: {
    marginHorizontal: 20,
  },
  expiryDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
