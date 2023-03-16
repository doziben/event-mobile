import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import LoadingComp from "../../../../components/Interface/LoadingComp";
import CategoryCard from "../../../../components/services/CategoryCard";
import ServicesBar from "../../../../components/services/ServicesBar";
import useCategories from "../../../../hooks/queries/useCategories";
import { CategoryDataObj } from "../../../../types/api/categoryDataObj";
import { AddServiceStack } from "../../../../types/extras/AddServiceStack";

export type ServicesListScreenProps = NativeStackScreenProps<
  AddServiceStack,
  "serviceList"
>;

export default function ServicesList({ navigation }: ServicesListScreenProps) {
  const { isLoading, data, refetch, isRefetching } = useCategories();
  const dataIsValid = Array.isArray(data) && data.length > 0;

  return isLoading ? (
    <LoadingComp />
  ) : (
    <View style={styles.container}>
      <ServicesBar />
      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <Text style={{ fontFamily: "OpenSansRegular", color: "#767676" }}>
          Choose from the list of services below
        </Text>
      </View>

      {dataIsValid && (
        <FlatList
          style={{
            marginBottom: "50%",
          }}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          numColumns={2}
          data={data}
          refreshing={isLoading || isRefetching}
          onRefresh={refetch}
          renderItem={({ item }) => {
            const { media, name, previledge, _id } = item as CategoryDataObj;
            return (
              <CategoryCard
                onPress={() =>
                  navigation.navigate("serviceSubList", { category: name })
                }
                media={media}
                name={name}
                priviledge={previledge}
              />
            );
          }}
          keyExtractor={({ name }) => name}
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
  },
});
