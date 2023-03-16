import { ReactNode } from "react";
import { GestureResponderEvent, Pressable, View } from "react-native";

interface PressableIconProps {
  onPress: (e: GestureResponderEvent) => void;
  icon: ReactNode;
}

export default function PressableIcon({ icon, onPress }: PressableIconProps) {
  return (
    <Pressable
      style={({ pressed }) => [pressed && { opacity: 0.5 }]}
      onPress={onPress}
    >
      <View>{icon}</View>
    </Pressable>
  );
}
