import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import useUpdateUser from "../../hooks/mutations/useUpdateUser";
import useUser from "../../hooks/queries/useUser";
import { AuthContext } from "../../store/AuthContext";
import LoadingComp from "../Interface/LoadingComp";

export default function HolidayMode() {
  const { isLoading, mutate } = useUpdateUser();
  const { data, refetch } = useUser();

  const isEnabled = data?.holidayMood;

  const toggleSwitch = () => {
    mutate(
      {
        holidayMood: !isEnabled,
      },
      {
        onSuccess: () => {
          alert(!isEnabled ? "Holiday Mode set!" : "Holiday Mode turned off!");
          refetch();
        },
        onError: (e: any) => alert(e?.response?.data?.message),
      }
    );
  };
  const { userState } = useContext(AuthContext);
  const isVendor = userState === "vendor";

  return isVendor ? (
    <View style={styles.holidayMode}>
      {isLoading && <LoadingComp />}
      <View style={styles.wrapper}>
        <Text style={{ fontFamily: "OpenSansSemiBold", fontSize: 12 }}>
          Holiday Mode
        </Text>
        <Ionicons name="help-circle" size={20} color="#52555A" />
      </View>
      <View>
        <ToggleSwitch
          isOn={isEnabled}
          onColor="#FAFAFA"
          offColor="#FAFAFA"
          size="medium"
          onToggle={toggleSwitch}
          trackOnStyle={{
            borderWidth: 1,
            borderColor: "#E5E5E5",
          }}
          trackOffStyle={{
            borderWidth: 1,
            borderColor: "#E5E5E5",
          }}
          thumbOnStyle={{
            backgroundColor: "#DE8E0E",
          }}
          thumbOffStyle={{
            backgroundColor: "grey",
          }}
        />
      </View>
    </View>
  ) : (
    <></>
  );
}

const styles = StyleSheet.create({
  holidayMode: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderColor: "#E5E5E5",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
});
