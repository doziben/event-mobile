import { Feather } from "@expo/vector-icons";
import { Alert, StyleSheet, Text, View } from "react-native";
import useUserCurrency from "../../hooks/custom/useUserCurrency";
import useDeleteOrder from "../../hooks/mutations/requests/useDeleteOrder";
import { OrdersStatus } from "../../types/api/OrdersDataObj";
import LoadingComp from "../Interface/LoadingComp";
import OptionsMenu from "../Interface/OptionsMenu";
import UserImage from "../Interface/UserImage";
import FooterButton from "./FooterButton";

interface ClientActiveRequestProps {
  status: OrdersStatus;
  isSubmit: boolean;
  vendor: { id: string; image: string; name: string };
  dateAndTime: string;
  rate: string;
  onActivate: () => void;
  onComplete: () => void;
  service: string;
  id: string;
  currency: string;
}

interface VendorActiveRequestProps {
  status: OrdersStatus;
  client: string;
  dateAndTime: string;
  rate: string;
  onActivate: () => void;
  onComplete: () => void;
  service: string;
}

export default function ActiveRequest() {
  return <></>;
}

function Client({
  dateAndTime,
  isSubmit,
  rate,
  onActivate,
  onComplete,
  status,
  vendor,
  service,
  id,
  currency,
}: ClientActiveRequestProps) {
  const needsActivation = status === "active";
  const needsCompletion = isSubmit;
  const needsAction = needsActivation || needsCompletion;
  const statusColor = status == "pending" ? "#DE8E0E" : "#3E9F4D";
  const userCurrency = currency ?? "";

  const { mutate, isLoading } = useDeleteOrder(id);

  function handlePress() {
    needsActivation && onActivate();
    needsCompletion && onComplete();
  }

  let footerButtonText = "";
  let statusValue =
    status === "pending" || status === "active"
      ? "Pending Activation"
      : "Activated";

  if (needsActivation) {
    footerButtonText = "Confirm Activation";
  } else if (needsCompletion) {
    footerButtonText = "Complete event";
  }

  function onDelete() {
    Alert.alert(
      "Delete Request?",
      "Do you want to delete this request? It will attract charges",
      [
        { text: "No, go back" },
        {
          text: "Yes, Delete",
          style: "destructive",
          onPress: () => {
            mutate(null, {
              onSuccess: () => alert("Deleted"),
              onError: (e: any) => alert(e?.response?.data?.message),
            });
          },
        },
      ]
    );
  }

  return (
    <View style={styles.requestCard}>
      {isLoading && <LoadingComp />}
      {/* Vendor Details */}
      <View style={[styles.item, { justifyContent: "space-between" }]}>
        <View style={styles.item}>
          <UserImage name={vendor.name} imgSrc={vendor?.image} size="md" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.serviceText}>{service}</Text>
            <Text style={styles.grayText}>{vendor.name}</Text>
          </View>
        </View>

        <OptionsMenu
          actions={[onDelete]}
          customButton={<Feather name="more-vertical" size={24} />}
          options={["Delete Request", "Cancel"]}
        />
      </View>

      {/* Others */}
      <View style={[styles.item, { justifyContent: "space-between" }]}>
        <Text style={styles.grayText}>{dateAndTime}</Text>
        <View>
          <Text
            style={[styles.grayText, { textAlign: "right" }]}
          >{`${userCurrency}${rate}`}</Text>
          <Text
            style={[
              styles.statusText,
              { color: statusColor, textAlign: "right" },
            ]}
          >
            {statusValue}
          </Text>
        </View>
      </View>

      {needsAction && (
        <FooterButton color="#3E9F4D" onPress={handlePress}>
          {footerButtonText}
        </FooterButton>
      )}
    </View>
  );
}

function Vendor({
  client,
  dateAndTime,
  onActivate,
  onComplete,
  rate,
  service,
  status,
}: VendorActiveRequestProps) {
  const isEventDay =
    new Date(dateAndTime).toLocaleDateString() ===
    new Date().toLocaleDateString();
  const needsActivation = status === "pending" && isEventDay;
  const needsCompletion = status === "_active";
  const needsAction = needsActivation || needsCompletion;
  const statusColor = status == "pending" ? "#DE8E0E" : "#3E9F4D";
  const userCurrency = useUserCurrency();

  function handlePress() {
    needsActivation && onActivate();
    needsCompletion && onComplete();
  }

  let footerButtonText = "";
  let statusValue =
    status === "pending" || status === "active"
      ? "Pending Activation"
      : "Activated";

  if (needsActivation) {
    footerButtonText = "Activate";
  } else if (needsCompletion) {
    footerButtonText = "Complete event";
  }

  return (
    <View style={styles.requestCard}>
      <View style={styles.item}>
        <Text style={styles.serviceText}>{service}</Text>
      </View>
      <View style={[styles.item, { justifyContent: "space-between" }]}>
        <Text style={styles.grayText}>{client ?? "Client"}</Text>
        <Text style={styles.grayText}>{`${userCurrency}${rate}`}</Text>
      </View>
      <View style={[styles.item, { justifyContent: "space-between" }]}>
        <Text style={[styles.grayText, { textAlign: "right" }]}>
          {dateAndTime}
        </Text>
        <Text
          style={[
            styles.statusText,
            { color: statusColor, textAlign: "right" },
          ]}
        >
          {statusValue}
        </Text>
      </View>

      {needsAction && (
        <FooterButton color="#3E9F4D" onPress={handlePress}>
          {footerButtonText}
        </FooterButton>
      )}
    </View>
  );
}

ActiveRequest.Client = Client;
ActiveRequest.Vendor = Vendor;

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
  },
});
