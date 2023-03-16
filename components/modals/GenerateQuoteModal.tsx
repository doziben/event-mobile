import { Dispatch, SetStateAction, useState } from "react";
import {
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useCreateApplication from "../../hooks/mutations/useCreateApplication";
import useService from "../../hooks/queries/useService";
import useUser from "../../hooks/queries/useUser";
import { ServiceRequestDataObj } from "../../types/api/ServiceRequestDataObj";
import ModalHeader from "./ModalHeader";
import FormTextInput from "../Interface/FormTextInput";
import PrimaryButton from "../Interface/PrimaryButton";
import LoadingComp from "../Interface/LoadingComp";
import useServiceRequest from "../../hooks/queries/requests/useServiceRequest";
import HeadingText from "../Interface/HeadingText";
import UserImage from "../Interface/UserImage";
import SuccessModal from "./SuccessModal";
import useUserCurrency from "../../hooks/custom/useUserCurrency";

interface GenerateQuoteModalProps {
  visibility: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
  requestId: string;
  onApply: VoidFunction;
}

export default function GenerateQuoteModal({
  setVisibility,
  visibility,
  requestId,
  onApply,
}: GenerateQuoteModalProps) {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const { data: userData, isLoading: isUserLoading } = useUser();
  const { data, isLoading } = useServiceRequest(requestId);
  const { mutate, isLoading: isCreateLoading } = useCreateApplication();

  const serviceRequest = data && (data as unknown as ServiceRequestDataObj);
  const { data: serviceData } = useService(serviceRequest?.category);
  const service = serviceData && serviceData;

  const userCurrency = useUserCurrency();
  const image = service?.media;
  const category = service?.name;

  const [formData, setFormData] = useState({
    rate: "",
    description: "",
  });

  function updateFormData(where: string, value: string) {
    setFormData((p) => ({ ...p, [where]: value }));
  }

  function closeModal() {
    setVisibility(false);
  }

  function sendQuote() {
    mutate(
      {
        date: new Date().getTime(),
        email: userData.email,
        rate: parseInt(formData.rate),
        serviceRequest: serviceRequest._id,
        userId: userData._id,
        description: formData.description,
        customizeRate: true,
      },
      {
        onSuccess: () => (onApply(), closeModal(), setSuccessModal(true)),
        onError: (e: any) => {
          alert(e?.response?.data?.message);
        },
      }
    );
  }

  return (
    <>
      {/* Success Modal */}
      <SuccessModal
        title="Quote Sent"
        message="Your quote has been sent to the client.
        We will notify you on the client’s approval"
        visible={successModal}
        setVisibility={setSuccessModal}
        CTA={
          <PrimaryButton
            title="Okay! Got it"
            onPress={() => setSuccessModal(false)}
          />
        }
      />

      {/* Modal for previewing */}
      <Modal animationType="slide" visible={visibility && isPreviewing}>
        <SafeAreaView style={styles.container}>
          {(isLoading || isUserLoading || isCreateLoading) && <LoadingComp />}
          <View style={styles.header}>
            <ModalHeader
              title="Preview Quote"
              onClose={() => setIsPreviewing(false)}
            />
          </View>

          <ImageBackground
            style={styles.img}
            source={{
              uri: `https://yeve.fra1.cdn.digitaloceanspaces.com/${image}`,
            }}
          >
            <Text style={styles.categoryName}>{category}</Text>
          </ImageBackground>

          <View style={styles.userDetails}>
            <UserImage
              name={userData?.firstName}
              imgSrc={userData?.image}
              size="sm"
            />
            <Text
              style={styles.userName}
            >{`${userData?.firstName} ${userData?.lastName}`}</Text>
          </View>
          <View style={styles.description}>
            <HeadingText lg>Description</HeadingText>

            <Text style={styles.text}>{formData.description}</Text>
          </View>

          <View style={styles.description}>
            <HeadingText lg>Pricing</HeadingText>
            <Text
              style={styles.text}
            >{`${userCurrency}${formData.rate}/2H`}</Text>
          </View>

          <View style={styles.buttonRow}>
            <PrimaryButton
              extraStyles={{ flex: 2, backgroundColor: "#f5f5f5" }}
              extraTextStyles={{ color: "black" }}
              title="Back"
              onPress={() => setIsPreviewing(false)}
            />
            <PrimaryButton
              extraStyles={{ flex: 5 }}
              title="Send Quote"
              isLoading={isCreateLoading}
              onPress={sendQuote}
            />
          </View>
        </SafeAreaView>
      </Modal>

      {/* Modal for Setting quote */}
      <Modal animationType="slide" visible={visibility && !isPreviewing}>
        <SafeAreaView style={styles.container}>
          {isLoading && <LoadingComp />}
          <View style={styles.header}>
            <ModalHeader title="Generate Quote" onClose={closeModal} />
          </View>

          {/* Service Preview */}
          <View>
            <Text style={styles.label}>Service</Text>
            <View style={styles.servicePreview}>
              <Image source={{ uri: image }} style={styles.image} />
              <Text style={[styles.serviceText, { marginLeft: 12 }]}>
                {category}
              </Text>
            </View>
          </View>

          {/* Description */}
          <FormTextInput
            label="Description"
            placeholder="Defend your quote..."
            onChangeText={(t) => updateFormData("description", t)}
            value={formData.description}
            extraInputOptions={{
              numberOfLines: 2,
              multiline: true,
              style: styles.input,
            }}
          />

          {/* Rate */}
          <FormTextInput
            label="How much would you want to charge?"
            onChangeText={(t) => updateFormData("rate", t)}
            hasTag
            value={formData.rate}
            tag={userCurrency}
            placeholder={"Enter rate"}
          />

          {/* Button */}
          <PrimaryButton
            onPress={() => setIsPreviewing(true)}
            title="Continue"
          />
        </SafeAreaView>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
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
  header: {
    marginVertical: 16,
  },
  servicePreview: {
    padding: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D2D2D2",
    backgroundColor: "#FAFAFA",
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  serviceText: {
    fontFamily: "OpenSansSemiBold",
    fontSize: 14,
    lineHeight: 24,
  },
  image: {
    width: 40,
    height: 32,
    borderRadius: 4,
  },
  input: {
    minHeight: 56,
    textAlignVertical: "top",
    padding: 12,
    marginTop: 8,
  },
  label: {
    fontFamily: "OpenSansSemiBold",
    color: "#343434",
    fontSize: 12,
    marginBottom: 5,
  },
  text: {
    fontFamily: "OpenSansRegular",
    fontSize: 16,
    marginVertical: 8,
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
});
