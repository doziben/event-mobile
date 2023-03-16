import { useContext, useState } from "react";
import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import useCountriesStates from "../../../data/countriesStatesServer";
import { RequestServiceContext } from "../../../store/RequestServiceContext";
import FormDropDown from "../../Interface/FormDropDown";
import FormTextInput from "../../Interface/FormTextInput";
import HeadingText from "../../Interface/HeadingText";
import PrimaryButton from "../../Interface/PrimaryButton";
import TabSelect from "../../Interface/TabSelect";
import useServices from "../../../hooks/queries/useServices";
interface RehearsalsFormProps {
  onClickNext: (e: GestureResponderEvent) => void;
}

export interface RehearsalFormData {
  rehearsal: boolean;
  sameVenue: boolean;
  numberOfRehearsal: number;
  venueAddress: string;
}

export default function Rehearsals({ onClickNext }: RehearsalsFormProps) {
  const { updateForm, formValues, formTypes, services } = useContext(
    RequestServiceContext
  );
  const { rehearsals, eventDetails } = formValues;
  const { getCountry } = useCountriesStates();
  const { data: musicians } = useServices("Musicians");

  const country = eventDetails.country;

  const initialData: RehearsalFormData = {
    rehearsal: rehearsals?.rehearsal ?? false,
    sameVenue: rehearsals?.sameVenue ?? true,
    numberOfRehearsal: rehearsals?.numberOfRehearsal ?? 1,
    venueAddress: rehearsals?.venueAddress ?? "string", //change to empty string later
  };

  const [formData, setFormData] = useState<RehearsalFormData>(initialData);

  const [otherFormData, setOtherFormData] = useState<Object>({});

  const formDataIsValid =
    formData.sameVenue || (!formData.sameVenue && formData.venueAddress > "");

  //** Services that don't require rehearsals */
  //only performers require rehearsals

  const musicIds = musicians?.map((m) => m?._id);

  //** Check if the service doesn't require rehearsals */
  const rehearsalsNeeded = services.some(({ id }) => musicIds?.includes(id));

  //** Handles input events */
  function textInputHandler(name: string, value: string | boolean | number) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function updateOtherForm(key: string, value: string | boolean | number) {
    setOtherFormData((p) => ({ ...p, [key]: value }));
  }

  //** submit handler */
  function submitHandler(e: GestureResponderEvent) {
    if (formDataIsValid) {
      updateForm("rehearsals", formData);
      updateForm("otherDetails", otherFormData);
      onClickNext(e);
    } else {
      alert("Please fill in all fields");
    }
  }
  return (
    <>
      {rehearsalsNeeded && (
        <>
          <HeadingText lg extraStyles={{ marginBottom: 16 }}>
            Rehearsals
          </HeadingText>
          <TabSelect
            label="Rehearsals needed?"
            options={[
              {
                name: "No",
                onPress: () => textInputHandler("rehearsal", false),
              },
              {
                name: "Yes",
                onPress: () => textInputHandler("rehearsal", true),
              },
            ]}
          />
        </>
      )}
      {/* if Rehearsals */}
      {formData.rehearsal && (
        <>
          <FormTextInput
            placeholder="1"
            label="Number or rehearsals"
            value={formData.numberOfRehearsal?.toString()}
            onChangeText={(e) => textInputHandler("numberOfRehearsal", e)}
            extraInputOptions={{ keyboardType: "number-pad" }}
          />
          <TabSelect
            label="Same as Event venue?"
            options={[
              {
                name: "Yes",
                onPress: () => textInputHandler("sameVenue", true),
              },
              {
                name: "No",
                onPress: () => textInputHandler("sameVenue", false),
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
                  textInputHandler("venueAddress", t);
                  return t;
                }}
                onPress={(data, details = null) => {
                  const { place_id, description } = data;
                  textInputHandler("venueAddress", description);
                }}
                query={{
                  key: "AIzaSyAM6QvttunctOummzhUXwqTZdbup15odnU",
                  language: "en",
                  components: `country:${getCountry(
                    null,
                    country.toString()
                  )?.iso2?.toLowerCase()}`,
                }}
                textInputProps={{ style: styles.textInput }}
              />
            </View>
          )}
        </>
      )}

      {/* Others */}
      {formTypes?.fields && (
        <View style={styles.others}>
          <HeadingText lg extraStyles={{ marginBottom: 16 }}>
            Other Details
          </HeadingText>
          {formTypes?.fields?.map(({ component, name, values }) => {
            switch (component) {
              case "Toggle":
                return (
                  <TabSelect
                    key={name}
                    label={name}
                    options={values.map((v) => ({
                      name: v,
                      onPress: () => updateOtherForm(name, v),
                    }))}
                  />
                );

              case "Radio":
                return (
                  <TabSelect
                    key={name}
                    label={name}
                    options={values.map((v) => ({
                      name: v,
                      onPress: () => updateOtherForm(name, v),
                    }))}
                  />
                );

              case "TextInput":
                return (
                  <FormTextInput
                    label={name}
                    key={name}
                    placeholder={name}
                    onChangeText={(t) => updateOtherForm(name, t)}
                  />
                );
              case "TextArea":
                return (
                  <FormTextInput
                    label={name}
                    key={name}
                    placeholder={name}
                    onChangeText={(t) => updateOtherForm(name, t)}
                    extraInputOptions={{
                      numberOfLines: 2,
                      multiline: true,
                      style: styles.input,
                    }}
                  />
                );

              case "Select":
                return (
                  <FormDropDown
                    key={name}
                    label={name}
                    placeholder={name}
                    options={values.map((v) => ({ label: v, value: v }))}
                    onChangeValue={(val) => updateOtherForm(name, val)}
                  />
                );
              case "NumberInput":
                return (
                  <FormTextInput
                    label={name}
                    key={name}
                    placeholder={name}
                    onChangeText={(t) => updateOtherForm(name, t)}
                    extraInputOptions={{
                      keyboardType: "numeric",
                    }}
                  />
                );

              default:
                return <></>;
            }
          })}
        </View>
      )}
      <View style={{ marginVertical: 16 }}>
        <PrimaryButton isLoading={false} title="Next" onPress={submitHandler} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  others: {
    marginVertical: 20,
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
  label: {
    fontFamily: "OpenSansSemiBold",
    color: "#343434",
    fontSize: 12,
    marginBottom: 5,
  },
  container: { marginBottom: 20 },
  input: {
    minHeight: 56,
    textAlignVertical: "top",
    padding: 12,
    marginTop: 8,
  },
});
