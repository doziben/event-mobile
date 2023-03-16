import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DrawerHeader from "../../components/DrawerHeader";
import AlertModal from "../../components/AlertModal";
import { Ionicons } from "@expo/vector-icons";
import MonthView from "./calender-sub/MonthView";
import WeekView from "./calender-sub/WeekView";
import { CalendarProvider } from "react-native-calendars";
import { CalendarContext } from "../../store/CalendarContext";
import useCreateCalendar from "../../hooks/mutations/useCreateCalendar";
import { CalendarObj } from "../../types/api/calendarDataObj";
import useUser from "../../hooks/queries/useUser";
import Modal from "react-native-modal";
import ModalWrapper from "../../components/modals/ModalWrapper";
import ModalHeader from "../../components/modals/ModalHeader";
import FormTextInput from "../../components/Interface/FormTextInput";
import HeadingText from "../../components/Interface/HeadingText";
import DatePicker from "../../components/Interface/DatePicker";
import useCountriesStates from "../../data/countriesStatesServer";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import PrimaryButton from "../../components/Interface/PrimaryButton";

export default function CalendarScreen({ navigation }) {
  const { date, display, setDate } = useContext(CalendarContext);

  const { data: userData } = useUser();

  const { getCountry, data } = useCountriesStates();

  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<CalendarObj>({
    eventname: "",
    date: new Date().toISOString(),
    description: "",
    endTime: new Date().getTime(),
    startTime: new Date().getTime(),
    isTimed: false,
    location: "",
    user: userData?._id,
  });

  const { mutate, isLoading } = useCreateCalendar();

  function toggleCreating() {
    setIsCreating((p) => !p);
  }

  function updateFormData(key: string, value: string | number | boolean) {
    setFormData((p) => ({ ...p, [key]: value }));
  }

  function createCalendar() {
    console.log(formData);
    mutate(formData, {
      onError: (e: any) => alert(e?.response?.data?.message),
      onSuccess: () => {
        toggleCreating();
        alert("Event Created!");
      },
    });
  }

  //delete
  useEffect(() => {
    console.log(date);
  }, [date]);
  return (
    <CalendarProvider
      date={date.toISOString()}
      onDateChanged={(date) => setDate(new Date(date))}
    >
      {/* Create Event */}

      <View>
        <Modal
          isVisible={isCreating}
          onBackdropPress={toggleCreating}
          avoidKeyboard
        >
          <ModalWrapper>
            <ModalHeader title="Add to Calendar" onClose={toggleCreating} />

            <View style={{ width: "100%" }}>
              <FormTextInput
                placeholder="Event Name"
                label="Event Name"
                onChangeText={(t) => updateFormData("eventname", t)}
              />

              <HeadingText lg extraStyles={{ marginTop: 20, marginBottom: 12 }}>
                Date & Time
              </HeadingText>

              <View>
                <DatePicker
                  dateValue={new Date(formData.date)}
                  timeValue={new Date(formData.startTime)}
                  onChangeDate={(ev, date) =>
                    updateFormData("date", new Date(date).getTime())
                  }
                  onChangeTime={(ev, time) => {
                    return updateFormData(
                      "startTime",
                      new Date(time).getTime()
                    );
                  }}
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.label}>Location</Text>
                <GooglePlacesAutocomplete
                  placeholder="Search Addresses"
                  onPress={(data, details = null) => {
                    const { place_id, description } = data;
                    updateFormData("locatiob", description);
                  }}
                  query={{
                    key: "AIzaSyAM6QvttunctOummzhUXwqTZdbup15odnU",
                    language: "en",
                    components: Array.isArray(data)
                      ? `country:${getCountry(
                          null,
                          userData?.country
                        )?.iso2?.toLowerCase()}`
                      : "",
                  }}
                  textInputProps={{ style: styles.textInput }}
                  enablePoweredByContainer={false}
                />
              </View>

              <FormTextInput
                label="Add Description"
                placeholder="Add more info"
                onChangeText={(e) => updateFormData("description", e)}
                value={formData.description}
                extraInputOptions={{
                  numberOfLines: 2,
                  multiline: true,
                  style: {
                    minHeight: 56,
                    textAlignVertical: "top",
                    padding: 12,
                    marginTop: 8,
                  },
                }}
              />

              <PrimaryButton
                title={"Save"}
                onPress={createCalendar}
                isLoading={isLoading}
              />
            </View>
          </ModalWrapper>
        </Modal>
      </View>

      {/* Calendar header */}
      <TouchableOpacity activeOpacity={1} style={styles.container}>
        <DrawerHeader onPressed={() => navigation.openDrawer()} />
        <AlertModal />
        <View style={styles.calenderHeader}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: "MontserratBold",
              lineHeight: 48,
            }}
          >
            Calendar
          </Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={toggleCreating}
          >
            <Ionicons name="add-sharp" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.calenderData}>
          {display === "Month" ? <MonthView current={date} /> : <WeekView />}
        </View>
      </TouchableOpacity>
    </CalendarProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  calenderHeader: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
  },
  createButton: {
    padding: 10,
    backgroundColor: "#DE8E0E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  calenderData: {
    flex: 1,
    backgroundColor: "#fff",
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
  textContainer: { marginBottom: 20 },
  label: {
    fontFamily: "OpenSansSemiBold",
    color: "#343434",
    fontSize: 12,
    marginBottom: 5,
  },
});
