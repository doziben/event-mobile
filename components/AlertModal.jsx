import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AuthContext } from "../store/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { PendingActionsContext } from "../store/PendingActionsContaxt";
import PendingActions from "./PendingActions";

export default function AlertModal() {
  const { userState } = useContext(AuthContext);

  const { pendingActions, isModalVisible, setModalVisible } = useContext(
    PendingActionsContext
  );

  const hasPendingActions = pendingActions.some(
    (v) => v?.status !== "complete"
  );

  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  function onAddService() {
    toggleModal();
    navigation.navigate("Home");
  }

  return userState === "vendor" && hasPendingActions ? (
    <View style={styles.container}>
      <PendingActions
        onAddService={onAddService}
        isModalVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onClosePress={() => setModalVisible(false)}
      />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Ionicons
          style={{ marginRight: 10 }}
          name="information-circle-outline"
          size={24}
          color="#F98600"
        />
        <Text
          style={{
            color: "#fff",
            fontFamily: "OpenSansSemiBold",
            fontSize: 14,
            lineHeight: 24,
          }}
        >
          Pending actions ({pendingActions.length})
        </Text>
      </View>
      <TouchableOpacity onPress={toggleModal}>
        <Text
          style={{
            color: "#F98600",
            fontFamily: "OpenSansSemiBold",
            fontSize: 14,
            lineHeight: 24,
          }}
        >
          View
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    <></>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#1a1a1a",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
