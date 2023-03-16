import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import useUserCurrency from "../../hooks/custom/useUserCurrency";
import { AuthContext } from "../../store/AuthContext";
import UserImage from "../Interface/UserImage";
import FooterButton from "./FooterButton";

interface PastRequestProps {
  name: string;
  image?: string;
  service: string;
  date: string;
  rate: string;
  onPress?: () => void;
  currency: string;
}

export default function PastRequest({
  date,
  name,
  rate,
  service,
  image,
  onPress,
  currency,
}: PastRequestProps) {
  const userCurrency = currency ?? "GBP";
  const { userState } = useContext(AuthContext);

  return (
    <View style={styles.requestCard}>
      {/* User Details */}
      <View style={styles.item}>
        <UserImage name={name} imgSrc={image} size="md" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.serviceText}>{service}</Text>
          <Text style={styles.grayText}>{name}</Text>
        </View>
      </View>

      {/* Others */}
      <View
        style={[
          styles.item,
          {
            justifyContent: "space-between",
          },
        ]}
      >
        <Text style={styles.grayText}>{date}</Text>
        <View>
          <Text style={styles.grayText}>{`${userCurrency}${rate}`}</Text>
          <Text style={[styles.statusText]}>Completed</Text>
        </View>
      </View>

      {userState === "client" && (
        <FooterButton color="#3E9F4D" onPress={onPress}>
          Hire Again
        </FooterButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  requestCard: {
    backgroundColor: "#fff",
    padding: 15,
    elevation: 1,
    borderRadius: 10,
    marginVertical: 12,
    flex: 1,
    shadowColor: "gray",
    shadowOffset: { height: 2, width: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  serviceText: {
    fontFamily: "OpenSansSemiBold",
    fontSize: 14,
    lineHeight: 24,
  },
  grayText: {
    color: "#767676",
    fontFamily: "OpenSansSemiBold",
    fontSize: 14,
    lineHeight: 24,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.5,
  },
  statusText: {
    fontFamily: "OpenSansSemiBold",
    fontSize: 12,
    lineHeight: 24,
    color: "#DE8E0E",
  },
});
