import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, View } from "react-native";
import useUserCurrency from "../../hooks/custom/useUserCurrency";

interface AddServiceInput {
  name: string;
  placeholder: string;
  onChangeText: (text: string) => void;
}

export default function AddServiceInput(props: AddServiceInput) {
  const userCurrency = useUserCurrency();
  return (
    <View style={{ marginBottom: 20 }}>
      <View
        style={{ marginBottom: 5, flexDirection: "row", alignItems: "center" }}
      >
        <Text style={styles.nameText}>{props.name}</Text>
        <Ionicons
          style={{ marginLeft: 4, alignSelf: "flex-end" }}
          name="help-circle"
          size={14}
          color="#343434"
        />
      </View>

      <View style={styles.inputWrapper}>
        <View style={styles.currencyWrapper}>
          <Text style={styles.currency}>{userCurrency}</Text>
        </View>

        <TextInput
          style={styles.textInput}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          keyboardType={"number-pad"}
          maxLength={6}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nameText: {
    fontFamily: "OpenSansSemiBold",
    color: "#343434",
    fontSize: 12,
  },
  inputWrapper: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#D2D2D2",
    backgroundColor: "#FAFAFA",
  },
  currencyWrapper: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 0.5,
    borderColor: "#D2D2D2",
  },
  currency: {
    fontFamily: "OpenSansSemiBold",
    fontSize: 14,
    color: "#767676",
  },
  textInput: {
    flex: 2,
    paddingLeft: 5,
    fontFamily: "OpenSansSemiBold",
    fontSize: 14,
    color: "#767676",
  },
});
