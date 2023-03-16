import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import HeadingText from "../Interface/HeadingText";

interface StatsContainer {
  title: string;
  value: string;
}

export default function StatsContainer({ title, value }: StatsContainer) {
  return (
    <View style={styles.statContainer}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="storefront" size={24} color="#DE8E0E" />
      </View>

      <View>
        <HeadingText lg> {value}</HeadingText>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 1,
    marginBottom: 15,
    shadowColor: "gray",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { height: 16, width: 4 },
  },
  title: {
    fontSize: 10,
    color: "grey",
    fontFamily: "OpenSansSemiBold",
    lineHeight: 18,
  },

  iconContainer: {
    width: 45,
    height: 45,
    backgroundColor: "#FDF9F3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 45,
    marginRight: 20,
  },
});
