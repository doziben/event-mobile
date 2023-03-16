import { useContext, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import EmptyEvents from "../../../assets/illustrations/EmptyEvents";
import EmptyState from "../../../components/Interface/EmptyState";
import LoadingComp from "../../../components/Interface/LoadingComp";
import CartBar from "../../../components/services/CartBar";
import CategoryCard from "../../../components/services/CategoryCard";
import useCategories from "../../../hooks/queries/useCategories";
import { ServiceCartContext } from "../../../store/ServiceCartContext";
import { ServicesContext } from "../../../store/ServicesContextProvider";
import { CategoryDataObj } from "../../../types/api/categoryDataObj";

export default function ServicesList({ navigation }) {
  const { isLoading, data, refetch } = useCategories();
  const dataIsValid = Array.isArray(data) && data.length > 0;

  const servicesCtx = useContext(ServicesContext);
  useLayoutEffect(() => {
    servicesCtx.showTabBar();
  });

  const cartCtx = useContext(ServiceCartContext);
  const hasCartItems = cartCtx?.services.length > 0;

  return isLoading ? (
    <LoadingComp />
  ) : (
    <>
      <View style={styles.container}>
        {/* Modals */}

        {/* Cart */}
        <CartBar onProceed={() => navigation.navigate("serviceRequest")} />

        {dataIsValid ? (
          //** Categories List */
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.bodyText}>
              Choose from the list of services below
            </Text>

            <FlatList
              style={{ marginBottom: "35%" }}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={data}
              onRefresh={refetch}
              renderItem={({ item }) => {
                const { media, name, previledge, formId } =
                  item as CategoryDataObj;

                return (
                  <CategoryCard
                    onPress={() =>
                      navigation.navigate("sub", { category: name, formId })
                    }
                    media={media}
                    name={name}
                    priviledge={previledge}
                  />
                );
              }}
              keyExtractor={({ name }) => name}
            />
          </View>
        ) : (
          //** EmptyState */
          <EmptyState
            illustration={<EmptyEvents />}
            title="No Categories yet"
            message="There are no categories to display yet.."
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
  },
  bodyText: {
    fontFamily: "OpenSansRegular",
    color: "#767676",
    marginVertical: 12,
  },
});
