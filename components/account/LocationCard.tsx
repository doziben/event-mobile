import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import useCountriesStates from "../../data/countriesStatesServer";
import { supportedCurrencies } from "../../data/flutterwave";
import useUpdateUser from "../../hooks/mutations/useUpdateUser";
import useUser from "../../hooks/queries/useUser";
import FormDropDown, { FormDropDownProps } from "../Interface/FormDropDown";
import PrimaryButton from "../Interface/PrimaryButton";
import TextButton from "../Interface/TextButton";
import CountryNotSupportedModal from "../modals/CountryNotSupportedModal";
import ModalHeader from "../modals/ModalHeader";
import ModalWrapper from "../modals/ModalWrapper";

interface LocationCardProps {
  address?: string;
  state: number;
  country?: string;
  index: number;
}

export default function LocationCard({
  address,
  index,
  country,
  state,
}: LocationCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [notSupported, setNotSupported] = useState(false);
  const { getCountry, data } = useCountriesStates();
  const { refetch, data: userData } = useUser();
  const { mutate, isLoading } = useUpdateUser();

  //* If the saved location is same as the user address */
  const isSameState = state === userData?.state && index > 0;

  const initialState = {
    country,
    state,
    address,
  };
  const [formData, setFormData] = useState(initialState);

  const userCountry = getCountry(null, formData.country);

  const userState =
    Array.isArray(userCountry?.states) &&
    userCountry?.states?.find((s) => s?._id === state);

  const countriesOptions: FormDropDownProps["options"] =
    Array.isArray(data) &&
    data.map(({ name, _id }) => {
      return { label: name, value: _id };
    });

  const [statesOptions, setStateOptions] = useState<
    FormDropDownProps["options"]
  >(
    Array.isArray(userCountry?.states) &&
      userCountry.states.map((s) => {
        return { label: s?.name, value: s?._id };
      })
  );

  const savedCountry =
    Array.isArray(data) &&
    data.find(({ states }) => {
      return Array.isArray(states) && states?.some((s) => s?._id === state);
    });

  const savedState = savedCountry?.states?.find(({ _id }) => _id === state);

  const formIsValid = Object.values(formData).every((val) => val > "");
  const hasSelectedCountry = formData.country > "";

  useEffect(() => {
    if (hasSelectedCountry) {
      const isNotSupported = !supportedCurrencies.includes(
        getCountry(null, formData?.country)?.currency
      );

      isNotSupported &&
        (setIsEditing(false),
        setTimeout(() => {
          setNotSupported(true);
        }, 1000));

      Array.isArray(userCountry?.states) &&
        setStateOptions(
          userCountry.states.map((s) => {
            return { label: s?.name, value: s?._id };
          })
        );
    }
  }, [formData.country]);

  function textInputHandler(key: string, value: string) {
    setFormData((p) => ({ ...p, [key]: value }));
  }

  //** Change Address */
  function onChangeAddress() {
    if (!formIsValid) {
      alert("Please fill in all fields");
      return;
    }

    //** For The first address - the main user address  */
    if (index > 0) {
      mutate(
        { savedLocation: formData.state },
        {
          onSuccess: () => {
            alert("Address Changed");
            setIsEditing(false);
          },
          onError: (e: any) => alert(e?.response?.data?.message),
        }
      );
    } else {
      mutate(formData, {
        onSuccess: () => {
          alert("Address Changed");
          setIsEditing(false);
        },
        onError: (e: any) => alert(e?.response?.data?.message),
      });
    }

    refetch();
  }

  function closeModal() {
    setIsEditing(false);
    setFormData(initialState);
  }

  return (
    <>
      <View>
        {/* Modal for Country not supported */}
        <CountryNotSupportedModal
          email={userData?.email}
          isVisible={notSupported}
          onClose={() => setNotSupported(false)}
          country={formData.country}
        />

        {/* Modal for editing  */}
        <Modal visible={isEditing} animationType={"slide"}>
          <ScrollView keyboardShouldPersistTaps="always">
            <SafeAreaView style={{ marginHorizontal: 20 }}>
              <ModalHeader
                title="Edit Address"
                largeText
                onClose={closeModal}
                extraStyles={{ marginBottom: 20 }}
              />

              <View style={{ width: "100%" }}>
                <FormDropDown
                  placeholder="Select Country"
                  options={countriesOptions}
                  rawOptions={countriesOptions}
                  label="Your country"
                  onChangeValue={(value) => {
                    textInputHandler("country", value);
                  }}
                  defaultValue={formData.country}
                  zIndex={20}
                  zIndexInverse={10}
                  searchable
                />

                {hasSelectedCountry && (
                  <FormDropDown
                    placeholder="Select State"
                    defaultValue={userState}
                    rawOptions={statesOptions}
                    options={statesOptions}
                    label="Your State"
                    onChangeValue={(value) => {
                      textInputHandler("state", value);
                      textInputHandler("city", value?.toString());
                    }}
                    zIndex={10}
                    zIndexInverse={20}
                    searchable
                  />
                )}

                <>
                  {/* Address */}
                  <View style={[styles.inputField]}>
                    <Text style={styles.formText}>Address</Text>
                    <GooglePlacesAutocomplete
                      placeholder="Search Addresses"
                      onPress={(data, details = null) => {
                        const { place_id, description } = data;
                        textInputHandler("address", description);
                      }}
                      query={{
                        key: "AIzaSyAM6QvttunctOummzhUXwqTZdbup15odnU",
                        language: "en",
                        components: hasSelectedCountry
                          ? `country:${getCountry(
                              null,
                              formData.country
                            )?.iso2?.toLowerCase()}`
                          : "",
                      }}
                      enablePoweredByContainer={false}
                      preProcess={(t) => {
                        textInputHandler("address", t);
                        return t;
                      }}
                      textInputProps={{
                        style: [styles.input, { width: "100%" }],
                      }}
                      keyboardShouldPersistTaps="always"
                    />
                  </View>

                  {/* Completion Button */}
                  <PrimaryButton
                    title="Save"
                    onPress={onChangeAddress}
                    isLoading={isLoading}
                    extraStyles={{ width: "100%" }}
                  />
                </>
              </View>
            </SafeAreaView>
          </ScrollView>
        </Modal>
      </View>

      {/* Container */}
      {!isSameState && (
        <View style={styles.container}>
          <Text style={styles.address}>
            {address > ""
              ? `${address ? address + ", \n" : ""}${
                  userState?.name ? userState?.name + ", \n" : ""
                }${userCountry?.name ?? ""}`
              : `${savedState?.name + ", \n"}${savedCountry?.name} `}
          </Text>

          <TextButton title="Edit" onPress={() => setIsEditing(true)} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#D2D2D2",
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    marginBottom: 12,
    justifyContent: "space-between",
  },
  address: {
    fontFamily: "OpenSansSemiBold",
    fontSize: 14,
    color: "#767676",
  },
  input: {
    borderColor: "#E5E5E5",
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#FAFAFA",
    fontFamily: "OpenSansRegular",
  },
  formText: {
    fontFamily: "OpenSansSemiBold",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 5,
  },
  inputField: {
    marginBottom: 120,
    height: "40%",
  },
});
