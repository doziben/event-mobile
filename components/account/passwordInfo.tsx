import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation } from "react-query";
import api from "../../api";
import FormTextInput from "../Interface/FormTextInput";
import HeadingText from "../Interface/HeadingText";
import PressableIcon from "../Interface/PressableIcon";
import PrimaryButton from "../Interface/PrimaryButton";
import TextButton from "../Interface/TextButton";

export default function PasswordInfoEdit() {
  const [isResetting, setIsResetting] = useState(false);
  const { mutate } = useMutation(async (newPassword: string) =>
    api.post("/auth/resetpassword", {
      password: newPassword,
    })
  );
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    rePassword: "",
  });

  function toggleReset() {
    setIsResetting((prev) => !prev);
  }

  function inputHandler(where: string, value: string | number) {
    setFormData((prev) => ({ ...prev, [where]: value }));
  }

  function submitForm() {
    if (!Object.values(formData).every((v) => v > "")) {
      alert("Please fill all fields");
      return;
    }

    if (formData.newPassword !== formData.rePassword) {
      alert("Passwords do not match");
      return;
    }

    mutate(formData.newPassword, {
      onSuccess: () => {
        setIsResetting(false);
        alert("Password Changed!");
      },
      onError: (e: any) => {
        alert(e?.response?.data?.message);
      },
    });
  }

  return isResetting ? (
    <Modal animationType="slide">
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.modalHeader}>
          <View style={styles.headingWrapper}>
            <Ionicons name="lock-closed-outline" size={40} color="#DE8E0E" />
            <HeadingText extraStyles={{ marginLeft: 12 }}>
              Reset Password
            </HeadingText>
          </View>
          <PressableIcon
            icon={<Ionicons name="close-circle" size={24} />}
            onPress={toggleReset}
          />
        </View>

        {/* Body */}
        <View style={styles.form}>
          <FormTextInput
            placeholder="Enter current password"
            extraInputOptions={{ secureTextEntry: true }}
            label="Current password"
            onChangeText={(t) => inputHandler("currentPassword", t)}
          />
          <FormTextInput
            placeholder="Enter new password"
            extraInputOptions={{ secureTextEntry: true }}
            label="New password"
            onChangeText={(t) => inputHandler("newPassword", t)}
          />
          <FormTextInput
            placeholder="Re-enter new password"
            extraInputOptions={{ secureTextEntry: true }}
            label="Confirm new password"
            onChangeText={(t) => inputHandler("rePassword", t)}
          />
        </View>

        <PrimaryButton title="Reset Password" onPress={submitForm} />
      </SafeAreaView>
    </Modal>
  ) : (
    <View style={{ marginBottom: 32 }}>
      <HeadingText lg extraStyles={styles.headingText}>
        Password and Security
      </HeadingText>

      <TouchableOpacity style={styles.passwordWrapper}>
        <Ionicons name="lock-closed-outline" size={24} />
        <TextButton title="Change Password" onPress={toggleReset} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  passwordWrapper: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#D2D2D2",
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    padding: 14,
    justifyContent: "space-between",
  },
  headingText: {
    marginVertical: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderColor: "#D2D2D2",
    borderBottomWidth: 1,
  },
  headingWrapper: {
    flexDirection: "row",
  },
  form: {
    marginVertical: 32,
  },
});
