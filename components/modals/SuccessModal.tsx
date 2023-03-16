import { Ionicons } from "@expo/vector-icons";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import Modal from "react-native-modal";
import HeadingText from "../Interface/HeadingText";
import PressableIcon from "../Interface/PressableIcon";

interface SuccessModalProps {
  visible: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
  title: string;
  message: string;
  CTA?: ReactNode;
  hideCloseButton?: boolean;
}

export default function SuccessModal({
  hideCloseButton,
  message,
  setVisibility,
  title,
  visible,
  CTA,
}: SuccessModalProps) {
  const winWidth = Dimensions.get("window")?.width;
  const width = winWidth - 40;
  return (
    <View>
      <Modal
        isVisible={visible}
        style={[styles.modal]}
        onBackdropPress={() => setVisibility(false)}
      >
        <View style={[styles.container, { width }]}>
          <View style={styles.closeWrapper}>
            {!hideCloseButton && (
              <PressableIcon
                onPress={() => setVisibility(false)}
                icon={<Ionicons size={24} name="close-circle" />}
              ></PressableIcon>
            )}
          </View>
          <Ionicons name="checkmark-circle-outline" color="#65B02A" size={84} />

          <HeadingText lg extraStyles={styles.title}>
            {title}
          </HeadingText>

          <Text style={styles.messageText}>{message}</Text>

          {CTA}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {},
  closeWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 14,
    position: "absolute",
    alignItems: "center",
  },
  title: {
    marginVertical: 12,
  },
  messageText: {
    fontFamily: "OpenSansRegular",
    color: "#767676",
    marginBottom: 24,
    textAlign: "center",
  },
});
