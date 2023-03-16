import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import useAllServices from "../../hooks/queries/useAllServices";
import useUser from "../../hooks/queries/useUser";
import useVendorServices from "../../hooks/queries/useVendorServices";
import ServiceTab from "./ServiceTab";

export default function ServicesBar() {
  const { plan, services, refetch, isLoading } = useVendorServices();
  const { data } = useAllServices();
  const { data: userData } = useUser();

  function getServiceValue(index: number) {
    if (services?.length >= index + 1) {
      const service = !isLoading && services[index];
      const name =
        data && data?.find((s) => s?._id === service.category._id)?.name;
      return { name, id: service?.category._id };
    } else {
      return { name: "", id: "" };
    }
  }

  function getBaseRate(index: number) {
    const service = userData?.services[index];
    return `${service?.baseRate}/2H`;
  }

  useEffect(() => {
    refetch();
  });

  return (
    <View style={styles.wrapper}>
      <ServiceTab
        index={0}
        service={getServiceValue(0)}
        baseRate={getBaseRate(0)}
      />
      <ServiceTab
        index={1}
        service={getServiceValue(1)}
        baseRate={getBaseRate(1)}
      />
      <ServiceTab
        index={2}
        service={getServiceValue(2)}
        baseRate={getBaseRate(2)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    marginVertical: 12,
    justifyContent: "space-around",
    zIndex: 50,
  },
});
