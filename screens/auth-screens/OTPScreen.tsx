import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AuthHeader from "../../components/AuthHeader";

export default function OTPScreen({ navigation, route }) {
  const { email } = route.params;

  function authenticate() {
    //get user number from the signup data
    //post two factor auth
    //if textbox is full, then confirm OTP => onconfirm => route to login
  }

  return (
    <ScrollView style={styles.container}>
      <AuthHeader />
      <View style={{ marginHorizontal: 20 }}>
        <View style={{ marginVertical: 10 }}>
          <Text
            style={{
              fontFamily: "MontserratBold",
              fontSize: 24,
              lineHeight: 40,
            }}
          >
            Email Verification
          </Text>
          <Text
            style={{
              color: "#767676",
              marginTop: 10,
              fontSize: 14,
              fontFamily: "OpenSansRegular",
              lineHeight: 24,
            }}
          >
            Please type the 4-digit verificationn code sent to you on {email}
          </Text>
        </View>
        <View style={styles.input}>
          <TextInput style={styles.box} />
          <TextInput style={styles.box} />
          <TextInput style={styles.box} />
          <TextInput style={styles.box} />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.text}>
            I didn't get a code?{" "}
            <Text style={{ color: "#DE8E0E" }}>Resend</Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text
            style={{
              color: "#fff",
              fontFamily: "OpenSansSemiBold",
              fontSize: 14,
              lineHeight: 24,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  box: {
    borderWidth: 1,
    borderColor: "#F0F0F0",
    padding: 20,
    width: 59,
    height: 59,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
  },

  button: {
    backgroundColor: "#DE8E0E",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 5,
  },

  text: {
    fontFamily: "OpenSansSemiBold",
    fontSize: 14,
    lineHeight: 24,
  },
});
