import React from "react";
import { View } from "react-native";
import DrawerHeader from "../../components/DrawerHeader";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CustomerRequestStack } from "../../types/extras/CustomerRequestStackNav";
import CustomerRequests from "./CustomerRequests";
import MakePayment from "../other-screens/MakePayment";
import VendorApplications from "./customerRequest/vendorApplications";
import VendorProfile from "./customerRequest/VendorProfile";

const StackNav = createNativeStackNavigator<CustomerRequestStack>();

export default function CustomerRequest({ navigation }) {
  return (
    <>
      <View>
        <DrawerHeader onPressed={() => navigation.openDrawer()} />
      </View>
      <StackNav.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <StackNav.Screen name="requests" component={CustomerRequests} />
        <StackNav.Screen
          name="vendorApplications"
          component={VendorApplications}
        />
        <StackNav.Screen name="vendorProfile" component={VendorProfile} />
        <StackNav.Screen name="makePayment" component={MakePayment} />
      </StackNav.Navigator>
    </>
  );
}
