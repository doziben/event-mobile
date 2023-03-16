import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Modal from "react-native-modal";
import { PendingActionsContext } from "../store/PendingActionsContaxt";

export default function PendingActions(props) {
  const { pendingActions } = useContext(PendingActionsContext);

  return (
    <Modal
      onBackdropPress={props.onBackdropPress}
      isVisible={props.isModalVisible}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          borderRadius: 5,
          paddingHorizontal: 15,
          paddingVertical: 15,
          position: "absolute",
          width: Dimensions.get("window").width - 40,
        }}
      >
        <View>
          <View style={styles.pendingHeader}>
            <Text style={{ fontFamily: "MontserratBold", fontSize: 16 }}>
              Pending Actions
            </Text>
            <TouchableOpacity onPress={props.onClosePress}>
              <Ionicons name="close" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          {pendingActions.map((item) => {
            return (
              <Actions
                key={item.id}
                actionTitle={item.actionTitle}
                actionDescription={item.actionDescription}
                onPress={item?.onPress}
                iconName={
                  item.status == "complete"
                    ? "checkmark-circle"
                    : "chevron-forward"
                }
                iconColor={item.status == "complete" ? "#4CD964" : "#000"}
                background={item.status == "complete" ? "#FAFAFA" : "#fff"}
                isComplete={item.status == "complete"}
              />
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
}

function Actions(props) {
  return (
    <TouchableOpacity
      disabled={props.isComplete}
      onPress={props.onPress}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: "#E5E5E5",
        marginVertical: 5,
        backgroundColor: props.background,
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: "OpenSansSemiBold",
            fontSize: 14,
            lineHeight: 18,
          }}
        >
          {props.actionTitle}
        </Text>
        <Text
          style={{
            fontFamily: "OpenSansRegular",
            fontSize: 12,
            lineHeight: 18,
            color: "#8C8C8C",
          }}
        >
          {props.actionDescription}
        </Text>
      </View>
      <Ionicons name={props.iconName} size={18} color={props.iconColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pendingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#E5E5E5",
    marginVertical: 5,
  },
});
