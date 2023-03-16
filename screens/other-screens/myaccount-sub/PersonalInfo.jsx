import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import UserAvatar from "../../../components/Interface/UserAvatar";
import PersonalInfoEdit from "../../../components/account/personalInfo";
import PasswordInfoEdit from "../../../components/account/passwordInfo";
import DangerZone from "../../../components/account/dangerZone";

export default function PersonalInfo({ navigation }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ alignItems: "center", marginVertical: 20, flex: 1 }}>
        <UserAvatar allowEdit />
      </View>

      <PersonalInfoEdit />
      <PasswordInfoEdit />
      <DangerZone />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
