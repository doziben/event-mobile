import { Ionicons } from "@expo/vector-icons";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import HeadingText from "../Interface/HeadingText";
import PressableIcon from "../Interface/PressableIcon";

interface ModalHeaderProps {
  title: string;
  onClose?: (e: GestureResponderEvent) => void;
  hideClose?: boolean;
  largeText?: boolean;
  extraStyles?: StyleProp<ViewStyle>;
}

export default function ModalHeader({
  title,
  hideClose,
  onClose,
  largeText,
  extraStyles,
}: ModalHeaderProps) {
  return (
    <View style={[styles.header, extraStyles]}>
      <HeadingText lg={!largeText}>{title}</HeadingText>
      {!hideClose && (
        <PressableIcon
          icon={<Ionicons name="close-circle" size={24} />}
          onPress={onClose}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomColor: "#e8e8e8",
    borderBottomWidth: 1,
    width: "100%",
  },
});
