import { Dispatch, SetStateAction, useContext, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
} from "react-native";
import LoadingComp from "../Interface/LoadingComp";
import ModalHeader from "./ModalHeader";
import useService from "../../hooks/queries/useService";
import HeadingText from "../Interface/HeadingText";
import SummaryItem from "../requests/SummaryItem";
import getTimeString from "../../utils/GetTimeString";
import PrimaryButton from "../Interface/PrimaryButton";
import useCreateApplication from "../../hooks/mutations/useCreateApplication";
import useUser from "../../hooks/queries/useUser";
import SuccessModal from "./SuccessModal";
import useServiceRequest from "../../hooks/queries/requests/useServiceRequest";
import useUserCurrency from "../../hooks/custom/useUserCurrency";
import FormTextInput from "../Interface/FormTextInput";
import useUpdateApplication from "../../hooks/mutations/requests/useUpdateApplication";
import useServiceRequests from "../../hooks/queries/requests/useServiceRequests";
import TextButton from "../Interface/TextButton";
import { AppNavContext } from "../../store/AppNavContext";

interface EventRequestModalProps {
  requestId: string;
  isVisible: boolean;
  setVisibility: Dispatch<SetStateAction<Boolean>>;
  onGenerateQuote?: () => void;
  isEdit?: boolean;
  applicationId?: string;
  onApply?: VoidFunction;
}

