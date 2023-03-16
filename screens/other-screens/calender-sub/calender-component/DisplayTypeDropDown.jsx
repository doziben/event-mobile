import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function DisplayTypeDropDown(props) {
  //const months = props.months;

  return (
    <View
      style={{
        display: props.onshow,
        backgroundColor: "#fff",
        position: "absolute",
        top: 50,
        right: 10,
        zIndex: 3,
        elevation: 2,
        width: 100,
      }}
    >
      <DisplayList name="Month" onPress={() => props.onPress("Month")} />
      <DisplayList name="Week" onPress={() => props.onPress("Week")} />
    </View>
  );
}

function DisplayList(props) {
  return (
    <View style={{ borderBottomWidth: 1, borderColor: "#E5E5E5" }}>
      <TouchableOpacity style={styles.selectMonth} onPress={props.onPress}>
        <Text style={{ fontFamily: "OpenSansRegular", fontSize: 14 }}>
          {props.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  selectMonth: {
    padding: 20,
    justifyContent: "center",
  },
});
