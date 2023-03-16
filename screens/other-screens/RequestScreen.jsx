import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DrawerHeader from "../../components/DrawerHeader";
import AlertModal from "../../components/AlertModal";

//sub screens
import PendingScreen from "./request-sub-screens/PendingScreen";
import ActiveScreen from "./request-sub-screens/ActiveScreen";
import PastScreen from "./request-sub-screens/PastScreen";

const Tab = createMaterialTopTabNavigator();

export default function RequestScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <DrawerHeader onPressed={() => navigation.openDrawer()} />
      <AlertModal />
      <View style={styles.requestHeader}>
        <Text
          style={{ fontSize: 24, fontFamily: "MontserratBold", lineHeight: 48 }}
        >
          My Request
        </Text>
        <TouchableOpacity style={styles.createButton}>
          <Ionicons name="options-outline" size={24} color="#DE8E0E" />
        </TouchableOpacity>
      </View>

      <View style={styles.search}>
        <Ionicons
          style={{ marginRight: 10 }}
          name="search-outline"
          size={24}
          color="grey"
        />
        <TextInput style={{ flex: 1 }} placeholder="Search for client" />
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
              textTransform: "none",
              fontFamily: "OpenSansSemiBold",
              fontSize: 14,
              lineHeight: 24,
            },
          }}
        >
          <Tab.Screen name="Pending" component={PendingScreen} />
          <Tab.Screen name="Active" component={ActiveScreen} />
          <Tab.Screen name="Past" component={PastScreen} />
        </Tab.Navigator>
      </View>
    </View>
  );
}

function Sub() {
  return (
    <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <Text>Hello</Text>
    </View>
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
