import { useContext, useEffect, useLayoutEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import HeadingText from "../../../components/Interface/HeadingText";
import PressableIcon from "../../../components/Interface/PressableIcon";
import useServices from "../../../hooks/queries/useServices";
import LoadingComp from "../../../components/Interface/LoadingComp";
import ServiceCard from "../../../components/services/ServiceCard";
import {
  ServiceCartContext,
  ServiceData,
} from "../../../store/ServiceCartContext";
import CartBar from "../../../components/services/CartBar";
import useForms from "../../../hooks/queries/requests/useForms";
import { RequestServiceContext } from "../../../store/RequestServiceContext";
import { ServicesContext } from "../../../store/ServicesContextProvider";
import { getToken } from "../../../api";
import useDressCodes from "../../../hooks/queries/misc/useDressCodes";
import useEventTypes from "../../../hooks/queries/misc/useEventTypes";

export default function ServicesSubList({ route, navigation }) {
  const { category, formId } = route.params;
  const { data, isLoading, refetch, isRefetching } = useServices(category);
  const { form, isLoading: isFormDataLoading } = useForms(formId);
  const serviceCtx = useContext(ServicesContext);
  const { setFormTypes } = useContext(RequestServiceContext);
  const cartCtx = useContext(ServiceCartContext);
  const services = cartCtx?.services;

  useLayoutEffect(() => {
    serviceCtx.hideTabBar();
  });

  //** Adding and Removing services in cart */
  function toggleServiceInCart(service: ServiceData) {
    const isExisting = services.some((e) => e.id == service.id);
    if (isExisting) {
      cartCtx?.remove(service);
    } else {
      cartCtx?.add(service);
    }
  }

  return (
    <View style={styles.container}>
      {/* Cart */}
      <CartBar onProceed={() => navigation.navigate("serviceRequest")} />

      {/* Header */}
      <View style={styles.header}>
        <PressableIcon
          icon={<Feather size={24} name="arrow-left" />}
          onPress={navigation.goBack}
        />
        <HeadingText extraStyles={{ marginHorizontal: 12 }}>
          {category}
        </HeadingText>
      </View>

      {isLoading && <LoadingComp />}

      {/* Body */}
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          centerContent={true}
          refreshing={isLoading || isRefetching}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          onRefresh={refetch}
          numColumns={2}
          data={data}
          keyExtractor={({ name }) => name}
          renderItem={({ item, index }) => {
            const { media, name, previledge, _id } = item;
            return (
              <ServiceCard
                name={name}
                media={media}
                priviledge={previledge}
                selected={cartCtx?.services.some((e) => e.id == _id)}
                index={index}
                onPress={() => {
                  setFormTypes(form);
                  toggleServiceInCart({
                    id: _id,
                    name,
                  });
                }}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingBottom: "50%",
  },
  header: {
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});
