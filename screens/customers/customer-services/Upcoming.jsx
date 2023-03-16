import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import EmptyUpcoming from "../../../assets/illustrations/EmptyUpcoming";
import EmptyState from "../../../components/Interface/EmptyState";
import TextButton from "../../../components/Interface/TextButton";
import useClientOrders from "../../../hooks/queries/requests/useClientOrders";

export default function Upcoming({ navigation }) {
  // Get events that have status of accepted and render
  const { data, isLoading } = useClientOrders();
  const dataIsValid = Array.isArray(data) && data.length > 0;

  return (
    <View style={styles.container}>
      {/* Modals */}
      {isLoading && (
        <View style={styles.container}>
          <ActivityIndicator size={"large"} color="#DE8E0E" />
        </View>
      )}

      <EmptyState
        illustration={<EmptyUpcoming />}
        title="No Upcoming Requests"
        message="You have no upcoming service requests yet"
        CTA={
          <TextButton
            title="Request +"
            onPress={() => navigation.navigate("services")}
            extraStyles={{ marginVertical: 12 }}
          />
        }
      />

      {/* Main */}
      {dataIsValid && <FlatList />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 5,
  },
});
