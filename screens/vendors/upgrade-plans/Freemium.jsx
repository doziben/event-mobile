import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import Items from "./upgrade-components/Item";
import CurrentPlan from "./upgrade-components/CurrentPlan";
import SelectButton from "../../../components/payments/SelectButton";
import useUser from "../../../hooks/queries/useUser";
import FormToggle from "../../../components/Interface/FormToggle";

export default function Freemium() {
  const { data: userData } = useUser();
  const currentPlan = userData?.plan;

  const [annually, setAnnally] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <View style={styles.header}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "MontserratBold",
                lineHeight: 24,
              }}
            >
              Freemium
            </Text>
            <Text style={styles.linkText}>Free Forever</Text>
          </View>
        </View>
      </View>

      <View style={styles.planDetails}>
        <Text style={styles.text}>What's included:</Text>
        <ScrollView>
          <Items text="20% Commission" />
          <Items text="No staff" />
          <Items text="One Location at a time" />
          <Items text="One Service type" />
        </ScrollView>
      </View>

      {/* curent type should be rendered conditionaly, you know what to do Denning */}
      <View style={styles.currentType}>
        {currentPlan === "freemium" ? <CurrentPlan /> : <SelectButton />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  topWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  planDetails: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text: {
    fontSize: 14,
    fontFamily: "OpenSansSemiBold",
    lineHeight: 24,
    marginBottom: 10,
  },

  currentType: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#E5E5E5",
  },

  linkText: {
    color: "#DE8E0E",
    fontSize: 14,
    fontFamily: "OpenSansRegular",
    lineHeight: 24,
  },
});
