import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Platform,
  Dimensions,
} from "react-native";
import AuthHeader from "../../components/AuthHeader";
import StoreFrontIcon from "../../assets/svg-icons/storefront";
import Group from "../../assets/svg-icons/group";
import api, { apiUrl, saveToken } from "../../api";
import PrimaryButton from "../../components/Interface/PrimaryButton";
import getRandomColor from "../../hooks/custom/getRandomColor";
import { Modal } from "react-native";
import ModalHeader from "../../components/modals/ModalHeader";
import FormDropDown, {
  FormDropDownProps,
} from "../../components/Interface/FormDropDown";
import useCountriesStates from "../../data/countriesStatesServer";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import FormTextInput from "../../components/Interface/FormTextInput";
import CountryNotSupportedModal from "../../components/modals/CountryNotSupportedModal";
import axios from "axios";
import { PendingActionsContext } from "../../store/PendingActionsContaxt";
import { supportedCurrencies } from "../../data/flutterwave";

const initialFormState = {
  image: "i",
  userType: "client",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  username: "",
};

export default function RegisterScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [completion, setCompletion] = useState(false);
  const [notSupported, setNotSupported] = useState(false);
  const placesRef = useRef();

  const { getCountry, data, isLoading: statesLoading } = useCountriesStates();
  const { scrollEnabled } = useContext(PendingActionsContext);
  const [countriesOptions, setCountriesOptions] = useState<
    FormDropDownProps["options"]
  >(
    Array.isArray(data) &&
      data.map(({ name }) => {
        return { label: name, value: name };
      })
  );

  const [formData, setFormData] = useState(initialFormState);
  const hasSelectedCountry = formData.country > "";
  const hasSelectedState = formData.state > "";

  const [statesOptions, setStateOptions] = useState<
    FormDropDownProps["options"]
  >([]);

  const [locale, setLocale] = useState({
    shortCode: "GB",
    currency: "$",
  });
  const { postalCode, ...requiredFields } = formData;
  const formIsValid = Object.values(requiredFields).every((val) => val > "");

  const [confirmPassword, setConfirmPassword] = useState("");

  //**Text Input handler */
  function textInputHandler(obj) {
    setFormData((prev) => ({ ...prev, ...obj }));
  }

  const authType1 = formData.userType === "client";
  const authType2 = formData.userType === "vendor";

  useEffect(() => {
    setCountriesOptions(
      Array.isArray(data) &&
        data
          .map(({ name, _id }) => {
            return { label: name, value: _id };
          })
          .sort((a, b) => a?.label.localeCompare(b.label))
    );
  }, [statesLoading]);

  //** Setting the state anytime country changes  */
  useEffect(() => {
    if (hasSelectedCountry) {
      const userCountry = getCountry(null, formData.country);

      const isNotSupported = !supportedCurrencies.includes(
        userCountry?.currency
      );

      isNotSupported &&
        (setCompletion(false),
        setTimeout(() => {
          setNotSupported(true);
        }, 1000));

      setLocale({
        currency: userCountry.currency,
        shortCode: userCountry.phone_code,
      });

      setStateOptions(
        (userCountry.states as any[])
          .map((s) => {
            return { label: s?.name, value: s?._id };
          })
          .sort((a, b) => a?.label.localeCompare(b.label))
      );
    }
  }, [formData.country]);

  //** SignUp onSuccess Handler */
  function onSignUpSuccess() {
    saveToken("avatarColor", getRandomColor());

    // Alert.alert(
    //   "Confirm Email",
    //   "Let's confirm your email before you proceed",
    //   [
    //     {
    //       text: "Proceed",
    //       style: "default",
    //       onPress: () => navigation.navigate("OTP", { email: formData.email }),
    //     },
    //   ]
    // );

    Alert.alert(
      "Verify your account",
      `You have successfully signed up for yeve. A verification link has been sent to your email ${formData?.email}. Kindly click on it to verify your account`,
      [
        {
          text: "Proceed",
          style: "default",
          onPress: () =>
            navigation.navigate("Login", { email: formData.email }),
        },
      ]
    );
  }

  //** Signup Handler */
  function signUpHandler() {
    //Check for email errors
    if (!formData?.email?.includes("@")) {
      Alert.alert(
        "Invalid Email Address",
        "Your entered an invaild email address, please check and try again"
      );
      return;
    }

    // Check for password errors
    if (formData?.password?.length < 7) {
      Alert.alert(
        "Passwords must be up to 7 characters",
        "Your password must be up to 7 characters, please check and try again"
      );
      return;
    }

    if (confirmPassword !== formData?.password) {
      Alert.alert(
        "Passwords do not match",
        "Your passwords do not match, please check and try again"
      );
      return;
    }

    // Check for first form completion
    const {
      address,
      city,
      country,
      image,
      postalCode,
      phone,
      state,
      ...otherData
    } = formData;

    const firstFormValid = Object?.values({
      ...otherData,
      confirmPassword,
    })?.every((v) => v > "");

    if (!firstFormValid) {
      Alert.alert(
        "All fields are required",
        "Please fill in all fields before clicking 'register'"
      );
      return;
    }

    // Finish Line
    setCompletion(true);
  }

  //** After completion */
  function completeSignup() {
    setIsLoading(true);

    formIsValid
      ? axios
          .post(`${apiUrl}/auth/signup`, {
            ...formData,
            phone: `+${locale.shortCode}${formData.phone}`,
          })
          .then((res) => {
            switch (res.status) {
              case 201:
                onSignUpSuccess();
                break;
              case 400:
                alert("Bad Request");
                break;
              default:
                console.log(res);
            }
          })
          .catch((err) => {
            console.log(err);
            alert(err?.response?.data?.message);
          })
      : alert("Please fill in all fields"),
      setIsLoading(false);
  }

  //** Before Completion */
  function onComplete() {
    console.log(formData);

    setCompletion(false);
    if (hasSelectedCountry) {
      const isNotSupported = !supportedCurrencies.includes(
        getCountry(null, formData.country)?.currency
      );
      isNotSupported ? setNotSupported(true) : completeSignup();
    }
  }

  return (
    <>
      {/* Modal for Country not supported */}
      <CountryNotSupportedModal
        email={formData.email}
        isVisible={notSupported}
        onClose={() => setNotSupported(false)}
        country={formData.country}
      />

      {/* Completion Modal  */}
      <View>
        <Modal visible={completion}>
          <SafeAreaView style={{ flex: 1 }}>
            <ModalHeader
              title="One more thing..."
              largeText
              onClose={() => setCompletion(false)}
              extraStyles={{ marginBottom: 16, paddingHorizontal: 20 }}
            />

            <ScrollView
              scrollEnabled={scrollEnabled}
              contentInsetAdjustmentBehavior="automatic"
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                minHeight:
                  Dimensions?.get("window").height -
                  Dimensions?.get("window").height / 110,
              }}
              style={{
                marginHorizontal: 20,
                paddingBottom: "50%",
              }}
            >
              <KeyboardAvoidingView
                behavior="padding"
                style={{
                  flex: 1,
                  flexDirection: "column",
                }}
                keyboardVerticalOffset={0}
              >
                <FormDropDown
                  placeholder="Select Country"
                  searchable
                  options={countriesOptions}
                  rawOptions={countriesOptions}
                  label="Your country"
                  onChangeValue={(value) => {
                    textInputHandler({ country: value });
                  }}
                  defaultValue={formData.country}
                  setOptions={setCountriesOptions}
                  zIndex={20}
                  zIndexInverse={10}
                />

                {hasSelectedCountry && (
                  <FormDropDown
                    placeholder="Select State"
                    searchable
                    rawOptions={statesOptions}
                    options={statesOptions}
                    setOptions={setStateOptions}
                    label="Your State"
                    onChangeValue={(value) => {
                      textInputHandler({ state: value });
                    }}
                    zIndex={10}
                    zIndexInverse={20}
                  />
                )}

                {hasSelectedState && (
                  <>
                    <FormTextInput
                      label="City"
                      placeholder="city"
                      onChangeText={(text) => textInputHandler({ city: text })}
                      extraStyles={{ width: "100%" }}
                    />

                    <FormTextInput
                      label="Postal Code"
                      placeholder="postal code"
                      onChangeText={(text) =>
                        textInputHandler({ postalCode: text })
                      }
                      extraStyles={{ width: "100%" }}
                    />
                    <FormTextInput
                      label="Phone number"
                      placeholder="number"
                      onChangeText={(text) => textInputHandler({ phone: text })}
                      extraInputOptions={{ keyboardType: "number-pad" }}
                      extraStyles={{ width: "100%" }}
                      hasTag
                      tag={`+${locale.shortCode}`}
                    />

                    {/* Address */}
                    <View style={[styles.inputField, { height: 120 }]}>
                      <Text style={styles.formText}>Address</Text>
                      <GooglePlacesAutocomplete
                        listViewDisplayed={"auto"}
                        enablePoweredByContainer={false}
                        placeholder="Search Addresses"
                        autoFillOnNotFound
                        preProcess={(t) => {
                          textInputHandler({ address: t });
                          return t;
                        }}
                        onPress={(data, details = null) => {
                          const { place_id, description } = data;
                          textInputHandler({ address: description });
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
                        textInputProps={{
                          style: [styles.input, { width: "100%" }],
                        }}
                        ref={placesRef}
                      />
                    </View>

                    {/* Completion Button */}
                    {formIsValid && (
                      <PrimaryButton
                        title="Proceed"
                        onPress={onComplete}
                        isLoading={isLoading}
                        extraStyles={{ width: "100%" }}
                      />
                    )}
                  </>
                )}
              </KeyboardAvoidingView>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </View>

      {/* SignUp form */}
      <ScrollView
        contentContainerStyle={{
          minHeight:
            Dimensions?.get("window").height -
            Dimensions?.get("window").height / 110,
        }}
        keyboardShouldPersistTaps="always"
        style={styles.container}
      >
        <AuthHeader />
        {/* Register Container */}
        <View style={styles.registerContainer}>
          <View style={{ alignItems: "center", paddingVertical: 20 }}>
            <Text style={styles.title}>Register to Yeve</Text>
          </View>

          {/* User Toggler */}
          <View style={styles.authTypeNav}>
            <TouchableOpacity
              style={authType1 ? styles.btnActive : styles.btnInActive}
              onPress={() => textInputHandler({ userType: "client" })}
            >
              <Group
                style={{ marginRight: 15 }}
                color={authType1 ? "#fff" : "#767676"}
              />
              <Text
                style={
                  authType1
                    ? styles.authTypeTextActive
                    : styles.authTypeTextInActive
                }
              >
                Customer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={authType2 ? styles.btnActive : styles.btnInActive}
              onPress={() => textInputHandler({ userType: "vendor" })}
            >
              <StoreFrontIcon
                style={{ marginRight: 15 }}
                color={authType2 ? "#fff" : "#767676"}
              />
              <Text
                style={
                  authType2
                    ? styles.authTypeTextActive
                    : styles.authTypeTextInActive
                }
              >
                Vendor
              </Text>
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView
            behavior="padding"
            style={{
              flex: 1,
              flexDirection: "column",
            }}
            keyboardVerticalOffset={0}
          >
            {/* Input Container */}
            <View style={styles.inputContainer}>
              <View style={styles.inputField}>
                <Text style={styles.formText}>Full name</Text>
                <View style={styles.fullname}>
                  <TextInput
                    style={styles.inputf}
                    placeholder="First Name"
                    onChangeText={(text) =>
                      textInputHandler({ firstName: text })
                    }
                  />
                  <TextInput
                    style={styles.inputl}
                    placeholder="Last Name"
                    onChangeText={(text) =>
                      textInputHandler({ lastName: text })
                    }
                  />
                </View>
              </View>
              <View style={styles.inputField}>
                <Text style={styles.formText}>Email address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={(text) => textInputHandler({ email: text })}
                />
                {formData.email?.length > 2 &&
                  !formData?.email?.includes("@") && (
                    <Text style={[styles.formText, { color: "red" }]}>
                      Invalid email address
                    </Text>
                  )}
              </View>
              <View style={styles.inputField}>
                <Text style={styles.formText}>Username</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter User Name"
                  autoCapitalize="none"
                  onChangeText={(text) => textInputHandler({ username: text })}
                />
              </View>

              <View style={styles.inputField}>
                <Text style={styles.formText}>Password </Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={(text) => textInputHandler({ password: text })}
                  placeholder="***********"
                />
                {formData?.password?.length > 1 &&
                  formData?.password?.length < 7 && (
                    <Text style={[styles.formText, { color: "red" }]}>
                      Password must be a minimum of 7 characters
                    </Text>
                  )}
              </View>
              <View style={styles.inputField}>
                <Text style={styles.formText}>Confirm password</Text>
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
                  placeholder="***********"
                  onChangeText={(t) => setConfirmPassword(t)}
                />
                {formData?.password !== confirmPassword && (
                  <Text style={[styles.formText, { color: "red" }]}>
                    Passwords must match
                  </Text>
                )}
              </View>
            </View>

            <View style={{ marginBottom: 20 }}>
              <PrimaryButton
                onPress={signUpHandler}
                title="Register"
                isLoading={isLoading}
              />
            </View>

            <View style={styles.forgot}>
              <Text style={styles.alreadyText}>
                Already have an account?{" "}
                <Text
                  onPress={() => navigation.goBack()}
                  style={styles.loginText}
                >
                  Login
                </Text>
              </Text>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontFamily: "MontserratBold",
    color: "#1A1A1A",
  },

  btnActive: {
    marginRight: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    backgroundColor: "#1A1A1A",
    borderRadius: 5,
  },

  formText: {
    fontFamily: "OpenSansSemiBold",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 5,
  },

  btnInActive: {
    marginRight: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 5,
  },

  authTypeNav: {
    flexDirection: "row",
  },

  authTypeTextActive: {
    fontFamily: "MontserratBold",
    fontSize: 16,
    color: "#fff",
    lineHeight: 32,
  },

  authTypeTextInActive: {
    fontFamily: "MontserratBold",
    fontSize: 16,
    color: "#767676",
    lineHeight: 32,
  },

  registerContainer: {
    flex: 1,
    marginHorizontal: 20,
  },

  input: {
    borderColor: "#E5E5E5",
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#FAFAFA",
    fontFamily: "OpenSansRegular",
  },

  inputf: {
    flex: 1,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#FAFAFA",
  },

  inputl: {
    flex: 1,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#FAFAFA",
  },

  loginText: {
    fontFamily: "OpenSansSemiBold",
    color: "#DE8E0E",
  },

  alreadyText: {
    fontFamily: "OpenSansRegular",
    lineHeight: 24,
    fontSize: 14,
  },

  registerButton: {
    backgroundColor: "#DE8E0E",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },

  registerButtonText: {
    color: "#fff",
    fontFamily: "OpenSansSemiBold",
    fontSize: 14,
    lineHeight: 24,
  },

  inputContainer: {
    marginTop: 20,
  },

  inputField: {
    marginBottom: 20,
  },
  phoneInput: {
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
  },
  forgotPassword: {
    marginBottom: 20,
    flexDirection: "row-reverse",
  },

  forgot: {
    alignItems: "center",
  },

  fullname: {
    flexDirection: "row",
  },
});
