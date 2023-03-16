import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import EmptyRequests from "../../../assets/illustrations/EmptyRequests";
import EmptyState from "../../../components/Interface/EmptyState";
import LoadingComp from "../../../components/Interface/LoadingComp";
import PastRequest from "../../../components/requests/PastRequest";
import useVendorOrders from "../../../hooks/queries/requests/useVendorOrders";
import { VendorRequestScreenProps } from "../RequestScreen";

export default function PastScreen({ navigation, route }) {
  const { data: ordersData, isLoading, refetch } = useVendorOrders();
  const data =
    Array.isArray(ordersData) &&
    ordersData.filter((ord) => ord.status === "completed");
  const dataIsValid = Array.isArray(data) && data?.length > 0;
  const { navigation: nav } = route.params;
  const stackNav: VendorRequestScreenProps["navigation"] = nav;

  useEffect(() => {
    refetch();
  });

  return isLoading ? (
    <LoadingComp />
  ) : (
    <View style={styles.container}>
      {dataIsValid ? (
        <FlatList
          contentContainerStyle={{ justifyContent: "center" }}
          data={data}
          renderItem={({ item }) => {
            const date = new Date(item.projectDeadline).toDateString();
            const rate = `${item.amount}`;

            const client = item?.clientId as any;

            return (
              <PastRequest
                date={date}
                name={`${client?.firstName} ${client?.lastName}`}
                image={client?.image}
                rate={rate}
                service={item.title}
              />
            );
          }}
          keyExtractor={(item, i) => `${item._id}${i}`}
        />
      ) : (
        <EmptyState
          title="No Past requests"
          illustration={<EmptyRequests />}
          message="You have no past requests yet.."
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
