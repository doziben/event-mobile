import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import HeadingText from "../../../components/Interface/HeadingText";
import StatsContainer from "../../../components/stats/StatsContainer";
import BalanceCard from "../../../components/payments/balanceCard";
import useUser from "../../../hooks/queries/useUser";
import LoadingComp from "../../../components/Interface/LoadingComp";
import useVendorOrders from "../../../hooks/queries/requests/useVendorOrders";
import useUserCurrency from "../../../hooks/custom/useUserCurrency";

export default function Stats() {
  /**
   * Get the endpoints for these stats
   * use coma separator for values like money and number of followers etc
   */

  const { data, isLoading } = useUser();
  const { data: OrdersData, isLoading: ordersLoading } = useVendorOrders();
  const userCurrency = useUserCurrency();

  const allLoading = isLoading || ordersLoading;

  const ordersValid = Array.isArray(OrdersData) && OrdersData.length > 0;
  let totalGigs = ordersValid ? OrdersData?.length : 0;

  let totalIncome = 0;
  let pendingIncome = 0;

  if (ordersValid) {
    const arr = ordersValid && OrdersData;
    const total = arr.filter(({ status }) => status === "completed");
    const pending = arr.filter(({ status }) => status !== "completed");

    totalIncome = total.reduce((a, b) => a + b?.amount, 0);
    pendingIncome = pending.reduce((a, b) => a + b?.amount, 0);
  }

  return (
    <ScrollView style={styles.container}>
      <HeadingText lg>Stats</HeadingText>
      <View style={styles.wrapper}>
        {allLoading ? (
          <LoadingComp />
        ) : (
          <>
            <StatsContainer
              value={totalGigs.toString()}
              title="NUMBER OF GIGS"
            />
            {/* Soji will provide */}
            <StatsContainer
              value={`${userCurrency}${pendingIncome}`}
              title="PENDING INCOME"
            />
            <StatsContainer
              value={`${userCurrency}${totalIncome}`}
              title="TOTAL INCOME"
            />
            <StatsContainer
              value={data?.followers?.length?.toString()}
              title="FOLLOWERS"
            />
          </>
        )}

        <BalanceCard hideWithdraw />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
    paddingVertical: 32,
  },

  wrapper: {
    marginTop: 12,
    marginBottom: 80,
  },

  walletBallanceContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#DE8E0E",
    borderRadius: 10,
    elevation: 1,
    marginBottom: 15,
  },
});
