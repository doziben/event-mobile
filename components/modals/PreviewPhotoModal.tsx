import { useEffect, useState } from "react";
import { Image, Modal, SafeAreaView, StyleSheet, View } from "react-native";
import useUpdateUser from "../../hooks/mutations/useUpdateUser";
import useUser from "../../hooks/queries/useUser";
import { currentUserDataObj } from "../../types/api/currentUserDataObj";
import PrimaryButton from "../Interface/PrimaryButton";
import ModalHeader from "./ModalHeader";
import useConvertImage from "../../hooks/custom/useConvertImage";
import useUploadFile from "../../hooks/mutations/useUploadFile";
import SuccessModal from "./SuccessModal";

interface PreviewPhotoProps {
  isVisible: boolean;
  imgUri: string;
  onComplete: () => void;
}

export default function PreviewPhotoModal({
  imgUri,
  isVisible,
  onComplete,
}: PreviewPhotoProps) {
  const user = useUser();
  const convertImg = useConvertImage(imgUri);
  const userData = user?.data as currentUserDataObj;
  const { mutate, isLoading } = useUpdateUser();
  const uploadFile = useUploadFile("current-user");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    imgUri > "" && convertImg.readData();
  }, [imgUri]);

  function completeHandler() {
    setSuccess(false);
    onComplete();
  }

  function updateImage() {
    convertImg.readData();

    convertImg.isReady &&
      uploadFile.mutate(
        {
          file: convertImg.data.res,
          fileName: "User",
          userId: userData._id,
        },
        {
          onSuccess: (d) => {
            const image = d?.response?.URL;

            mutate(
              { image },
              {
                onSuccess: (d) => {
                  setSuccess(true);
                },
                onError: (e: any) => alert(e.response?.data?.message),
              }
            );
          },
          onError: (e: any) => alert(e?.response?.data?.message),
        }
      );
  }

  return (
    <Modal visible={isVisible} animationType="slide">
      <SuccessModal
        message="You have successfully changed your profile photo!"
        setVisibility={() => {}}
        title="Upload Complete"
        visible={success}
        hideCloseButton
        CTA={<PrimaryButton title="Back Home" onPress={completeHandler} />}
      />

      <SafeAreaView>
        {/* Header */}
        <ModalHeader
          title="Preview Photo"
          extraStyles={styles.modalHeader}
          largeText
          onClose={onComplete}
        />

        {/* Container */}
        <View style={styles.container}>
          {/* Img Preview */}
          <View style={styles.wrapper}>
            <Image source={{ uri: imgUri }} style={styles.img} />
          </View>
        </View>

        <PrimaryButton
          title="Save Changes"
          onPress={isVisible && updateImage}
          isLoading={isLoading || uploadFile.isLoading}
          extraStyles={styles.button}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalHeader: {
    paddingHorizontal: 20,
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 500,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    width: 280,
    height: 280,
  },
  img: {
    width: 240,
    height: 240,
    borderRadius: 500,
  },
  container: {
    marginVertical: 32,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 20,
  },
});
