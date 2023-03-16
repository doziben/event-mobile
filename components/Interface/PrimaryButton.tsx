import {
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { GestureResponderEvent } from "react-native-modal";

interface PrimaryButtonProps {
  title: string;
  onPress: (e: GestureResponderEvent) => void;
  isLoading?: boolean;
  extraStyles?: StyleProp<ViewStyle>;
  extraTextStyles?: StyleProp<TextStyle>;
}

export default function PrimaryButton({
  onPress,
  title,
  isLoading,
  extraStyles,
  extraTextStyles,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.registerButton,
        isLoading && {
          flexDirection: "row",
          justifyContent: "space-between",
        },
        extraStyles,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.registerButtonText, extraTextStyles]}>{title}</Text>
      {isLoading && <ActivityIndicator color="#ffffff" />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  registerButton: {
    backgroundColor: "#DE8E0E",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  registerButtonText: {
    color: "#fff",
    fontFamily: "OpenSansSemiBold",
    fontSize: 14,
    lineHeight: 24,
  },
});
