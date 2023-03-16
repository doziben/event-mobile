import { ReactNode } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface FooterButton {
  children: ReactNode;
  color?: string;
  onPress?: (e: GestureResponderEvent) => void;
}

export default function FooterButton({
  children,
  color,
  onPress,
}: FooterButton) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && { opacity: 0.5 }]}
    >
      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <Text style={[styles.footerButtonText, { color }]}>{children}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 8,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  footerButton: {
    padding: 8,
    width: "100%",
    borderRadius: 100,
    justifyContent: "center",
    borderColor: "#E5E5E5",
    borderWidth: 1,
  },
  footerButtonText: {
    fontFamily: "OpenSansBold",
    textAlign: "center",
    color: "#DE8E0E",
  },
});
