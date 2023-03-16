import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

export type SelectButtonProps = {
  onPress?: (e: GestureResponderEvent) => void;
};

export default function SelectButton({ onPress }: SelectButtonProps) {
  return (
    <TouchableOpacity style={styles.myplan} onPress={onPress}>
      <Text style={styles.myplanText}>Select</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  myplan: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#DE8E0E",
    borderRadius: 100,
    backgroundColor: "#DE8E0E",
  },

  myplanText: {
    fontFamily: "OpenSansBold",
    color: "#fff",
    fontSize: 14,
  },
});
