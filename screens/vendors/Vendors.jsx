import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

//screens
import ProfileScreen from "./ProfileScreen";
import RequestScreen from "./RequestScreen";
import MyAccount from "../other-screens/MyAccount";
import MyTeam from "./TeamScreen";
import UpgradeScreen from "./UpgradeScreen";
import MyInbox from "./InboxScreen";
import CalendarScreen from "../other-screens/CalendarScreen";
import VendorRequestStack from "./VendorRequestStack";
import TextButton from "../../components/Interface/TextButton";
import MyAccountStack from "../other-screens/MyAccountStack";
import Payments from "../other-screens/myaccount-sub/Payments";

const Drawer = createDrawerNavigator();

export default function Vendors() {
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Home"
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
          name="Home"
          component={ProfileScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="home-outline" size={25} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="My Request"
          component={VendorRequestStack}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="enter-outline" size={25} color={color} />
            ),
          }}
        />
        {/* <Drawer.Screen
        name="My Team"
        component={MyTeam}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="people-outline" size={25} color={color} />
          ),
        }}
      /> */}
        <Drawer.Screen
          name="Account"
          component={MyAccountStack}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="person-outline" size={25} color={color} />
            ),
          }}
        />
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
          name="Upgrade"
          component={UpgradeScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="trending-up-outline" size={25} color={color} />
            ),
          }}
        />
        {/* <Drawer.Screen
        name="Inbox"
        component={MyInbox}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={25} color={color} />
          ),
        }}
      /> */}
        <Drawer.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="calendar-outline" size={25} color={color} />
            ),
          }}
        />

        {/* <Drawer.Screen
          name="Webiew"
          component={({ navigation }) => {
            return (
              <SafeAreaView style={{ flex: 1 }}>
                <TextButton title="Back" onPress={navigation.goBack} />
                <WebView
                  originWhitelist={["*"]}
                  source={{ uri: "https://frolancer.com" }}
                />
              </SafeAreaView>
            );
          }}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="calendar-outline" size={25} color={color} />
            ),
          }}
        /> */}
      </Drawer.Navigator>
    </>
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
