import { Feather } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, View } from "react-native";
import { useQuery } from "react-query";
import api from "../../../api";
import HeadingText from "../../../components/Interface/HeadingText";
import LoadingComp from "../../../components/Interface/LoadingComp";
import PressableIcon from "../../../components/Interface/PressableIcon";
import VendorApplication from "../../../components/requests/VendorApplication";
import { currentUserDataObj } from "../../../types/api/currentUserDataObj";
import { CustomerRequestStack } from "../../../types/extras/CustomerRequestStackNav";

export type VendorApplicationScreenProps = NativeStackScreenProps<
  CustomerRequestStack,
  "vendorApplications"
>;
export default function VendorApplications({
  navigation,
  route,
}: VendorApplicationScreenProps) {
  const { serviceId, categoryName } = route.params;

  const { data: serviceRequestData, isLoading } = useQuery(
    ["applications"],
    () =>
      api
        .get(`/service-request/application?serviceRequest=${serviceId}`)
        .then((r) => r.data)
  );
  const data = serviceRequestData?.data;
  const dataIsValid = Array.isArray(data) && data?.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PressableIcon
          icon={<Feather name="arrow-left" size={24} />}
          onPress={navigation.goBack}
        />
        <HeadingText extraStyles={{ marginLeft: 12 }}>
          View Applications
        </HeadingText>
      </View>

      {isLoading && <LoadingComp />}

      {dataIsValid && (
        <FlatList
          style={{ marginHorizontal: 20 }}
          data={data.filter((d) => d.status === "pending")}
          renderItem={({ item }) => {
            const userData = item?.userId as currentUserDataObj;
            const service = userData?.services?.find(
              ({ category }) => category.name === categoryName
            );

            const cancellation = service?.cancellation ?? [];

            const currency = item?.serviceRequest?.country?.currency_symbol;
            const hours = item?.serviceRequest?.hours;

            return (
              <VendorApplication
                vendorId={item?.userId._id}
                applicationId={item?._id}
                categoryName={categoryName}
                customizeRate={item?.customizeRate}
                description={item?.description ?? ""}
                rate={item?.rate}
                requestId={serviceId}
                vendorImage={item?.userId?.image}
                vendorName={`${item?.userId?.firstName} ${item.userId?.lastName}`}
                cancellation={cancellation}
                currency={currency}
                hours={hours}
              />
            );
          }}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});
