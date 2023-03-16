import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import LocationCard from "../../../components/account/LocationCard";
import FormDropDown, {
  FormDropDownProps,
} from "../../../components/Interface/FormDropDown";
import HeadingText from "../../../components/Interface/HeadingText";
import PrimaryButton from "../../../components/Interface/PrimaryButton";
import TextButton from "../../../components/Interface/TextButton";
import CountryNotSupportedModal from "../../../components/modals/CountryNotSupportedModal";
import ModalHeader from "../../../components/modals/ModalHeader";
import useCountriesStates from "../../../data/countriesStatesServer";
import { supportedCurrencies } from "../../../data/flutterwave";
import useUpdateUser from "../../../hooks/mutations/useUpdateUser";
import useUser from "../../../hooks/queries/useUser";
import useVendorServices from "../../../hooks/queries/useVendorServices";
import { PremiumModalContext } from "../../../store/PremiumModalContext";

export default function Locations() {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [notSupported, setNotSupported] = useState(false);

  const { setVisibility } = useContext(PremiumModalContext);

  const { data: userData } = useUser();
  const { plan } = useVendorServices();
  const { mutate, isLoading } = useUpdateUser();

  const { getCountry, data } = useCountriesStates();

  const otherLocations =
    Array.isArray(userData?.savedLocation) &&
    userData?.savedLocation.map((val) => {
      return {
        address: "",
        country: "",
        state: val,
        city: val,
      };
    });

  const userAddresses = [
    {
      address: userData?.address,
      country: userData?.country,
      state: userData?.state,
      city: userData?.city,
    },
    ...otherLocations,
  ];

  const addressDataIsValid =
    Array.isArray(userAddresses) && userAddresses?.length > 0;

  const countriesOptions: FormDropDownProps["options"] =
    Array.isArray(data) &&
    data.map(({ name, _id }) => {
      return { label: name, value: _id };
    });

  const [statesOptions, setStateOptions] = useState<
    FormDropDownProps["options"]
  >([]);

  const initialState = {
    country: "",
    state: "",
    address: "",
  };

  const [formData, setFormData] = useState(initialState);

  const formIsValid = Object.values(formData).every((val) => val > "");

  const hasSelectedCountry = formData?.country > "";
  const hasSelectedState = formData?.state > "";

  const isPremiumVendor = plan !== "freemium";

  useEffect(() => {
    if (hasSelectedCountry) {
      const isNotSupported = !supportedCurrencies.includes(
        getCountry(null, formData.country)?.currency
      );

      isNotSupported &&
        (setIsAddingAddress(false),
        setTimeout(() => {
          setNotSupported(true);
        }, 1000));

      const userCountry = getCountry(null, formData.country);

      setStateOptions(
        userCountry?.states?.map((s) => {
          return { label: s?.name, value: s?._id };
        })
      );
    }
  }, [formData.country, isAddingAddress]);

  function textInputHandler(key: string, value: string) {
    setFormData((p) => ({ ...p, [key]: value }));
  }

  function addAddress() {
    if (!isPremiumVendor) {
      setVisibility(true);
      return;
    }

    setIsAddingAddress(true);
  }

  const closeModal = () => {
    setFormData(initialState);
    setIsAddingAddress(false);
  };

  function completeAdd() {
    if (!formIsValid) {
      alert("Please fill in all fields");
      return;
    }

    setIsAddingAddress(false);
    mutate(
      { savedLocation: formData.state },
      {
        onSuccess: () => alert("Address Added"),
        onError: (e: any) => alert(e?.response?.data?.message),
      }
    );
  }

  return (
    <View style={styles.container}>
      {/* Modal for Country not supported */}
      <CountryNotSupportedModal
        email={userData?.email}
        isVisible={notSupported}
        onClose={() => {
          setNotSupported(false);
          setFormData(initialState);
        }}
        country={formData.country}
      />

      {/* Modal for Adding */}
      <Modal visible={isAddingAddress} animationType={"slide"}>
        <SafeAreaView style={{ marginHorizontal: 20 }}>
          <ModalHeader
            largeText
            title="Add Address"
            onClose={closeModal}
            extraStyles={{ marginBottom: 20 }}
          />
          <View style={{ width: "100%" }}>
            <FormDropDown
              placeholder="Select Country"
              options={countriesOptions}
              label="Your country"
              onChangeValue={(value) => {
                textInputHandler("country", value);
              }}
              defaultValue={formData.country}
              zIndex={20}
              zIndexInverse={10}
            />

            {hasSelectedCountry && (
              <FormDropDown
                placeholder="Select State"
                rawOptions={statesOptions}
                options={statesOptions}
                setOptions={setStateOptions}
                label="Your State"
                onChangeValue={(value) => {
                  textInputHandler("state", value);
                  textInputHandler("city", value);
                }}
                zIndex={10}
                zIndexInverse={20}
              />
            )}

            {hasSelectedState && (
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
                          ).iso2.toLowerCase()}`
                        : "",
                    }}
                    textInputProps={{
                      style: [styles.input, { width: "100%" }],
                    }}
                  />
                </View>

                {/* Completion Button */}
                <PrimaryButton
                  title="Save"
                  onPress={completeAdd}
                  isLoading={isLoading}
                  extraStyles={{ width: "100%" }}
                />
              </>
            )}
          </View>
        </SafeAreaView>
      </Modal>

      {/* Header */}
      <View style={styles.header}>
        <HeadingText lg>Locations</HeadingText>
        <TextButton title="Add+" onPress={addAddress} />
      </View>

      {/* List */}
      {addressDataIsValid && (
        <FlatList
          data={userAddresses}
          renderItem={({ item, index }) => {
            return (
              <LocationCard
                address={item?.address}
                country={item?.country}
                index={index}
                state={item?.state}
              />
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
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
    marginBottom: 60,
    height: 120,
  },
});
