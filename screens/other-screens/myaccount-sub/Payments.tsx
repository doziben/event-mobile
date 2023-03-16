import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import HeadingText from "../../../components/Interface/HeadingText";
import BalanceCard from "../../../components/payments/balanceCard";
import DrawerHeader from "../../../components/DrawerHeader";

export default function Payments({ navigation, route }) {
  // const { navigation } = route?.params;

  return (
    <View style={styles.container}>
      <DrawerHeader onPressed={() => navigation.openDrawer()} />

      <ScrollView style={{ marginHorizontal: 20 }}>
        <View style={styles.header}>
          <HeadingText>Payment Info</HeadingText>
        </View>

        <BalanceCard navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
