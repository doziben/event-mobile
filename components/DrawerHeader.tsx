import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";
import Menu from "../assets/svg-icons/menu";
import UserAvatar from "./Interface/UserAvatar";
import NotificationModal from "./notifications/NotificationModal";
import AccountModal from "./modals/AccountModal";
import NotificationContext from "../store/NotificationsContext";
import { AppNavContext } from "../store/AppNavContext";

interface DrawerHeader {
  onPressed: (e: GestureResponderEvent) => void;
}

export default function DrawerHeader(props: DrawerHeader) {
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [accountVisible, setAccountVisible] = useState(false);
  const { hasNotification } = useContext(NotificationContext);
  const { drawerNav } = useContext(AppNavContext);

  function toggleNotifications() {
    setNotificationVisible((prev) => !prev);
  }

  //toggle the account modal
  function toggleAccount() {
    setAccountVisible((prev) => !prev);
  }

  //when avatar is pressed
  function onPressAvatar() {
    drawerNav?.navigate("Account");
  }

  return (
    <>
      <NotificationModal
        setVisibility={setNotificationVisible}
        visibility={notificationVisible}
      />

      <AccountModal
        setVisibility={setAccountVisible}
        visibility={accountVisible}
      />

      <View style={styles.container}>
        <TouchableOpacity style={{ flex: 1 }} onPress={props.onPressed}>
          <Menu />
        </TouchableOpacity>

        <View style={styles.right}>
          {/* Notifications */}
          <TouchableOpacity style={styles.button} onPress={toggleNotifications}>
            <Ionicons name="notifications-outline" size={24} color="#1a1a1a" />
            {hasNotification && <View style={styles.dot}></View>}
          </TouchableOpacity>

          {/* User Avatar */}
          <View style={{ marginLeft: 12 }}>
            <UserAvatar small onPress={onPressAvatar} />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 20,
    paddingHorizontal: 10,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    backgroundColor: "#fff",
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
  },

  button: {
    marginLeft: 15,
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 40,
    backgroundColor: "red",
  },
});
//use constants for pading top
