import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, FlatList, View, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { VendorRequestScreenProps } from "../RequestScreen";
import LoadingComp from "../../../components/Interface/LoadingComp";
import PendingRequest from "../../../components/requests/PendingRequest";
import EmptyState from "../../../components/Interface/EmptyState";
import EmptyRequests from "../../../assets/illustrations/EmptyRequests";
import useVendorApplications from "../../../hooks/queries/requests/useVendorApplications";
import EventRequestModal from "../../../components/modals/EventRequestModal";
import useDeleteApplication from "../../../hooks/mutations/requests/useDeleteApplication";

export default function PendingScreen({ navigation, route }) {
  const { data, isLoading, refetch } = useVendorApplications(
    null,
    `?status=pending`
  );
  const dataIsValid = Array.isArray(data) && data?.length > 0;
  const { navigation: nav } = route.params;
  const stackNav: VendorRequestScreenProps["navigation"] = nav;

  const [requestId, setRequestId] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { mutate, isLoading: loading } = useDeleteApplication(applicationId);

  function clear() {
    setRequestId("");
    setApplicationId("");
  }

  function closeModal() {
    setIsEditing(false);
  }

  function cancelApplication() {
    mutate(null, {
      onSuccess: () => {
        alert("Deleted successfully");
        refetch();
        clear();
        closeModal();
      },
      onError: (e: any) => {
        alert(e?.response?.data?.message);
      },
    });
  }

  useEffect(() => {
    refetch();
  });

  return isLoading ? (
    <LoadingComp />
  ) : (
    <View style={styles.container}>
      {loading && <LoadingComp />}
      <EventRequestModal
        {...{ requestId, applicationId }}
        isEdit
        isVisible={isEditing}
        setVisibility={closeModal}
      />
      {dataIsValid ? (
        <FlatList
          contentContainerStyle={{ justifyContent: "center" }}
          data={data}
          renderItem={({ item }) => {
            const budget = `${item.rate}`;
            const dateAndTime = new Date(item.date).toDateString();

            function handleCancel() {
              setRequestId(item?.serviceRequest?._id);
              setApplicationId(item?._id);

              Alert.alert(
                "Delete Application",
                "Do you want to delete this application? This cannot be undone!",
                [
                  { text: "No, go back" },
                  { text: "Yes, delete", onPress: cancelApplication },
                ]
              );
            }

            function handleEdit() {
              setRequestId(item?.serviceRequest?._id);
              setApplicationId(item?._id);
              setIsEditing(true);
            }

            return (
              <PendingRequest.Vendor
                budget={budget}
                dateAndTime={dateAndTime}
                service={item?.serviceRequest?.title}
                clientName={`${item?.serviceRequest?.userId?.firstName} ${item?.serviceRequest?.userId?.lastName}`}
                onPress={() => {
                  stackNav.navigate("clientProfile", {
                    clientId: item?.serviceRequest?.userId?._id,
                  });
                }}
                onCancel={handleCancel}
                onEdit={handleEdit}
              />
            );
          }}
          keyExtractor={(item, i) => `${item?._id}_${i}`}
        />
      ) : (
        <EmptyState
          title="No Pending requests"
          illustration={<EmptyRequests />}
          message="You have no pending requests yet.."
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
  requestCard: {
    backgroundColor: "#fff",
    padding: 15,
    elevation: 1,
    borderRadius: 10,
    marginVertical: 12,
    flex: 1,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
