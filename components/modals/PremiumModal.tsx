import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import PremiumIllustration from "../../assets/illustrations/PremiumIllustration";
import { PremiumModalContext } from "../../store/PremiumModalContext";
import HeadingText from "../Interface/HeadingText";
import ModalWrapper from "./ModalWrapper";

interface PremiumModalProps {
  onUpgrade: () => void;
}

export default function PremiumModal({ onUpgrade }: PremiumModalProps) {
  const { isVisible, setVisibility } = useContext(PremiumModalContext);

  return (
    <View>
      <Modal isVisible={isVisible} onBackdropPress={() => setVisibility(false)}>
        <ModalWrapper>
          <View style={{ marginVertical: 16 }}>
            <PremiumIllustration />
          </View>

          <HeadingText extraStyles={{ textAlign: "center" }}>
            Upgrade to {"\n"} premium
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
            Only premium vendors are eligible to provide this service. Upgrade
            to premium to start enjoying these benefits!
          </Text>

          <TouchableOpacity
            style={{
              width: 148,
              borderRadius: 32,
              backgroundColor: "#000000",
              paddingVertical: 8,
            }}
            onPress={onUpgrade}
          >
            <Text
              style={{
                fontFamily: "OpenSansRegular",
                fontSize: 14,
                color: "#FFFFFF",
                textAlign: "center",
              }}
            >
              Upgrade
            </Text>
          </TouchableOpacity>
        </ModalWrapper>
      </Modal>
    </View>
  );
}
