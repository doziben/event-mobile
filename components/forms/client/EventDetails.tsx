//** Tap into request service context */

import { useContext, useEffect, useState } from "react";
import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import { RequestServiceContext } from "../../../store/RequestServiceContext";
import DatePicker from "../../Interface/DatePicker";
import FormTextInput from "../../Interface/FormTextInput";
import HeadingText from "../../Interface/HeadingText";
import PrimaryButton from "../../Interface/PrimaryButton";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import useCountriesStates from "../../../data/countriesStatesServer";
import FormDropDown, { FormDropDownProps } from "../../Interface/FormDropDown";
import useUser from "../../../hooks/queries/useUser";
import LoadingComp from "../../Interface/LoadingComp";

interface EventDetailsFormProps {
  onClickNext: (e: GestureResponderEvent) => void;
}

export interface eventDetailsFormData {
  postalCode: string;
  address: string;
  hours: number;
  info: string;
  date: number;
  time: number;
  placeId: string;
  country: number; //id of the country
  state: number; //id of the state
  address2: string;
}

interface extraDates {
  index: number;
  value: string;
}

export default function EventDetails({ onClickNext }: EventDetailsFormProps) {
  const { updateForm, formValues } = useContext(RequestServiceContext);
  const { eventDetails } = formValues;
  const { data: userData } = useUser();
  const { data: countriesData, getCountry, isLoading } = useCountriesStates();

  const [countries, setCountries] = useState<FormDropDownProps["options"]>([]);
  const [states, setStates] = useState<FormDropDownProps["options"]>([]);

  const countriesLoaded = Array.isArray(countriesData);

  const initialData: eventDetailsFormData = {
    postalCode: eventDetails?.postalCode ?? "",
    address: eventDetails?.address ?? "",
    placeId: eventDetails?.placeId ?? "",
    hours: eventDetails?.hours ?? 2,
    info: eventDetails?.info ?? "",
    date: eventDetails?.date ?? new Date().getTime(),
    time: eventDetails?.time ?? new Date().getTime(),
    country: 0,
    state: 20,
    address2: "",
  };

  const [formData, setFormData] = useState<eventDetailsFormData>(initialData);
  const { address2, info, postalCode, ...compulsoryData } = formData;
  const [extraDates, setExtraDates] = useState<extraDates[]>([]);
  const formDataIsValid = Object.values(compulsoryData).every(
    (obj) => obj > ""
  );
  const hasCountry = formData?.country?.toString() > "";

  //** Getting country options on render */
  useEffect(() => {
    if (countriesLoaded) {
      const newCountries = countriesData
        .map(({ name, _id }) => ({
          label: name,
          value: _id,
        }))
        .sort((a, b) => a?.label.localeCompare(b.label));
      setCountries(countriesLoaded ? newCountries : []);
    }
  }, [isLoading, countriesLoaded]);

  //** Getting state options on counntry change */
  useEffect(() => {
    if (hasCountry && countriesLoaded) {
      const selectedCountryStates = getCountry(
        null,
        formData?.country.toString()
      )?.states;

      setStates(
        Array.isArray(selectedCountryStates) &&
          selectedCountryStates
            .map((state) => ({
              label: state?.name,
              value: state?._id,
            }))
            .sort((a, b) => a?.label.localeCompare(b.label))
      );
    }
  }, [formData.country, hasCountry, isLoading]);

  //** Text Change Handler */
  function textChangeHandler(name: string, text: string | Date | number) {
    setFormData((prev) => ({ ...prev, [name]: text }));
  }

  //** Submit Handler */
  function submitHandler(e: GestureResponderEvent) {
    if (
      formDataIsValid //Also check if the address field is valid
    ) {
      updateForm("eventDetails", {
        ...formData,
        hours: parseInt(formData.hours.toString()),
      });
      onClickNext(e);
    } else {
      alert("Please fill in all fields");
      console.log(formData);
    }
  }
  return (
    <View style={styles.wrapper}>
      {isLoading && <LoadingComp />}
      {/* Header */}
      <View style={styles.header}>
        <HeadingText lg>Event Location</HeadingText>
      </View>

      {countriesLoaded && (
        <>
          <FormDropDown
            searchable
            label="Country"
            onChangeValue={(v) => textChangeHandler("country", v)}
            rawOptions={countries}
            setOptions={setCountries}
            options={countries}
            placeholder={"Select Country"}
            defaultValue={userData?.country}
            zIndex={30}
            zIndexInverse={20}
          />
          <FormDropDown
            label="State"
            searchable
            onChangeValue={(v) => textChangeHandler("state", v)}
            rawOptions={states}
            setOptions={setStates}
            options={states}
            placeholder={"Select state"}
            zIndex={20}
            zIndexInverse={30}
          />
        </>
      )}
      <FormTextInput
        label="Post / Zip code"
        placeholder="Enter postalcode"
        onChangeText={(e) => textChangeHandler("postalCode", e)}
        value={formData.postalCode}
        extraInputOptions={{ maxLength: 9 }}
      />

      {/* Address */}
      <View style={styles.container}>
        <Text style={styles.label}>Event Address</Text>
        <GooglePlacesAutocomplete
          enablePoweredByContainer={false}
          placeholder="Search Addresses"
          autoFillOnNotFound
          preProcess={(t) => {
            textChangeHandler("address", t);
            return t;
          }}
          onPress={(data, details = null) => {
            const { place_id, description } = data;
            textChangeHandler("address", description);
            textChangeHandler("placeId", place_id);
          }}
          query={{
            key: "AIzaSyAM6QvttunctOummzhUXwqTZdbup15odnU",
            language: "en",
            components: hasCountry
              ? `country:${getCountry(
                  null,
                  formData.country.toString()
                )?.iso2?.toLowerCase()}`
              : "",
          }}
          textInputProps={{ style: styles.textInput }}
        />
      </View>

      {/* Address 2 */}
      <FormTextInput
        label="Apartment, unit, suite, or floor"
        placeholder="Apartment, suite etc.. (optional)"
        onChangeText={(e) => textChangeHandler("address2", e)}
        value={formData.address2}
      />

      <View style={styles.header}>
        <HeadingText lg>Date and Time</HeadingText>
      </View>

      {/* Date and Time */}
      <View>
        <DatePicker
          dateValue={new Date(formData.date)}
          timeValue={new Date(formData.time)}
          onChangeDate={(ev, date) =>
            textChangeHandler("date", new Date(date).getTime())
          }
          onChangeTime={(ev, time) =>
            textChangeHandler("time", new Date(time).getTime())
          }
        />
      </View>

      {/* No of hours */}
      <FormTextInput
        label="Number of hours"
        placeholder="2"
        onChangeText={(e) => textChangeHandler("hours", e)}
        extraInputOptions={{ keyboardType: "number-pad" }}
        value={formData.hours.toString()}
      />

      {/* More Info */}
      {/* <FormTextInput
        label="Add more info"
        placeholder="Add more info (optional)"
        onChangeText={(e) => textChangeHandler("info", e)}
        value={formData.info}
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
      /> */}

      <PrimaryButton title="Next" onPress={submitHandler} isLoading={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapper: {
    marginBottom: 120,
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
  container: { marginBottom: 20 },
  label: {
    fontFamily: "OpenSansSemiBold",
    color: "#343434",
    fontSize: 12,
    marginBottom: 5,
  },
});
