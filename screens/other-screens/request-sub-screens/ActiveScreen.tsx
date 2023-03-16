import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import LoadingComp from "../../../components/Interface/LoadingComp";
import { FlatList } from "react-native-gesture-handler";
import EmptyState from "../../../components/Interface/EmptyState";
import EmptyRequests from "../../../assets/illustrations/EmptyRequests";
import { CustomerRequestsNavProps } from "../../customers/CustomerRequests";
import useClientOrders from "../../../hooks/queries/requests/useClientOrders";
import ActiveRequest from "../../../components/requests/ActiveRequest";
import Modal from "react-native-modal";
import ModalWrapper from "../../../components/modals/ModalWrapper";
import ModalHeader from "../../../components/modals/ModalHeader";
import PrimaryButton from "../../../components/Interface/PrimaryButton";
import useUpdateClientOrder from "../../../hooks/mutations/requests/useUpdateClientOrder";
import RateUserModal from "../../../components/modals/RateUserModal";

export default function ActiveScreen({ navigation, route }) {
  const {
    data: ordersData,
    isLoading,
    refetch,
    isRefetching,
  } = useClientOrders();
  const data =
    Array.isArray(ordersData) &&
    ordersData.filter((ord) => ord.status !== "completed");
  const dataIsValid = Array.isArray(data) && data?.length > 0;

  const { navigation: nav } = route.params;
  const stackNav: CustomerRequestsNavProps["navigation"] = nav;

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
        status: "_active",
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
    console.log("abt to comp");

    mutate(
      {
        status: "completed",
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
        title={"Rate Vendor"}
        userId={userId}
        visible={isRating}
        isVendor
      />

      <View>
        {/* Activation Modal */}
        <Modal isVisible={modalState.activate} onBackdropPress={closeAll}>
          <ModalWrapper>
            <ModalHeader title="Confirm Activation" />

            <Text style={[styles.text, { marginVertical: 16 }]}>
              Activate event to confirm vendor arrival to the event venue
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
                isLoading={isActivateLoading}
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

      {/* List */}
      <View style={styles.container}>
        {dataIsValid ? (
          <FlatList
            contentContainerStyle={{ justifyContent: "center" }}
            onRefresh={refetch}
            refreshing={isRefetching}
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
                setUserId(item?.vendorId?._id);
                setOrderId(item._id);
                setModalState({
                  activate: false,
                  complete: true,
                });
              }
              const date = new Date(item.projectDeadline).toDateString();
              const rate = `${item.amount}`;

              const sr = item?.serviceRequestId as any;

              return (
                <ActiveRequest.Client
                  currency={sr?.country?.currency_symbol}
                  id={item?._id}
                  dateAndTime={date}
                  isSubmit={item.isSubmit}
                  onActivate={onActivate}
                  onComplete={onComplete}
                  rate={rate}
                  service={item.title}
                  status={item.status}
                  vendor={{
                    id: item.vendorId._id,
                    image: item.vendorId.image,
                    name: item.vendorId.firstName,
                  }}
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
