import { Dispatch, SetStateAction, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import useUpdateUser from "../../hooks/mutations/useUpdateUser";
import useUser from "../../hooks/queries/useUser";
import { currentUserDataObj } from "../../types/api/currentUserDataObj";
import FormTextInput from "../Interface/FormTextInput";
import HeadingText from "../Interface/HeadingText";
import LoadingComp from "../Interface/LoadingComp";
import PrimaryButton from "../Interface/PrimaryButton";
import TextButton from "../Interface/TextButton";

export default function PersonalInfoEdit({}) {
  const [isEditable, setIsEditable] = useState(false);
  const { isLoading, refetch, data } = useUser();
  const userData = data as currentUserDataObj;
  const { mutate, isLoading: updateLoading } = useUpdateUser(userData?._id);

  const [formData, setFormData] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName,
  });

  const formIsValid = Object.values(formData).every((item) => item > "");

  //** Handle Text change */
  function textChangeHandler(where: string, value: string | number) {
    setFormData((prev) => ({ ...prev, [where]: value }));
  }

  //* Submit form */
  function submitFormHandler() {
    if (formIsValid) {
      mutate(
        { ...userData, ...formData },
        {
          onSuccess: () => {
            alert("Profile updated successfully");
            setIsEditable(false);
          },
          onError: (error) => {
            const err = error as any;
            alert(err?.response?.data?.message);
          },
        }
      );
    } else {
      alert("Please fill in all fields");
    }
  }

  return isLoading ? (
    <LoadingComp />
  ) : (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      keyboardVerticalOffset={0}
    >
      <View style={styles.header}>
        <HeadingText lg>Profile Info</HeadingText>
        <TextButton
          title={isEditable ? "Cancel" : "Edit"}
          onPress={() => setIsEditable(!isEditable)}
        />
      </View>

      <FormTextInput
        label="First name"
        value={formData?.firstName}
        placeholder={formData?.firstName}
        extraInputOptions={{ editable: isEditable }}
        onChangeText={(e) => textChangeHandler("firstName", e)}
      />
      <FormTextInput
        label="Last name"
        value={formData?.lastName}
        placeholder={formData?.lastName}
        extraInputOptions={{ editable: isEditable }}
        onChangeText={(e) => textChangeHandler("lastName", e)}
      />

      {isEditable && (
        <PrimaryButton
          onPress={submitFormHandler}
          title="Save Changes"
          extraStyles={styles.submitButton}
          isLoading={updateLoading || isLoading}
        />
      )}
    </KeyboardAvoidingView>
  );
}

/* Phone number ===> change */
/* Email ===> change */

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
  },
  submitButton: {
    marginBottom: 20,
  },
});
