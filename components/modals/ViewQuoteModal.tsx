import { Dispatch, SetStateAction } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import useUpdateApplication from "../../hooks/mutations/requests/useUpdateApplication";
import useServiceRequest from "../../hooks/queries/requests/useServiceRequest";
import useService from "../../hooks/queries/useService";
import HeadingText from "../Interface/HeadingText";
import LoadingComp from "../Interface/LoadingComp";
import PrimaryButton from "../Interface/PrimaryButton";
import UserImage from "../Interface/UserImage";
import ModalHeader from "./ModalHeader";
import ModalWrapper from "./ModalWrapper";

interface Props {
  requestId: string;
  vendorName: string;
  vendorImage: string;
  onAccept: () => void /* After the customer chooses to accept the quote  */;
  isVisible: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
  description: string;
  rate: string;
  applicationId: string;
}

export default function ViewQuoteModal({
  onAccept,
  requestId,
  vendorImage,
  vendorName,
  isVisible,
  setVisibility,
  description,
  rate,
  applicationId,
}: Props) {
  const { data, isLoading } = useServiceRequest(requestId);
  const { data: catData, isLoading: isCatLodaing } = useService(
    data && data?.category
  );
  const { mutate, isLoading: isRejectLoading } =
    useUpdateApplication(applicationId);

  const image = catData && catData?.media;
  const category = catData && catData?.name;

  function rejectQuote() {
    mutate("rejected", {
      onSuccess: () => (setVisibility(false), alert("Rejection successful")),
      onError: (e: any) => alert(e?.response?.data?.message),
    });
  }

  return (
    <View>
      <Modal isVisible={isVisible} onBackdropPress={() => setVisibility(false)}>
        <ModalWrapper>
          <ModalHeader
            title="Vendor Quote"
            onClose={() => setVisibility(false)}
          />

          {isLoading || (isCatLodaing && <LoadingComp />)}

          <View style={{ width: "100%" }}>
            <ImageBackground
              style={styles.img}
              source={{
                uri: `https://yeve.fra1.cdn.digitaloceanspaces.com/${image}`,
              }}
            >
              <Text style={styles.categoryName}>{category}</Text>
            </ImageBackground>

            <View style={styles.userDetails}>
              <UserImage name={vendorName} imgSrc={vendorImage} size="sm" />
              <Text style={styles.userName}>{`by ${vendorName}`}</Text>
            </View>
            <View style={styles.description}>
              <HeadingText lg>Description</HeadingText>

              <Text style={styles.text}>{description}</Text>
            </View>

            <View style={styles.description}>
              <HeadingText lg>Pricing</HeadingText>
              <Text style={styles.text}>{rate}</Text>
            </View>

            <View style={styles.buttonRow}>
              <PrimaryButton
                extraStyles={{ flex: 2, backgroundColor: "#f5f5f5" }}
                extraTextStyles={{ color: "black" }}
                title="Reject"
                onPress={rejectQuote}
              />
              <PrimaryButton
                extraStyles={{ flex: 5 }}
                title="Accept Quote"
                isLoading={isRejectLoading}
                onPress={onAccept}
              />
            </View>
          </View>
        </ModalWrapper>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 128,
    width: "100%",
    backgroundColor: "gray",
    justifyContent: "center",
  },
  categoryName: {
    fontFamily: "OpenSansBold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  userName: {
    fontFamily: "OpenSansRegular",
    fontSize: 16,
    marginLeft: 12,
  },
  userDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  description: {
    marginTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  text: {
    fontFamily: "OpenSansRegular",
    fontSize: 16,
    marginVertical: 8,
  },
});
