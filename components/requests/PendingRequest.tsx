import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  GestureResponderEvent,
  Pressable,
} from "react-native";
import Modal from "react-native-modal";
import useUserCurrency from "../../hooks/custom/useUserCurrency";
import { RequestApplicationDto } from "../../types/api/requestApplicationDto";
import OptionsMenu from "../Interface/OptionsMenu";
import FooterButton from "./FooterButton";

interface ClientPendingRequestProps {
  applicants: number;
  service: string;
  onPress?: (e: GestureResponderEvent) => void;
  budget: string;
  dateAndTime: string;
  currency: string;
  onEdit: () => void;
}

interface VendorPendingRequestProps {
  service: string;
  onPress?: () => void;
  budget: string;
  dateAndTime: string;
  clientName: string;
  onEdit: () => void;
  onCancel: () => void;
}

export default function PendingRequest() {
  return <></>;
}

function Client({
  onPress,
  service,
  applicants,
  budget,
  dateAndTime,
  onEdit,
  currency,
}: ClientPendingRequestProps) {
  const hasApplicants = applicants > 0;
  const applicantsValue = hasApplicants
    ? `${applicants} applicants`
    : "Unassigned";

  const statusValue = hasApplicants ? "Pending Acceptance" : "Gig published";

  const userCurrency = currency ?? "GBP";

  return (
    <View>
      <View style={styles.requestCard}>
        <View style={styles.item}>
          <Text style={styles.serviceText}>{service}</Text>
          <View>
            <OptionsMenu
              actions={[onEdit]}
              customButton={<Feather name="more-vertical" size={24} />}
              options={["Edit Request", "Cancel"]}
            />
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.grayText}>{applicantsValue}</Text>
          <Text style={styles.grayText}>{`${userCurrency}${budget}`}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.grayText}>{dateAndTime}</Text>
          <Text style={styles.statusText}>{statusValue}</Text>
        </View>

        {hasApplicants && <FooterButton onPress={onPress}>View</FooterButton>}
      </View>
    </View>
  );
}

function Vendor({
  budget,
  dateAndTime,
  service,
  onPress,
  onEdit,
  onCancel,
  clientName,
}: VendorPendingRequestProps) {
  const statusValue = "Pending Acceptance";
  const userCurrency = useUserCurrency();

  return (
    <View>
      <View style={styles.requestCard}>
        <View style={styles.item}>
          <Text style={styles.serviceText}>{service}</Text>

          <View>
            <OptionsMenu
              actions={[onEdit, onPress, onCancel]}
              customButton={<Feather name="more-vertical" size={24} />}
              destructiveIndex={3}
              options={[
                "Edit Application",
                "View Client Profile",
                "Delete Application",
                "Cancel",
              ]}
            />
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.grayText}>{clientName}</Text>
          <Text style={styles.grayText}>{`${userCurrency}${budget}`}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.grayText}>{dateAndTime}</Text>
          <Text style={styles.statusText}>{statusValue}</Text>
        </View>
      </View>
    </View>
  );
}

PendingRequest.Client = Client;
PendingRequest.Vendor = Vendor;

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
    justifyContent: "space-between",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.5,
  },
  statusText: {
    color: "#DE8E0E",
    fontFamily: "OpenSansSemiBold",
    fontSize: 12,
    lineHeight: 24,
  },
});
