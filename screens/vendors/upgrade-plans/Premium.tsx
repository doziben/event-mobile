import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Items from "./upgrade-components/Item";
import CurrentPlan from "./upgrade-components/CurrentPlan";
import SelectButton from "../../../components/payments/SelectButton";
import useUser from "../../../hooks/queries/useUser";
import UpgradeContext from "../../../store/UpgradeContext";
import { PremiumIcon } from "../../../assets/svg-icons/PlansIcons";
import FormToggle from "../../../components/Interface/FormToggle";
import useUserCurrency from "../../../hooks/custom/useUserCurrency";
import PayWithFlutterwave from "flutterwave-react-native";
import { FlutterwaveInitOptions } from "flutterwave-react-native/dist/FlutterwaveInit";
import { flutterwaveCurrencies, flw_plans } from "../../../data/flutterwave";

export default function Premium() {
  const { data: userData } = useUser();
  const currentPlan = userData?.plan;
  const userCurrency = useUserCurrency();

  const { upgrade, planPrices } = useContext(UpgradeContext);
  const [annually, setAnnally] = useState(false);

  const stripePremium = planPrices?.premium;

  const stripePrice = annually
    ? stripePremium?.year?.amount
    : stripePremium?.month?.amount;
  const flwPrice = annually
    ? `${flw_plans.premium_yearly.amount}`
    : `${flw_plans.premium_monthly.amount}`;

  const isFlutterwave = flutterwaveCurrencies.includes(userCurrency);
  const FLUTTERWAVE_PUBLIC_KEY = "FLWPUBK-5b7b00afdecd08dd2c3f6194e480ef80-X";

  const authorization = FLUTTERWAVE_PUBLIC_KEY;

  function handleRedirect(data) {
    console.log(data);
  }

  const options: Omit<FlutterwaveInitOptions, "redirect_url"> = {
    amount: parseInt(flwPrice),
    currency: "USD",
    tx_ref: `${userData?._id}_${new Date().getTime()}`,
    authorization,
    customer: {
      email: userData?.email,
      name: userData?.firstName,
      phonenumber: userData?.phone,
    },
    payment_plan: annually
      ? flw_plans.premium_yearly.id
      : flw_plans.premium_monthly.id,
    meta: {
      vendorId: userData?._id,
      plan: "premium",
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <View style={styles.header}>
          <PremiumIcon />
          <View style={{ marginLeft: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "MontserratBold",
                lineHeight: 24,
              }}
            >
              Premium
            </Text>
            <Text
              style={{
                color: "#DE8E0E",
                fontSize: 14,
                fontFamily: "OpenSansRegular",
                lineHeight: 24,
              }}
            >
              {isFlutterwave
                ? `$${flwPrice}/${annually ? "year" : "month"}`
                : `£${stripePrice}/${annually ? "year" : "month"}`}
            </Text>
          </View>
        </View>

        <FormToggle
          isEnabled={annually}
          toggleSwitch={() => setAnnally((p) => !p)}
          label="Annually"
        />
      </View>

      <View style={styles.planDetails}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "OpenSansSemiBold",
            lineHeight: 24,
            marginBottom: 10,
          }}
        >
          What's included:
        </Text>
        <ScrollView>
          <Items text="Early bird request" />
          <Items text="10% Commission" />
          <Items text="Up to 3 staffs" />
          <Items text="Up to 5 locations" />
          <Items text="Ability to set your own prices and list services" />
          <Items text="Professional reports" />
          <Items text="5GB storage limit" />
        </ScrollView>
      </View>

      <View style={styles.currentType}>
        {currentPlan === "premium" ? (
          <CurrentPlan />
        ) : isFlutterwave ? (
          <PayWithFlutterwave
            options={options}
            style={{ borderRadius: 300, backgroundColor: "#DE8E0E" }}
            onRedirect={handleRedirect}
          />
        ) : (
          <SelectButton
            onPress={() => upgrade("premium", annually ? "YEARLY" : "YEARLY")}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  topWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  planDetails: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  currentType: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#E5E5E5",
  },

  myplan: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 100,
    backgroundColor: "#FAFAFA",
  },

  myplanText: {
    fontFamily: "OpenSansBold",
    color: "#8C8C8C",
    fontSize: 14,
  },
});
