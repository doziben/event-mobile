import { Ionicons } from "@expo/vector-icons";
import {
  GestureResponderEvent,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

interface DisplayType {
  text: string;
  onPress: (e: GestureResponderEvent) => void;
}

export default function DisplayType(props: DisplayType) {
  return (
    <TouchableOpacity style={styles.displayType} onPress={props.onPress}>
      <Text style={{ fontFamily: "OpenSansSemiBold", fontSize: 16 }}>
        {props.text}
      </Text>
      <Ionicons name="chevron-down-outline" size={20} color="#DE8E0E" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  displayType: {
    flexDirection: "row",
    alignItems: "center",
  },
});
