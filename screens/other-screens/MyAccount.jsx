import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import DrawerHeader from "../../components/DrawerHeader";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AlertModal from "../../components/AlertModal";
import PersonalInfo from "./myaccount-sub/PersonalInfo";
import Payments from "./myaccount-sub/Payments";
import HeadingText from "../../components/Interface/HeadingText";
import HolidayMode from "../../components/account/holidayMode";
import PremiumModal from "../../components/modals/PremiumModal";
import { AuthContext } from "../../store/AuthContext";
import Locations from "./myaccount-sub/Locations";

const Tab = createMaterialTopTabNavigator();

export default function MyAccount({ navigation }) {
  const { userState } = useContext(AuthContext);
  const isVendor = userState === "vendor";
  return (
    <View style={styles.container}>
      <DrawerHeader onPressed={navigation.openDrawer} />
      <PremiumModal onUpgrade={() => navigation.navigate("Upgrade")} />

      <HeadingText extraStyles={styles.headingText}>Account</HeadingText>
      <HolidayMode />

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
              textTransform: "none",
              fontFamily: "OpenSansSemiBold",
              fontSize: 14,
              lineHeight: 24,
            },
          }}
        >
          <Tab.Screen name="Personal Info" component={PersonalInfo} />
          {/* <Tab.Screen
            name="Payments"
            component={Payments}
            initialParams={{ navigation: navigation }}
          /> */}
          {isVendor && <Tab.Screen name="Locations" component={Locations} />}
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  headingText: {
    marginHorizontal: 20,
    marginVertical: 12,
  },
});
