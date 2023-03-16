import { FontAwesome5 } from "@expo/vector-icons";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

interface PlayButtonProps {
  onPress?: (e: GestureResponderEvent) => void;
}

export default function PlayButton({ onPress }: PlayButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.playButton}>
      <FontAwesome5 name="play" size={14} color="#DE8E0E" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  playButton: {
    width: 35,
    height: 35,
    backgroundColor: "#fff",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});
