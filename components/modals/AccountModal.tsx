import { Ionicons } from "@expo/vector-icons";
import { Dispatch, SetStateAction, useContext } from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { AuthContext } from "../../store/AuthContext";
import HeadingText from "../Interface/HeadingText";
import PressableIcon from "../Interface/PressableIcon";
import TextButton from "../Interface/TextButton";
import ModalHeader from "./ModalHeader";
import ModalWrapper from "./ModalWrapper";

interface NotificationModalProps {
  visibility: boolean;
  setVisibility: Dispatch<SetStateAction<Boolean>>;
}

export default function AccountModal({
  setVisibility,
  visibility,
}: NotificationModalProps) {
  const { signOut } = useContext(AuthContext);

  return (
    <View>
      <Modal
        isVisible={visibility}
        onBackdropPress={() => setVisibility(false)}
      >
        <ModalWrapper>
          {/* Header */}
          <ModalHeader title="Me" onClose={() => setVisibility(false)} />

          {/* Container */}
          <View style={styles.container}>
            <TextButton title="LogOut" onPress={signOut} />
          </View>
        </ModalWrapper>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
});
