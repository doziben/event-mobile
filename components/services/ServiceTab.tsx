import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import useUser from "../../hooks/queries/useUser";
import { ServicesListScreenProps } from "../../screens/other-screens/sub-profile-screens/sub-sub-profile/ServiceList";
import { PremiumModalContext } from "../../store/PremiumModalContext";
import TextButton from "../Interface/TextButton";
import AddServiceModal from "./AddServiceModal";

export interface ServiceTab {
  service: { name: string; id: string };
  index: number /** 0 index means service is primary */;
  baseRate: string;
}

export default function ServiceTab({
  service,
  index,
  baseRate: rate,
}: ServiceTab) {
  const { setVisibility } = useContext(PremiumModalContext);
  const { data } = useUser();
  const hasService = service.id?.length > 5;
  const isPremium = index > 0;
  const navigation = useNavigation<ServicesListScreenProps["navigation"]>();
  const serviceType = index > 0 ? "Secondary" : "Primary";

  const [modalVisible, setModalVisible] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);

  const baseRate = rate ?? "$120/2H";
  const tabTitle = hasService ? (
    service.name
  ) : (
    <>
      {`Service ${index + 1}`} <Text style={styles.plusIcon}>+</Text>{" "}
    </>
  );

  function checkPremiumPermissions() {
    return data?.plan !== "freemium";
  }

  //** For when the service is a premium one */
  function handlePremium() {
    checkPremiumPermissions()
      ? navigation.navigate("serviceList")
      : setVisibility(true);
  }

  function handleClick() {
    if (hasService) {
      setMoreOptions((prev) => !prev);
    } else {
      isPremium ? handlePremium() : navigation.navigate("serviceList");
    }
  }

  const bgColor = moreOptions ? "white" : "";
  const textColor = hasService ? "#DE8E0E" : "#767676";
  return (
    <>
      <AddServiceModal
        onClose={() => setModalVisible(false)}
        open={modalVisible}
        service={service}
      />

      <Pressable
        style={({ pressed }) => [{ width: "33%" }, pressed && styles.onPress]}
        onPress={handleClick}
      >
        <View
          style={[
            styles.container,
            index <= 1 && styles.hasBorder,
            { backgroundColor: bgColor },
          ]}
        >
          <Text style={[styles.text, { color: textColor }]}>{tabTitle}</Text>
        </View>
      </Pressable>

      {moreOptions && (
        <View style={styles.optionsContainer}>
          <View>
            <Text style={styles.subtext}>{`${serviceType} Service`}</Text>
            <Text style={styles.baseRate}>{baseRate}</Text>
          </View>
          <TextButton title="Change" onPress={() => setModalVisible(true)} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 8,
    width: "100%",
    justifyContent: "center",
    zIndex: 50,
  },
  text: {
    fontFamily: "OpenSansRegular",
  },
  plusIcon: {
    fontSize: 16,
    color: "#DE8E0E",
  },
  onPress: {
    opacity: 0.5,
  },
  baseRate: {
    fontFamily: "OpenSansRegular",
    fontSize: 16,
    color: "#000000",
  },
  subtext: {
    fontFamily: "OpenSansRegular",
    fontSize: 14,
    color: "#767676",
    marginBottom: 4,
  },
  optionsContainer: {
    marginVertical: 12,
    width: "100%",
    zIndex: 50,
    shadowColor: "gray",
    shadowOffset: { height: 2, width: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    padding: 12,
    top: "100%",
    borderRadius: 12,
  },
  hasBorder: {
    borderRightWidth: 1,
    borderRightColor: "#E5E5E5",
  },
});
