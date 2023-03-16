import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Modal,
  SafeAreaView,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import EmptyRequests from "../../../assets/illustrations/EmptyRequests";
import DatePicker from "../../../components/Interface/DatePicker";
import EmptyState from "../../../components/Interface/EmptyState";
import FormTextInput from "../../../components/Interface/FormTextInput";
import HeadingText from "../../../components/Interface/HeadingText";
import LoadingComp from "../../../components/Interface/LoadingComp";
import PrimaryButton from "../../../components/Interface/PrimaryButton";
import TabSelect from "../../../components/Interface/TabSelect";
import TextButton from "../../../components/Interface/TextButton";
import ModalHeader from "../../../components/modals/ModalHeader";
import PendingRequest from "../../../components/requests/PendingRequest";
import useCountriesStates from "../../../data/countriesStatesServer";
import useDeleteServiceRequest from "../../../hooks/mutations/requests/useDeleteServiceRequest";
import useUpdateServiceRequest from "../../../hooks/mutations/requests/useUpdateServiceRequest";
import useClientServiceRequest from "../../../hooks/queries/requests/useClientServiceRequest";
import useService from "../../../hooks/queries/useService";
import { ServiceRequestDataObj } from "../../../types/api/ServiceRequestDataObj";
import { CustomerRequestsNavProps } from "../../customers/CustomerRequests";

