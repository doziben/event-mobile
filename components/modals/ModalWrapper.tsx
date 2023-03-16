import { ReactNode } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  StyleProp,
  ViewStyle,
} from "react-native";

interface ModalWrapperProps {
  children: ReactNode;
  extraStyles?: StyleProp<ViewStyle>;
}

export default function ModalWrapper({
  children,
  extraStyles,
}: ModalWrapperProps) {
  const winWidth = Dimensions.get("window")?.width;
  const width = winWidth - 40;

  return (
    <View style={[styles.container, extraStyles, { width }]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 14,
    position: "absolute",
    alignItems: "center",
    zIndex: 1000,
  },
});
