import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DrawerHeader from "../../components/DrawerHeader";
import ServiceStack from "./customer-services/Services";
import Upcoming from "./customer-services/Upcoming";
import { ServicesContext } from "../../store/ServicesContextProvider";
import { AppNavContext } from "../../store/AppNavContext";

const Tab = createMaterialTopTabNavigator();

export default function CustomerService({ navigation }) {
  const { tabBar } = useContext(ServicesContext);
  const { setDrawerNav } = useContext(AppNavContext);

  useEffect(() => {
    setDrawerNav(navigation);
  });

  return (
    <>
      <View style={styles.container}>
        <DrawerHeader onPressed={() => navigation.openDrawer()} />
        <View style={{ flex: 1 }}>
          <Tab.Navigator
            screenOptions={{
              tabBarIndicatorStyle: {
                backgroundColor: "#DE8E0E",
              },
              swipeEnabled: tabBar,
              tabBarStyle: {
                elevation: 0,
                borderBottomWidth: 1,
                borderColor: "#E5E5E5",
                backgroundColor: "#FAFAFA",
                display: tabBar ? "flex" : "none",
              },
              tabBarLabelStyle: {
                fontFamily: "OpenSansSemiBold",
              },
            }}
          >
            <Tab.Screen name="services" component={ServiceStack} />
            <Tab.Screen name="Upcoming" component={Upcoming} />
          </Tab.Navigator>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  requestHeader: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },

  createButton: {
    padding: 10,
    backgroundColor: "#FDF9F3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },

  search: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
});
