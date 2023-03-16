import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import EmptyEvents from "../../../assets/illustrations/EmptyEvents";

export default function Events() {
  return (
    <View style={styles.container}>
      <View style={styles.emptyView}>
        <EmptyEvents />
        <Text style={styles.headingText}>No Nearby Events Yet</Text>
        <Text style={styles.bodyText}>
          There are no ongoing nearby events yet
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  emptyView: {
    marginVertical: 24,
    textAlign: "center",
    alignItems: "center",
  },
  headingText: {
    marginTop: 16,
    fontFamily: "OpenSansBold",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },

  bodyText: {
    color: "#767676",
    textAlign: "center",
    fontFamily: "OpenSansSemiBold",
    fontSize: 14,
    lineHeight: 24,
  },
});
