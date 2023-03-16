import { ScrollView, StyleSheet } from "react-native";

export default function RecurringScreen() {
  return <ScrollView style={styles.container}></ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
