import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

interface TextButtonProps {
  title: string;
  onPress?: (e: GestureResponderEvent) => void;
  extraStyles?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

export default function TextButton({
  extraStyles,
  title,
  onPress,
  style,
}: TextButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [style, pressed && styles.pressed]}
    >
      <Text style={[styles.linkedText, extraStyles]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  linkedText: {
    color: "#DE8E0E",
    fontFamily: "OpenSansSemiBold",
  },
  pressed: {
    opacity: 0.5,
  },
});
