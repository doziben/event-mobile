import { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native";
import ToggleSwitch from "toggle-switch-react-native";

interface FormToggleProps {
  isEnabled: boolean;
  toggleSwitch: VoidFunction;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  children?: ReactNode;
}

export default function FormToggle({
  isEnabled,
  toggleSwitch,
  label,
  labelStyle,
  children,
}: FormToggleProps) {
  return (
    <ToggleSwitch
      isOn={isEnabled}
      onColor="#FAFAFA"
      offColor="#FAFAFA"
      size="medium"
      onToggle={toggleSwitch}
      trackOnStyle={{
        borderWidth: 1,
        borderColor: "#E5E5E5",
        backgroundColor: "#DE8E0E",
      }}
      trackOffStyle={{
        borderWidth: 1,
        borderColor: "#E5E5E5",
      }}
      thumbOnStyle={{
        backgroundColor: "white",
      }}
      thumbOffStyle={{
        backgroundColor: "grey",
      }}
      {...{ label, labelStyle, children }}
    />
  );
}
