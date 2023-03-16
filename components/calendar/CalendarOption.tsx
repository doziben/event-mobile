import { ReactNode } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface CalendarOptionProps {
  onPress: (e: GestureResponderEvent) => void;
  children: ReactNode;
  isActive?: boolean;
}

export default function CalendarOption({
  children,
  onPress,
  isActive,
}: CalendarOptionProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, isActive && styles.active]}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FAFAFA",
  },
  active: {
    borderWidth: 1,
    borderColor: "#DE8E0E",
  },
});
