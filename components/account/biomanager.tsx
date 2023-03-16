import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import useUpdateUser from "../../hooks/mutations/useUpdateUser";
import useUser from "../../hooks/queries/useUser";
import { currentUserDataObj } from "../../types/api/currentUserDataObj";
import FormTextInput from "../Interface/FormTextInput";
import LoadingComp from "../Interface/LoadingComp";
import PrimaryButton from "../Interface/PrimaryButton";
import TextButton from "../Interface/TextButton";
import ModalHeader from "../modals/ModalHeader";
import ModalWrapper from "../modals/ModalWrapper";

export default function BioManager() {
  const { data, isLoading } = useUser();
  const { mutate, isLoading: updateLoading } = useUpdateUser();
  const [isUpdatingBio, setIsUpdatingBio] = useState(false);

  const userData = data as currentUserDataObj;
  const bio = userData?.biography;
  const bioIsSet = bio > "" && bio?.length > 1;
  const modalTitle = `${bioIsSet ? "Update" : "Add a"} bio`;

  const [bioForm, setBioForm] = useState(bio);

  function ToggleUpdatetBio() {
    setIsUpdatingBio((prev) => !prev);
  }

  function updateBio() {
    if (bioForm > "" && bioForm.length > 1) {
      mutate(
        { biography: bioForm },
        {
          onSuccess: () => (
            alert("Your bio was updated succcessfully"), setIsUpdatingBio(false)
          ),
          onError: (er) => {
            const err = er as any;
            alert(err?.response?.data?.message);
          },
        }
      );
    } else {
      alert("You must add a bio before saving");
    }
  }

  return (
    <>
      {isLoading || (updateLoading && <LoadingComp />)}
      <View>
        <Modal isVisible={isUpdatingBio} onBackdropPress={ToggleUpdatetBio}>
          <ModalWrapper>
            <ModalHeader title={modalTitle} onClose={ToggleUpdatetBio} />

            {/* Container */}
            <View style={styles.container}>
              <Text style={styles.messageText}>
                Add some description about yourself to let people know more
                about you
              </Text>

              <FormTextInput
                label="Bio"
                placeholder="Tell us about you"
                onChangeText={(t) => setBioForm(t)}
                value={bioForm}
                extraInputOptions={{
                  numberOfLines: 2,
                  multiline: true,
                  style: styles.input,
                }}
              />

              <PrimaryButton
                title="Save Changes"
                onPress={updateBio}
                isLoading={updateLoading || isLoading}
              />
            </View>
          </ModalWrapper>
        </Modal>
      </View>

      {bioIsSet ? (
        <>
          <Text style={styles.bioText}> {bio}</Text>
          <TextButton
            title="Edit Bio"
            extraStyles={{ textAlign: "center" }}
            onPress={ToggleUpdatetBio}
          />
        </>
      ) : (
        <TextButton
          title="Add Bio"
          extraStyles={{ textAlign: "center" }}
          onPress={ToggleUpdatetBio}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  messageText: {
    fontFamily: "OpenSansRegular",
    color: "#767676",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    minHeight: 56,
    textAlignVertical: "top",
    padding: 12,
    marginTop: 8,
  },
  bioText: {
    textAlign: "center",
    color: "#767676",
    fontFamily: "OpenSansRegular",
    fontSize: 16,
    lineHeight: 24,
    marginHorizontal: "4%",
  },
});
