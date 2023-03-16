import React, { useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DrawerHeader from "../../components/DrawerHeader";
import AlertModal from "../../components/AlertModal";
import Profile from "../other-screens/sub-profile-screens/Profile";
import Stats from "../other-screens/sub-profile-screens/Stats";
import HeadingText from "../../components/Interface/HeadingText";
import VendorEvents from "../other-screens/sub-profile-screens/VendorEvents";
import PremiumModal from "../../components/modals/PremiumModal";
import { AppNavContext } from "../../store/AppNavContext";

const Tab = createMaterialTopTabNavigator();

export default function ProfileScreen({ navigation }) {
  const { setDrawerNav } = useContext(AppNavContext);

  useEffect(() => {
    setDrawerNav(navigation);
  });

  return (
    <View style={styles.container}>
      <DrawerHeader onPressed={() => navigation.openDrawer()} />
      <PremiumModal onUpgrade={() => navigation.navigate("Upgrade")} />

      <AlertModal />

      <View style={styles.profileHeader}>
        <HeadingText>Home</HeadingText>
        <TouchableOpacity style={styles.createButton} onPress={() => {}}>
          <Ionicons name="add-sharp" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarIndicatorStyle: {
              backgroundColor: "#DE8E0E",
            },
            tabBarStyle: {
              elevation: 0,
              borderBottomWidth: 1,
              borderColor: "#E5E5E5",
              backgroundColor: "#FAFAFA",
            },
            tabBarLabelStyle: {
              fontFamily: "OpenSansSemiBold",
            },
          }}
        >
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Stats" component={Stats} />
          <Tab.Screen name="Events" component={VendorEvents} />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  profileHeader: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  createButton: {
    padding: 10,
    backgroundColor: "#DE8E0E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  createButtonItem: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  createButtonItemText: {
    color: "#767676",
    fontFamily: "OpenSansRegular",
    fontSize: 14,
  },
});
