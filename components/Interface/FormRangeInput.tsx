import { StyleSheet, View, Text, TextInput } from "react-native";

interface FormRangeInputProps {
  label: string;
  onChangeMin?: (text: string) => void;
  onChangeMax?: (text: string) => void;
  minValue?: string;
  maxValue?: string;
  tag?: string;
  errorMessage?: string;
}

export default function FormRangeInput({
  label,
  onChangeMax,
  onChangeMin,
  maxValue,
  minValue,
  tag,
  errorMessage,
}: FormRangeInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.wrapper}>
        {/* Min */}
        <View style={styles.inputWrapper}>
          <View style={styles.tagWrapper}>
            <Text style={styles.bodyText}>{tag}</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            onChangeText={onChangeMin}
            keyboardType="number-pad"
            value={minValue}
          />
        </View>

        <Text style={styles.bodyText}>-</Text>

        {/* Max */}
        <View style={styles.inputWrapper}>
          <View style={styles.tagWrapper}>
            <Text style={styles.bodyText}>{tag}</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            onChangeText={onChangeMax}
            keyboardType="number-pad"
            value={maxValue}
          />
        </View>
      </View>

      {/* Text */}
      <Text style={styles.formText}>{errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "OpenSansSemiBold",
    color: "#343434",
    fontSize: 12,
    marginBottom: 5,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#D2D2D2",
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    width: "45%",
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
  input: {
    fontFamily: "OpenSansSemiBold",
    fontSize: 14,
    color: "#767676",
    padding: 14,
  },

  formText: {
    fontFamily: "OpenSansSemiBold",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 5,
    color: "red",
  },
});