export default function PendingScreen({ navigation, route }) {
  const { data: serviceData, isLoading, refetch } = useClientServiceRequest();
  const dataIsValid = Array.isArray(serviceData) && serviceData?.length > 0;
  const { navigation: nav } = route.params;
  const stackNav: CustomerRequestsNavProps["navigation"] = nav;
  const { getCountry } = useCountriesStates();

  const data =
    dataIsValid && serviceData?.filter(({ status }) => status !== "completed");

  const [editing, setEditing] = useState(false);
  const [request, setRequest] = useState<
    ServiceRequestDataObj | undefined | any
  >(undefined);

  const updateRequest = useUpdateServiceRequest(request?._id);
  const deleteRequest = useDeleteServiceRequest(request?._id);

  const [formData, setFormData] = useState({
    postalCode: "",
    address: "",
    date: new Date(request?.date).getTime(),
    placeId: "",
    rehearsal: request?.rehearsal ?? false,
    sameVenue: request?.sameVenue ?? false,
    hours: request?.hours ?? "2",
  });

  const [updateData, setUpdateData] = useState<any>({});

  const { data: serviceDat } = useService(request?.category);
  const service = serviceDat && serviceDat;

  const image = service?.media;
  const category = service?.name;

  function toggle() {
    setEditing((p) => !p);
  }

  function updateForm(key: string, value: any) {
    setFormData((p) => ({ ...p, [key]: value }));
  }

  useEffect(() => {
    if (request?.date) {
      updateForm("date", request.date);
    }
  }, [request]);

  function saveEdit() {
    Object.keys(formData).forEach((v) => {
      formData[v] > "" &&
        setUpdateData((p) => {
          return { ...p, [v]: formData[v] };
        });
    });

    console.log({ updateData });

    updateRequest.mutate(updateData, {
      onSuccess: () => {
        alert("Event Updated!");
        toggle();
      },
      onError: (e: any) => {
        alert(e?.response?.data?.message);
      },
    });
  }

  function cancelEvent() {
    Alert.alert(
      "Cancel Event?",
      "Do you want to cancel this event? It cannot be undone",
      [
        { text: "No, go back" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            deleteRequest?.mutate(null, {
              onSuccess: () => {
                alert("Deleted Event");
                toggle();
              },
              onError: (e: any) => alert(e?.response?.data?.message),
            });
          },
        },
      ]
    );
  }

  useEffect(() => {
    refetch();
  });

  return isLoading ? (
    <LoadingComp />
  ) : (
    <>
      {/* Edit Modal */}
      <Modal visible={editing} animationType="slide">
        <SafeAreaView style={styles.wrapper}>
          <ModalHeader largeText title="Edit Request" onClose={toggle} />

          <ScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{
              minHeight:
                Dimensions?.get("window").height -
                Dimensions?.get("window").height / 110,
            }}
          >
            <ImageBackground
              style={styles.img}
              source={{
                uri: `https://yeve.fra1.cdn.digitaloceanspaces.com/${image}`,
              }}
            >
              <Text style={styles.categoryName}>{category}</Text>
            </ImageBackground>

            <KeyboardAvoidingView
              behavior="padding"
              style={{
                flex: 1,
                flexDirection: "column",
                // justifyContent: "center",
              }}
              keyboardVerticalOffset={0}
            >
              {/* Event Details */}
              <View style={styles.form}>
                <View style={styles.header}>
                  <HeadingText lg>Event Details</HeadingText>
                  <TextButton
                    extraStyles={{ color: "red" }}
                    title="Cancel Event"
                    onPress={cancelEvent}
                  />
                </View>

                <FormTextInput
                  label="Enter Postal code"
                  placeholder={request?.postalCode?.toString()}
                  onChangeText={(t) => updateForm("postalCode", t)}
                />

                {/* Address */}
                <View style={styles.addressContainer}>
                  <Text style={styles.label}>Event Address</Text>
                  <GooglePlacesAutocomplete
                    enablePoweredByContainer={false}
                    placeholder={formData?.address}
                    autoFillOnNotFound
                    preProcess={(t) => {
                      updateForm("address", t);
                      return t;
                    }}
                    onPress={(data, details = null) => {
                      const { place_id, description } = data;
                      updateForm("address", description);
                      updateForm("placeId", place_id);
                    }}
                    query={{
                      key: "AIzaSyAM6QvttunctOummzhUXwqTZdbup15odnU",
                      language: "en",
                      components: `country:${getCountry(
                        null,
                        request?.country?._id?.toString()
                      )?.iso2?.toLowerCase()}`,
                    }}
                    textInputProps={{ style: styles.textInput }}
                  />
                </View>

                {/* Date and Time */}
                {request?.date && (
                  <View>
                    <DatePicker
                      dateValue={new Date(formData.date)}
                      timeValue={new Date(formData.date)}
                      minDate={new Date(formData.date)}
                      onChangeDate={(ev, date) =>
                        updateForm("date", new Date(date).getTime())
                      }
                      onChangeTime={(ev, time) =>
                        updateForm("date", new Date(time).getTime())
                      }
                    />
                  </View>
                )}

                {/* No of hours */}
                <FormTextInput
                  label="Number of hours"
                  placeholder={formData.hours?.toString()}
                  onChangeText={(e) => updateForm("hours", parseInt(e))}
                  extraInputOptions={{ keyboardType: "number-pad" }}
                />
              </View>

              {/* Rehearsals */}
              {request?.rehearsal && (
                <View>
                  <HeadingText lg>Rehearsals</HeadingText>

                  <TabSelect
                    label="Rehearsals needed?"
                    options={[
                      {
                        name: "No",
                        onPress: () => updateForm("rehearsal", false),
                        isSelected: !request?.rehearsal,
                      },
                      {
                        name: "Yes",
                        onPress: () => updateForm("rehearsal", true),
                        isSelected: request?.rehearsal,
                      },
                    ]}
                  />

                  {/* if Rehearsals */}
                  {formData.rehearsal && (
                    <>
                      <FormTextInput
                        placeholder={"1"}
                        label="Number or rehearsals"
                        onChangeText={(e) => updateForm("numberOfRehearsal", e)}
                        extraInputOptions={{ keyboardType: "number-pad" }}
                      />
                      <TabSelect
                        label="Same as Event venue?"
                        options={[
                          {
                            name: "Yes",
                            onPress: () => updateForm("sameVenue", true),
                          },
                          {
                            name: "No",
                            onPress: () => updateForm("sameVenue", false),
                          },
                        ]}
                      />

                      {/* For Different rehearsal Venue */}
                      {!formData.sameVenue && (
                        <View style={styles.container}>
                          <Text style={styles.label}>Rehearsal Venue</Text>
                          <GooglePlacesAutocomplete
                            enablePoweredByContainer={false}
                            placeholder="Enter rehearsal venue"
                            autoFillOnNotFound
                            preProcess={(t) => {
                              updateForm("venueAddress", t);
                              return t;
                            }}
                            onPress={(data, details = null) => {
                              const { place_id, description } = data;
                              updateForm("venueAddress", description);
                            }}
                            query={{
                              key: "AIzaSyAM6QvttunctOummzhUXwqTZdbup15odnU",
                              language: "en",
                              components: `country:${getCountry(
                                null,
                                request?.country.toString()
                              )?.iso2?.toLowerCase()}`,
                            }}
                            textInputProps={{ style: styles.textInput }}
                          />
                        </View>
                      )}
                    </>
                  )}
                </View>
              )}
              <PrimaryButton
                title="Save"
                isLoading={updateRequest?.isLoading || deleteRequest?.isLoading}
                onPress={saveEdit}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Main */}
      <View style={styles.container}>
        {dataIsValid && data?.length ? (
          <FlatList
            contentContainerStyle={{ justifyContent: "center" }}
            data={data}
            renderItem={({ item }) => {
              function handlePress() {
                item?.numberOfApplicant > 0 &&
                  stackNav.navigate("vendorApplications", {
                    serviceId: item?._id,
                    categoryName: item.title,
                  });
              }

              const country = item.country as any;
              const currency = country?.currency_symbol;

              let budget =
                item?.budget?.type === "fixed"
                  ? `${item?.budget?.fixedPrice}`
                  : `${item?.budget.range?.min}-${currency}${item.budget?.range?.max}`;
              const dateAndTime = new Date(item.date).toDateString();

              function handleEdit() {
                setRequest(item);
                toggle();
              }

              return (
                <PendingRequest.Client
                  currency={currency}
                  budget={budget}
                  dateAndTime={dateAndTime}
                  service={item?.title}
                  applicants={item?.numberOfApplicant}
                  onPress={handlePress}
                  onEdit={handleEdit}
                />
              );
            }}
            keyExtractor={(item, i) => `${item?.userId}${item?.date}_${i}`}
          />
        ) : (
          <EmptyState
            title="No Pending requests"
            illustration={<EmptyRequests />}
            message="You have no pending requests yet.."
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
  form: {
    marginVertical: 16,
  },
  wrapper: {
    marginHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  img: {
    height: 128,
    width: "100%",
    backgroundColor: "gray",
    justifyContent: "center",
    marginBottom: 20,
  },
  categoryName: {
    fontFamily: "OpenSansBold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  textInput: {
    flex: 2,
    padding: 14,
    fontFamily: "OpenSansSemiBold",
    fontSize: 14,
    color: "#767676",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#D2D2D2",
    backgroundColor: "#FAFAFA",
  },
  addressContainer: { marginBottom: 20 },
  label: {
    fontFamily: "OpenSansSemiBold",
    color: "#343434",
    fontSize: 12,
    marginBottom: 5,
  },
});
