import { useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import EmptyRequests from "../../../assets/illustrations/EmptyRequests";
import EmptyState from "../../../components/Interface/EmptyState";
import LoadingComp from "../../../components/Interface/LoadingComp";
import PastRequest from "../../../components/requests/PastRequest";
import useClientOrders from "../../../hooks/queries/requests/useClientOrders";
import { CustomerRequestsNavProps } from "../../customers/CustomerRequests";

export default function PastScreen({ navigation, route }) {
  const { data: ordersData, isLoading, refetch } = useClientOrders();
  const data =
    Array.isArray(ordersData) &&
    ordersData.filter((ord) => ord.status === "completed");
  const dataIsValid = Array.isArray(data) && data?.length > 0;
  const { navigation: nav } = route.params;
  const stackNav: CustomerRequestsNavProps["navigation"] = nav;

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
            function onPress() {
              Alert.alert(
                "Coming Soon",
                "We are still working on this feature, we will let you know when it is available"
              );
              //hire again for clients
            }
            const date = new Date(item.projectDeadline).toDateString();
            const rate = `${item.amount}`;
            const sr = item.serviceRequestId as any;
            return (
              <PastRequest
                currency={sr?.country?.currency_symbol}
                date={date}
                name={`${item?.vendorId.firstName} ${item?.vendorId?.lastName}`}
                image={item?.vendorId.image}
                rate={rate}
                service={item?.title}
                onPress={onPress}
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
