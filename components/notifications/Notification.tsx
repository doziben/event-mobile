import { Feather } from "@expo/vector-icons";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { NotificationsDataObj } from "../../types/api/NotificationsDataObj";

type NotificationProps = NotificationsDataObj;

export default function Notification({
  message,
  title,
  type,
}: NotificationProps) {
  /**
   * Switch based on type later, the type will determine the method
   * that will be called in the notifications context. E.g "VIEW" for
   * viewing orders
   */

  let icon = <></>;

  switch (type) {
    case "application-active":
      icon = <Feather name="user-plus" size={24} color={"green"} />;
      break;
    case "payment":
      icon = <Feather name="dollar-sign" size={24} color={"green"} />;
      break;
    case "order-active":
      icon = <Feather name="activity" size={24} color={"#DE8E0E"} />;
      break;
    default:
      <Feather name="at-sign" size={24} color={"#DE8E0E"} />;
  }

  return (
    <View style={styles.container}>
      {icon}

      <View style={styles.wrapper}>
        <Text style={styles.title}>{title}</Text>
        <View>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomColor: "#e8e8e8",
    borderBottomWidth: 1,
  },
  wrapper: {
    marginLeft: 8,
  },
  title: {
    fontFamily: "OpenSansSemiBold",
    fontSize: 16,
  },
  message: {
    fontFamily: "OpenSansRegular",
    fontSize: 14,
    color: "#8C8C8C",
    maxWidth: Dimensions.get("screen").width - 72,
  },
});
