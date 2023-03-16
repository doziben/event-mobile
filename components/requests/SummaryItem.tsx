import { Feather } from "@expo/vector-icons";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import PressableIcon from "../Interface/PressableIcon";
import TextButton from "../Interface/TextButton";

interface SummaryItemProps {
  label: string;
  value: string;
  onEdit?: (e: GestureResponderEvent) => void;
  extraLabelStyles?: StyleProp<TextStyle>;
  hideEdit?: boolean;
  hideLabel?: boolean;
}

export default function SummaryItem({
  label,
  value,
  extraLabelStyles,
  hideEdit,
  onEdit,
  hideLabel,
}: SummaryItemProps) {
  return (
    <View style={styles.container}>
      {!hideLabel && (
        <Text style={[styles.label, extraLabelStyles]}>{label}:</Text>
      )}
      <Text style={styles.valueText}>{value}</Text>
      {!hideEdit && (
        <PressableIcon
          icon={<Feather name="edit-2" color={"#DE8E0E"} size={24} />}
          onPress={onEdit}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: "#8C8C8C",
    fontFamily: "OpenSansRegular",
    width: 70,
  },
  valueText: {
    fontSize: 14,
    fontFamily: "OpenSansSemiBold",
    width: "50%",
  },
});
