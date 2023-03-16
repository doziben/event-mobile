import { Feather } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import HeadingText from "../../../../components/Interface/HeadingText";
import LoadingComp from "../../../../components/Interface/LoadingComp";
import PressableIcon from "../../../../components/Interface/PressableIcon";
import AddServiceModal from "../../../../components/services/AddServiceModal";
import ServiceCard from "../../../../components/services/ServiceCard";
import ServicesBar from "../../../../components/services/ServicesBar";
import useUpdateUser from "../../../../hooks/mutations/useUpdateUser";
import useServices from "../../../../hooks/queries/useServices";
import useVendorServices from "../../../../hooks/queries/useVendorServices";
import { AddServiceStack } from "../../../../types/extras/AddServiceStack";

type ServiceSubListScreenProps = NativeStackScreenProps<
  AddServiceStack,
  "serviceSubList"
>;

interface ServiceModalState {
  isVisible: boolean;
  name: string;
  id: string;
}

const initState = {
  isVisible: false,
  name: "",
  id: "",
};

export default function ServicesSubList({
  route,
  navigation,
}: ServiceSubListScreenProps) {
  const { category } = route.params;
  const { data, isLoading, refetch, isRefetching } = useServices(category);
  const {
    isLoading: isServiceLoading,
    services: vendorServices,
    plan,
  } = useVendorServices();
  const [addService, setAddService] = useState<ServiceModalState>(initState);
  const { mutate } = useUpdateUser();

  function updateAddService(key: string, value: string | boolean) {
    setAddService((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <>
      {(isLoading || isServiceLoading || isRefetching) && <LoadingComp />}

      {/* Modal for adding services */}
      <AddServiceModal
        service={{ id: addService.id, name: addService.name }}
        open={addService.isVisible}
        onClose={() => updateAddService("isVisible", false)}
      />

      {/* Main Page */}
      <View style={styles.container}>
        {/* Services Bar */}
        <ServicesBar />

        {/* Header */}
        <View style={styles.header}>
          <PressableIcon
            icon={<Feather size={24} name="arrow-left" />}
            onPress={navigation.goBack}
          />
          <HeadingText lg extraStyles={{ marginHorizontal: 12 }}>
            {category}
          </HeadingText>
        </View>

        {/* Service list */}
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: "50%" }}
            centerContent={true}
            refreshing={isLoading || isRefetching}
            onRefresh={refetch}
            numColumns={2}
            data={data}
            keyExtractor={({ name }) => name}
            renderItem={({ item, index }) => {
              const { media, name, previledge, _id } = item;
              const isFreemium = plan === "freemium";

              function checkSelected() {
                return vendorServices?.some((v) => v.category._id === _id);
              }

              function toggleService() {
                if (checkSelected()) {
                  const premArr = vendorServices?.filter(
                    (s) => s.category._id !== _id
                  );

                  mutate(
                    {
                      services: premArr,
                    },
                    {
                      onSuccess: () => alert("Removed service"),
                      onError: (e: any) => alert(e?.response?.data?.message),
                    }
                  );
                } else {
                  setAddService((prev) => ({
                    ...prev,
                    id: _id,
                    isVisible: true,
                    name,
                  }));
                }
              }

              return (
                <ServiceCard
                  name={name}
                  media={media}
                  priviledge={previledge}
                  selected={checkSelected()}
                  index={index}
                  onPress={toggleService}
                />
              );
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
    paddingBottom: Dimensions.get("screen").height / 8,
  },
  header: {
    marginTop: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
});
