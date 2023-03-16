import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import useUserCurrency from "../../hooks/custom/useUserCurrency";
import { VendorApplicationScreenProps } from "../../screens/customers/customerRequest/vendorApplications";
import { VendorService } from "../../types/api/currentUserDataObj";
import UserImage from "../Interface/UserImage";
import ViewQuoteModal from "../modals/ViewQuoteModal";
import FooterButton from "./FooterButton";

export interface VendorApplicationProps {
  vendorImage: string;
  vendorName: string;
  customizeRate: boolean;
  rate: number;
  requestId: string;
  applicationId: string;
  description: string;
  categoryName: string;
  vendorId: string;
  cancellation: VendorService["cancellation"];
  currency: string;
  hours: string | number;
}

export default function VendorApplication({
  requestId,
  applicationId,
  description,
  customizeRate,
  rate,
  categoryName,
  vendorImage,
  vendorName,
  vendorId,
  cancellation,
  currency,
  hours,
}: VendorApplicationProps) {
  const [quote, setQuote] = useState(false);
  const navigation =
    useNavigation<VendorApplicationScreenProps["navigation"]>();

  const vendorRate = `${currency}${rate}/${hours}h`;

  function onAccept() {
    setQuote(false);
    navigation.navigate("makePayment", {
      requestId,
      rate,
      applicationId,
      cancellation,
    });
  }

  function viewUserProfile() {
    navigation.navigate("vendorProfile", { userId: vendorId });
  }
  return (
    <>
      {/* For when the vendor has a quote */}
      <ViewQuoteModal
        description={description}
        rate={vendorRate}
        isVisible={quote}
        onAccept={onAccept}
        setVisibility={setQuote}
        vendorImage={vendorImage}
        vendorName={vendorName}
        requestId={requestId}
        applicationId={applicationId}
      />

      <View style={styles.requestCard}>
        <View style={styles.top}>
          <Pressable
            style={({ pressed }) => [pressed && { opacity: 0.5 }]}
            onPress={viewUserProfile}
          >
            <View style={styles.item}>
              <UserImage name={vendorName} imgSrc={vendorImage} size="md" />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.serviceText}>{categoryName}</Text>
                <Text style={styles.grayText}>{vendorName}</Text>
              </View>
            </View>
          </Pressable>

          <Text style={styles.grayText}>{vendorRate}</Text>
        </View>

        <FooterButton
          color={customizeRate ? "#DE8E0E" : "#3E9F4D"}
          onPress={() => {
            customizeRate ? setQuote(true) : onAccept();
          }}
        >
          {customizeRate ? "View Quote" : "Accept"}
        </FooterButton>
      </View>
    </>
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
  top: {
    justifyContent: "space-between",
    flexDirection: "row",
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
});
