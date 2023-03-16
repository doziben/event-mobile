import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { AddServiceStack } from "../../../../types/extras/AddServiceStack";
import ServicesList from "./ServiceList";
import ServicesSubList from "./ServicesSubList";
import { PendingActionsContext } from "../../../../store/PendingActionsContaxt";

const Stack = createNativeStackNavigator<AddServiceStack>();

export default function ServiceStack({ navigation }) {
  const { setTabNav } = useContext(PendingActionsContext);

  useEffect(() => {
    setTabNav(navigation);
  });

  return (
    <View style={styles.services}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="serviceList" component={ServicesList} />
        <Stack.Screen name="serviceSubList" component={ServicesSubList} />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  services: { flex: 1, backgroundColor: "#FAFAFA" },
});
