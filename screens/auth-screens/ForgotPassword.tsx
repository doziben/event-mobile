import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useMutation } from "react-query";
import api from "../../api";
import EmailIllustration from "../../assets/illustrations/EmailIllustration";
import AuthHeader from "../../components/AuthHeader";
import FormTextInput from "../../components/Interface/FormTextInput";
import HeadingText from "../../components/Interface/HeadingText";
import PressableIcon from "../../components/Interface/PressableIcon";
import PrimaryButton from "../../components/Interface/PrimaryButton";
import ModalWrapper from "../../components/modals/ModalWrapper";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [modal, setModal] = useState(false);

  const { mutate, isLoading } = useMutation(async (email: string) =>
    api.post("/auth/forgotpassword", { email })
  );

  function handlePress() {
    if (email?.length < 6) {
      alert("Please enter your email");
      return;
    }

    mutate(email, {
      onError: (e: any) => alert(e?.response?.data?.message),
      onSuccess: () => setModal(true),
    });
  }

  return (
    <View style={styles.container}>
      {/* Modal for when submitted */}
      <Modal isVisible={modal}>
        <ModalWrapper>
          <EmailIllustration />

          <HeadingText extraStyles={{ textAlign: "center" }}>
            Password reset {"\n"} email sent!
          </HeadingText>

          <Text
            style={{
              fontFamily: "OpenSansRegular",
              fontSize: 14,
              color: "#767676",
              textAlign: "center",
              marginVertical: 12,
            }}
          >
            An email has been sent to {email} containing steps needed to reset
            your password
          </Text>

          <TouchableOpacity
            style={{
              width: 148,
              borderRadius: 32,
              backgroundColor: "#000000",
              paddingVertical: 8,
              marginVertical: 16,
            }}
            onPress={navigation.goBack}
          >
            <Text
              style={{
                fontFamily: "OpenSansRegular",
                fontSize: 14,
                color: "#FFFFFF",
                textAlign: "center",
              }}
            >
              Okay
            </Text>
          </TouchableOpacity>
        </ModalWrapper>
      </Modal>

      <AuthHeader />
      {/* Header */}
      <View style={styles.header}>
        <PressableIcon
          icon={<Feather size={24} name={"arrow-left"} />}
          onPress={navigation.goBack}
        />

        <HeadingText extraStyles={{ marginLeft: 12 }}>
          Forgot Password
        </HeadingText>
      </View>

      {/* Form */}
      <View style={{ margin: 20 }}>
        <FormTextInput
          label="Your email"
          placeholder="name@email.com"
          onChangeText={(t) => setEmail(t)}
          extraInputOptions={{
            autoCapitalize: "none",
            keyboardType: "email-address",
          }}
        />
        <PrimaryButton
          isLoading={isLoading}
          onPress={handlePress}
          title={"Continue"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});
