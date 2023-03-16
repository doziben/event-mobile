import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function MonthDropDown(props) {
  const months = props.months;

  return (
    <ScrollView
      style={{
        display: props.onshow,
        backgroundColor: "#fff",
        position: "absolute",
        top: 50,
        left: 10,
        zIndex: 3,
        elevation: 2,
        width: 200,
        height: 400,
      }}
    >
      {months.map((month) => (
        <MonthList
          key={Math.random() * 99}
          name={month}
          onPress={() => props.onPress(months.indexOf(month))}
        />
      ))}
    </ScrollView>
  );
}

function MonthList(props) {
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
