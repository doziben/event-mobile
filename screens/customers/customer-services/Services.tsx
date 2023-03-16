import React, { createContext, useLayoutEffect, useState } from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServicesList from "./ServicesList";
import ServiceRequest from "./ServiceRequest";
import ServicesSubList from "./ServicesSubList";
import RequestServiceContextProvider from "../../../store/RequestServiceContext";
import ServiceCartContextProvider from "../../../store/ServiceCartContext";

const Stack = createNativeStackNavigator();

export default function ServiceStack({ navigation }) {
  return (
    <ServiceCartContextProvider>
      <RequestServiceContextProvider>
        <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: "#FAFAFA",
              },
            }}
          >
            <Stack.Screen name="Home" component={ServicesList} />
            <Stack.Screen name="sub" component={ServicesSubList} />
            <Stack.Screen name="serviceRequest" component={ServiceRequest} />
          </Stack.Navigator>
        </View>
      </RequestServiceContextProvider>
    </ServiceCartContextProvider>
  );
}
