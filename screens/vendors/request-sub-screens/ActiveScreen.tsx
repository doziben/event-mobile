import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import Modal from "react-native-modal";
import EmptyRequests from "../../../assets/illustrations/EmptyRequests";
import EmptyState from "../../../components/Interface/EmptyState";
import LoadingComp from "../../../components/Interface/LoadingComp";
import PrimaryButton from "../../../components/Interface/PrimaryButton";
import ModalHeader from "../../../components/modals/ModalHeader";
import ModalWrapper from "../../../components/modals/ModalWrapper";
import RateUserModal from "../../../components/modals/RateUserModal";
import ActiveRequest from "../../../components/requests/ActiveRequest";
import useUpdateClientOrder from "../../../hooks/mutations/requests/useUpdateClientOrder";
import useVendorOrders from "../../../hooks/queries/requests/useVendorOrders";
import { VendorRequestScreenProps } from "../RequestScreen";

export default function ActiveScreen({ navigation, route }) {
  const {
    data: ordersData,
    isLoading,
    refetch,
    isRefetching,
  } = useVendorOrders();
  const data =
    Array.isArray(ordersData) &&
    ordersData.filter((ord) => ord.status !== "completed");
  const dataIsValid = Array.isArray(data) && data?.length > 0;
  const { navigation: nav } = route.params;

  const stackNav: VendorRequestScreenProps["navigation"] = nav;

  const [orderId, setOrderId] = useState("");
  const [userId, setUserId] = useState("");
  const { isLoading: isActivateLoading, mutate } =
    useUpdateClientOrder(orderId);

  const [isRating, setIsRating] = useState(false);
  const [modalState, setModalState] = useState({
    activate: false,
    complete: false,
  });

  useEffect(() => {
    refetch();
  });

  function closeAll() {
    setModalState({ activate: false, complete: false });
  }

  function ActivateEvent() {
    mutate(
      {
        status: "active",
      },
      {
        onSuccess: () => {
          alert("Event Activated!");
          closeAll();
          refetch();
        },
        onError: (e: any) => alert(e?.response?.data?.message),
      }
    );
  }

  function CompleteEvent() {
    mutate(
      {
        isSubmit: true,
      },
      {
        onSuccess: () => {
          closeAll();
          refetch();

          setTimeout(() => {
            setIsRating(true);
          }, 1000);
        },
        onError: (e: any) => alert(e?.response?.data?.message),
      }
    );
  }

  return isLoading ? (
    <LoadingComp />
  ) : (
    <>
      {/* Modals */}
      <RateUserModal
        setVisibility={setIsRating}
        title={"Rate Client"}
        userId={userId}
        visible={isRating}
      />

      <View>
        {/* Activation Modal */}
        <Modal isVisible={modalState.activate} onBackdropPress={closeAll}>
          <ModalWrapper>
            <ModalHeader title="Confirm Activation" />

            <Text style={[styles.text, { marginVertical: 16 }]}>
              Activate event to confirm you have arrived to the venue
            </Text>
            <View style={{ width: "100%" }}>
              <PrimaryButton
                title="Yes, Activate"
                onPress={ActivateEvent}
                isLoading={isActivateLoading}
              />

              <PrimaryButton
                title="No, Cancel"
                onPress={() =>
                  setModalState({ activate: false, complete: false })
                }
                extraTextStyles={{ color: "black" }}
                extraStyles={{ backgroundColor: "#fafafa" }}
              />
            </View>
          </ModalWrapper>
        </Modal>

        {/* Completion Modal */}
        <Modal isVisible={modalState.complete} onBackdropPress={closeAll}>
          <ModalWrapper>
            <ModalHeader title="Complete Event" />

            <Text style={[styles.text, { marginVertical: 16 }]}>
              Complete event to confirm that the event has been completed
            </Text>

            <View style={{ width: "100%" }}>
              <PrimaryButton
                title="Yes, Complete"
                onPress={CompleteEvent}
                isLoading={isActivateLoading || isLoading}
              />
              <PrimaryButton
                title="No, Cancel"
                onPress={closeAll}
                extraTextStyles={{ color: "black" }}
                extraStyles={{ backgroundColor: "#fafafa" }}
              />
            </View>
          </ModalWrapper>
        </Modal>
      </View>

      {/* Main */}
      <View style={styles.container}>
        {dataIsValid ? (
          <FlatList
            contentContainerStyle={{ justifyContent: "center" }}
            data={data}
            renderItem={({ item }) => {
              function onActivate() {
                setOrderId(item._id);
                setModalState({
                  activate: true,
                  complete: false,
                });
              }
              function onComplete() {
                setUserId(item?.clientId);
                setOrderId(item._id);

                setModalState({
                  activate: false,
                  complete: true,
                });
              }
              const date = new Date(item.projectDeadline).toDateString();
              const rate = `${item.amount}`;

              const cid = item?.clientId as any;

              return (
                <ActiveRequest.Vendor
                  dateAndTime={date}
                  onActivate={onActivate}
                  onComplete={onComplete}
                  rate={rate}
                  service={item.title}
                  status={item.status}
                  client={`${cid?.firstName} ${cid?.lastName}`}
                />
              );
            }}
            keyExtractor={(item, i) => `${item._id}${i}`}
          />
        ) : (
          <EmptyState
            title="No Active requests"
            illustration={<EmptyRequests />}
            message="You have no active requests yet.."
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
    paddingTop: 10,
  },
  text: {
    color: "#767676",
    fontFamily: "OpenSansRegular",
    fontSize: 14,
    lineHeight: 24,
  },
});
