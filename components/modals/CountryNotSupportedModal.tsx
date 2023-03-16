import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import EmptyCountry from "../../assets/illustrations/EmptyCountry";
import HeadingText from "../Interface/HeadingText";
import ModalWrapper from "./ModalWrapper";

type ModalProps = {
  onClose: () => void;
  isVisible: boolean;
  email: string;
  country: string;
};

export default function CountryNotSupportedModal({
  onClose,
  isVisible,
  country,
  email,
}: ModalProps) {
  function onPress() {
    // send email to the server under list of unsupported countries
    onClose();
  }

  return (
    <>
      <Modal isVisible={isVisible} onBackButtonPress={onClose}>
        <ModalWrapper>
          <View style={{ marginVertical: 16 }}>
            <EmptyCountry />
          </View>

          <HeadingText extraStyles={{ textAlign: "center" }}>
            Uh oh! Your country {"\n"} isn't supported yet
          </HeadingText>

          <Text
            style={{
              fontFamily: "OpenSansRegular",
              fontSize: 14,
              color: "#767676",
              textAlign: "center",
              marginVertical: 32,
            }}
          >
            Unfortunately, we don’t support signups from {country} at the
            moment. We will notify you when we start
          </Text>

          <TouchableOpacity
            style={{
              width: 148,
              borderRadius: 32,
              backgroundColor: "#000000",
              paddingVertical: 8,
              marginBottom: 16,
            }}
            onPress={onPress}
          >
            <Text
              style={{
                fontFamily: "OpenSansRegular",
                fontSize: 14,
                color: "#FFFFFF",
                textAlign: "center",
              }}
            >
              Okay, go back
            </Text>
          </TouchableOpacity>
        </ModalWrapper>
      </Modal>
    </>
  );
}
