import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";

//screens

import CustomerProfile from "./CustomerProfile";
import CustomerRequest from "./CustomerRequest";
import CustomerEvent from "./CustomerEvent";
import CustomerService from "./CustomerServices";
import MyAccount from "../other-screens/MyAccount";
import CalendarScreen from "../other-screens/CalendarScreen";
import Payments from "../other-screens/myaccount-sub/Payments";

const Drawer = createDrawerNavigator();

export default function Customers() {
  return (
    <Drawer.Navigator
      // initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          marginLeft: -15,
          paddingVertical: 10,
          fontFamily: "OpenSansSemiBold",
          fontSize: 14,
        },
        drawerActiveBackgroundColor: "#FDF9F3",
        drawerActiveTintColor: "#DE8E0E",
        drawerInactiveTintColor: "grey",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="CustomerServices"
        component={CustomerService}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="briefcase-outline" size={25} color={color} />
          ),
          title: "Services",
        }}
      />
      <Drawer.Screen
        name="Request"
        component={CustomerRequest}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="enter-outline" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Home"
        component={CustomerProfile}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={25} color={color} />
          ),
          title: "Yeve Social",
        }}
      />
      {/* <Drawer.Screen
        name="Events"
        component={CustomerEvent}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="trending-up-outline" size={25} color={color} />
          ),
        }}
      /> */}

      <Drawer.Screen
        name="Payments"
        component={Payments}
        options={{
          drawerIcon: ({ color }) => (
            <Feather name="dollar-sign" size={25} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Account"
        component={MyAccount}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="calendar-outline" size={25} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Image source={require("../../assets/app-media/logo.png")} />
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <MaterialIcons name="close" size={25} color="grey" />
        </TouchableOpacity>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
