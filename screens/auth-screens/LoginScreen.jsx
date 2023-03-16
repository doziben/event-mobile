import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import AuthHeader from "../../components/AuthHeader";
import { AuthContext } from "../../store/AuthContext";
import api, { apiUrl, getToken, saveToken } from "../../api";
import useCurrentUser from "../../hooks/queries/useCurrentUser";
import PrimaryButton from "../../components/Interface/PrimaryButton";
import axios from "axios";

export default function LoginScreen({ navigation, route }) {
  const authCtx = useContext(AuthContext);
  const { signIn } = authCtx;
  const { isLoading, getUser } = useCurrentUser((user) =>
    signIn(user.userType)
  );

  const initialFormState = {
    email: route.params?.email ?? "",
    password: "",
  };

  //** Form State */
  const [formState, setFormState] = useState(initialFormState);
  const { email, password } = formState;
  const formIsValid = email > "" && password > "";

  //** TextInput Handler */
  function TextInputHandler(value) {
    setFormState((prev) => ({ ...prev, ...value }));
  }

  //** Form Submit handler */
  const AuthHandler = () => {
    console.log(formState);
    if (formIsValid) {
      axios
        .post(`${apiUrl}/auth/signin`, formState)
        .then((res) => {
          const { accessToken, refreshToken } = res.data;
          switch (res.status) {
            case 200:
              saveToken("_accessToken", accessToken),
                saveToken("_refreshToken", refreshToken).then(() => getUser());
              break;
            default:
              console.log(res);
          }
        })
        .catch((err) => {
          alert(err.response?.data?.message);
          console.log(err);
        })
        .finally(() => {
          getToken("_accessToken").then((r) => console.log(r));
        });
    } else {
      alert("Please fill in all fields");
    }
  };
  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      >
        <ScrollView style={styles.container}>
          <AuthHeader />

          <View style={styles.loginContainer}>
            {/* Header  */}
            <View style={{ alignItems: "center", marginVertical: 20 }}>
              <Text style={styles.title}>Login to Yeve</Text>

              {/* Illustration */}
              <View>
                <Image source={require("../../assets/app-media/slf.png")} />
              </View>
            </View>

            {/* Inputs */}
            <View style={styles.inputContainer}>
              <View style={styles.inputField}>
                <Text style={styles.formText}>Email address</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  autoComplete="email"
                  onChangeText={(text) => TextInputHandler({ email: text })}
                  style={styles.input}
                  placeholder="Enter email address"
                />
              </View>
              <View style={styles.inputField}>
                <Text style={styles.formText}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="***********"
                  secureTextEntry={true}
                  onChangeText={(text) => TextInputHandler({ password: text })}
                />
              </View>
            </View>

            {/* Forgot password */}
            <View style={styles.forgotPassword}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.forgotText}>Forgot your password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <View style={{ marginBottom: 20 }}>
              <PrimaryButton
                title="Log In"
                onPress={AuthHandler} //authhandler
                isLoading={isLoading}
              />
            </View>

            <View style={styles.forgot}>
              <Text style={styles.noAccountText}>
                Not registered?{" "}
                <Text
                  onPress={() => navigation.navigate("Register")}
                  style={styles.createText}
                >
                  Create an account
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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

  formText: {
    fontFamily: "OpenSansSemiBold",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 5,
  },

  btnActive: {
    marginRight: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#1A1A1A",
    borderRadius: 5,
  },

  btnInActive: {
    marginRight: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 10,
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

  loginContainer: {
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

  forgotText: {
    fontFamily: "OpenSansSemiBold",
    color: "#DE8E0E",
    fontSize: 14,
  },

  noAccountText: {
    fontFamily: "OpenSansRegular",
    lineHeight: 24,
    fontSize: 14,
  },

  createText: {
    fontFamily: "OpenSansSemiBold",
    color: "#DE8E0E",
  },

  loginButton: {
    backgroundColor: "#DE8E0E",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },

  loginButtonText: {
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

  forgotPassword: {
    marginBottom: 20,
    flexDirection: "row-reverse",
  },

  forgot: {
    alignItems: "center",
  },
});