export default function EventRequestModal({
  requestId,
  isVisible,
  setVisibility,
  onGenerateQuote,
  isEdit,
  applicationId,
  onApply,
}: EventRequestModalProps) {
  const [successModal, setSuccessModal] = useState(false);
  const { data: userData, isLoading: isUserLoading } = useUser();
  const { data, isLoading } = useServiceRequest(requestId);
  const { mutate, isLoading: isCreateLoading } = useCreateApplication();
  const userCurrency = useUserCurrency();
  const { refetch } = useServiceRequests();
  const { drawerNav } = useContext(AppNavContext);

  const serviceRequest = data && (data as any);
  const { data: serviceData } = useService(serviceRequest?.category);

  //** Category of the request */
  const service = serviceData && serviceData;

  const image = service?.media;
  const category = service?.name;

  const rate =
    serviceRequest?.budget?.fixedPrice ?? serviceRequest?.budget?.range?.max;

  let budget = `${userCurrency}${serviceRequest?.budget?.fixedPrice}`;

  // let budget =
  //   serviceRequest?.budget?.type === "fixed"
  //     ? `${userCurrency}${serviceRequest?.budget?.fixedPrice}`
  //     : `${userCurrency}${serviceRequest?.budget.range?.min}-${userCurrency}${serviceRequest?.budget?.range?.max}`;

  let commission = 20;
  let clientBudget =
    serviceRequest?.budget?.type === "fixed"
      ? serviceRequest?.budget?.fixedPrice
      : serviceRequest?.budget?.range?.max;

  if (userData?.plan === "premium") {
    commission = 10;
  }
  if (userData?.plan === "elite") {
    commission = 5;
  }

  const charge = Math.floor((commission / 100) * clientBudget);
  const serviceCharge = `${userCurrency}${charge}`;
  const vendorEarning = `${userCurrency}${rate - charge}`;

  function closeModal() {
    setVisibility(false);
  }

  function acceptGig() {
    const data = {
      date: new Date().getTime(),
      email: userData.email,
      rate,
      serviceRequest: serviceRequest._id,
      userId: userData._id,
      customizeRate: false,
      description: userData.email,
    };

    mutate(data, {
      onSuccess: () => (
        closeModal(), setSuccessModal(true), refetch(), !!onApply && onApply()
      ),
      onError: (e: any) => {
        console.log(e);
        alert(e?.response?.data?.message);
      },
    });
  }

  //** For editing */
  const [newRate, setNewRate] = useState("");
  const updateApplication = useUpdateApplication(applicationId);

  function editApplication() {
    if (newRate > "") {
      updateApplication.mutate(
        {
          rate: parseInt(newRate),
        },
        {
          onSuccess: () => {
            alert("Edited Successfully");
            closeModal();
          },
          onError: (e: any) => {
            alert(e?.response?.data?.message);
          },
        }
      );
    } else {
      alert("Enter a new rate and press save");
    }
  }

  return (
    <>
      <SuccessModal
        title="Request Submitted"
        message="We have submitted your request and it is processing. 
        We will notify you when it has been accepted by the client"
        visible={successModal}
        setVisibility={setSuccessModal}
      />

      {/* Main Modal */}
      <View>
        <Modal visible={isVisible} animationType="slide">
          <SafeAreaView style={{ marginHorizontal: 20, marginBottom: 80 }}>
            <ModalHeader
              title={isEdit ? "Edit Application" : "Event Available"}
              onClose={closeModal}
            />
            {(isLoading || isCreateLoading || isUserLoading) && <LoadingComp />}
            {serviceRequest ? (
              <ScrollView
                style={{ width: "100%" }}
                showsVerticalScrollIndicator={false}
              >
                <ImageBackground
                  style={styles.img}
                  source={{
                    uri: `https://yeve.fra1.cdn.digitaloceanspaces.com/${image}`,
                  }}
                >
                  <Text style={styles.categoryName}>{category}</Text>
                </ImageBackground>

                <View style={styles.eventDetails}>
                  <HeadingText lg>Event Details</HeadingText>

                  <SummaryItem
                    label="Event Type"
                    value={serviceRequest.eventType?.name}
                    hideEdit
                  />
                  <SummaryItem
                    label="Date"
                    value={new Date(serviceRequest.date).toDateString()}
                    hideEdit
                  />
                  <SummaryItem
                    label="Time"
                    value={getTimeString({
                      date: new Date(serviceRequest?.time),
                    })}
                    hideEdit
                  />
                  <SummaryItem
                    label="Duration"
                    value={`${serviceRequest?.hours} hours`}
                    hideEdit
                  />
                  <SummaryItem
                    label="Dress Code"
                    value={serviceRequest.dressCode?.name}
                    hideEdit
                  />

                  {/* Other details */}
                  {!!serviceRequest?.otherDetails && (
                    <View style={styles.location}>
                      <HeadingText lg>Other Details</HeadingText>

                      {(serviceRequest?.otherDetails as any[])?.map((o) => {
                        return (
                          <SummaryItem
                            key={o?.name}
                            label={o?.name}
                            value={o?.values?.toString()}
                            hideEdit
                          />
                        );
                      })}
                    </View>
                  )}

                  {budget && (
                    <>
                      <SummaryItem
                        label="Client Budget"
                        value={budget}
                        hideEdit
                      />
                      <SummaryItem
                        // Upgrade account to enjoy lower fees
                        label={`Service Charge (${commission}%)`}
                        value={serviceCharge}
                        hideEdit
                      />

                      <SummaryItem
                        label="You earn"
                        value={vendorEarning}
                        hideEdit
                      />

                      <View style={styles.upgrade}>
                        <Text>
                          Upgrade your account to enjoy{"\n"}lower commission 🥳
                        </Text>

                        <TextButton
                          title="Upgrade Account"
                          onPress={() => {
                            drawerNav?.navigate("Upgrade");
                            closeModal();
                          }}
                        />
                      </View>
                    </>
                  )}
                </View>

                <View style={styles.location}>
                  <HeadingText lg>Location</HeadingText>
                  <SummaryItem
                    value={serviceRequest.address}
                    hideEdit
                    label="Address"
                    hideLabel
                  />
                </View>

                {!isEdit ? (
                  <>
                    <View style={styles.buttonRow}>
                      <PrimaryButton
                        extraStyles={{ flex: 2, backgroundColor: "#f5f5f5" }}
                        extraTextStyles={{ color: "black" }}
                        title="Skip"
                        onPress={closeModal}
                      />
                      <PrimaryButton
                        extraStyles={{ flex: 5 }}
                        title="Apply"
                        onPress={acceptGig}
                      />
                    </View>
                    <PrimaryButton
                      title="Generate Quote"
                      extraStyles={{ backgroundColor: "black", width: "100%" }}
                      onPress={onGenerateQuote}
                    />
                  </>
                ) : (
                  <View style={{ width: "100%" }}>
                    <FormTextInput
                      label="How much would you want to charge"
                      placeholder="Enter Rate"
                      hasTag
                      tag={userCurrency}
                      onChangeText={(t) => setNewRate(t)}
                    />
                    <PrimaryButton
                      title="Save"
                      onPress={editApplication}
                      isLoading={updateApplication.isLoading}
                    />
                  </View>
                )}
              </ScrollView>
            ) : null}
          </SafeAreaView>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 128,
    width: "100%",
    backgroundColor: "gray",
    justifyContent: "center",
  },
  categoryName: {
    fontFamily: "OpenSansBold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  eventDetails: {
    marginVertical: 16,
    width: "100%",
  },
  upgrade: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e8e8e8",
  },
  location: {
    marginBottom: 12,
    width: "100%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
});
