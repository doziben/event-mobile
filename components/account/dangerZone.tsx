import { Feather } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { useMutation } from "react-query";
import api from "../../api";
import useUser from "../../hooks/queries/useUser";
import { AuthContext } from "../../store/AuthContext";
import HeadingText from "../Interface/HeadingText";
import PrimaryButton from "../Interface/PrimaryButton";
import ModalWrapper from "../modals/ModalWrapper";

export default function DangerZone() {
  const [modal, setModal] = useState(false);
  const { signOut } = useContext(AuthContext);
  const { data } = useUser();

  const { isLoading, mutate } = useMutation(async () =>
    api.delete(`/users/${data?._id}`)
  );

  function closeModal() {
    setModal(false);
  }

  function deleteUser() {
    mutate(undefined, {
      onError: (e: any) => alert(e?.response?.data?.message),
      onSuccess: () => signOut(),
    });
  }

  return (
    <View style={styles.container}>
      {/* Modal to confirm */}
      <Modal isVisible={modal} onBackdropPress={closeModal}>
        <ModalWrapper>
          <Feather
            style={{ marginTop: 20 }}
            size={58}
            name={"alert-circle"}
            color={"#E3394D"}
          />

          <HeadingText extraStyles={{ marginVertical: 16 }}>
            Delete Account?
          </HeadingText>

          <Text style={styles.text}>
            Once your account has been deleted, It cannot be recovered, are you
            sure you want to proceed with this action
          </Text>

          <PrimaryButton
            onPress={deleteUser}
            title="Delete Account"
            extraStyles={[styles.button, { marginBottom: 20 }]}
            extraTextStyles={styles.buttonText}
            isLoading={isLoading}
          />
        </ModalWrapper>
      </Modal>

      {/* Main  */}
      <HeadingText extraStyles={{ marginBottom: 12 }} lg>
        Danger Zone
      </HeadingText>

      <PrimaryButton
        onPress={() => setModal(true)}
        title="Delete Account"
        extraStyles={styles.button}
        extraTextStyles={styles.buttonText}
      />

      <PrimaryButton
        onPress={signOut}
        title="LogOut"
        extraStyles={styles.logout}
        extraTextStyles={styles.logoutText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 120,
  },
  button: {
    borderColor: "#E3394D",
    borderWidth: 1,
    backgroundColor: "#FCEBED",
    marginBottom: 24,
  },
  buttonText: {
    color: "#E3394D",
  },
  text: {
    fontFamily: "OpenSansRegular",
    color: "#767676",
    marginBottom: 24,
    textAlign: "center",
  },
  logout: {
    backgroundColor: "white",
    borderColor: "#D2D2D2",
    borderWidth: 1,
  },
  logoutText: {
    color: "#000000",
  },
});
