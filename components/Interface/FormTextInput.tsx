import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from "react-native";

interface FormTextInputProps {
  label: string;
  placeholder: string;
  onChangeText?: (text: string) => void;
  value?: string;
  //** For extra input element options */
  extraInputOptions?: TextInputProps;
  //** Extra styles for the wrapping container view */
  extraStyles?: StyleProp<ViewStyle>;
  hasTag?: boolean;
  tag?: string;
}

export default function FormTextInput({
  label,
  onChangeText,
  placeholder,
  extraInputOptions,
  value,
  extraStyles,
  hasTag,
  tag,
}: FormTextInputProps) {
  return (
    <View style={[styles.container, extraStyles]}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* TextBox */}
      <View style={styles.textBox}>
        {hasTag && (
          <View style={styles.tagWrapper}>
            <Text style={styles.bodyText}>{tag}</Text>
          </View>
        )}
        <TextInput
          value={value}
          style={styles.textInput}
          placeholder={placeholder}
          onChangeText={onChangeText}
          {...extraInputOptions}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: {
    fontFamily: "OpenSansSemiBold",
    color: "#343434",
    fontSize: 12,
    marginBottom: 5,
  },
  textBox: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#D2D2D2",
    backgroundColor: "#FAFAFA",
    alignItems: "center",
  },
  tagWrapper: {
    borderRightWidth: 0.5,
    borderColor: "#D2D2D2",
    paddingHorizontal: 12,
  },
  bodyText: {
    fontFamily: "OpenSansSemiBold",
    fontSize: 14,
    color: "#767676",
  },
  textInput: {
    flex: 2,
    padding: 14,
    fontFamily: "OpenSansSemiBold",
    fontSize: 14,
    color: "#767676",
  },
});
