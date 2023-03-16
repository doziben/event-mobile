import React, { useRef, useState } from "react";
import { StyleSheet, ScrollView, View, Button, Alert } from "react-native";
import EmptyUser from "../../../../assets/illustrations/EmptyUser";
import EmptyState from "../../../../components/Interface/EmptyState";
import HeadingText from "../../../../components/Interface/HeadingText";
import LoadingComp from "../../../../components/Interface/LoadingComp";
import TextButton from "../../../../components/Interface/TextButton";
import useUser from "../../../../hooks/queries/useUser";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";
import useToggle from "../../../../hooks/custom/useToggle";
import Modal from "react-native-modal";
import ModalWrapper from "../../../../components/modals/ModalWrapper";
import ModalHeader from "../../../../components/modals/ModalHeader";
import FormTextInput from "../../../../components/Interface/FormTextInput";
import PrimaryButton from "../../../../components/Interface/PrimaryButton";
import useUpdateUser from "../../../../hooks/mutations/useUpdateUser";
import YoutubePlayer from "react-native-youtube-iframe";

export function extractYoutubeId(url: string) {
  let id = "";

  if (url?.startsWith("https://youtu.be")) {
    id = url?.substring(url?.lastIndexOf("/") + 1, url?.length);
  }
  if (url?.startsWith("https://www.youtube.com")) {
    id = url?.substring(url?.indexOf("=") + 1, url?.length);
  }

  return id;
}

export default function Portfolio() {
  const { data: userData, isLoading, refetch } = useUser();
  const [modalVisible, toggleModal] = useToggle();
  const { isLoading: isAdding, mutate } = useUpdateUser();

  const portfolioUrl = userData?.portfolioUrl;
  const hasPortfolioSet = portfolioUrl?.length > 4;
  const [videoUrl, setVideoUrl] = useState(portfolioUrl ?? "");

  const urlId = extractYoutubeId(portfolioUrl);

  //for adding portfolio Video
  function addPortfolioVideo() {
    toggleModal();
  }

  //for saving new portfolio video urls
  function savePortfolioUrl() {
    mutate(
      { portfolioUrl: videoUrl },
      {
        onSuccess: () => {
          toggleModal();
          refetch();
        },
        onError: (e: any) => {
          Alert.alert("Uh-oh, an error occurred", e?.response?.data?.message);
        },
      }
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading && <LoadingComp />}

      {/* Modal for updating Portfolio Url */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={toggleModal}
        avoidKeyboard
      >
        <ModalWrapper>
          <ModalHeader title="Portfolio Video" onClose={toggleModal} />
          <View style={styles.modalContainer}>
            <FormTextInput
              label="Youtube video Url"
              placeholder="Please enter youtube url to your portfolio video"
              onChangeText={(t) => setVideoUrl(t)}
              extraInputOptions={{
                numberOfLines: 2,
                multiline: true,
                style: styles.input,
              }}
              value={videoUrl}
            />
            <PrimaryButton
              title="Save"
              onPress={savePortfolioUrl}
              isLoading={isAdding}
            />
          </View>
        </ModalWrapper>
      </Modal>

      {/* Header */}
      <View style={styles.header}>
        <HeadingText lg> Portfolio Video</HeadingText>
        <TextButton
          title={hasPortfolioSet ? "Change" : "Add +"}
          onPress={addPortfolioVideo}
        />
      </View>

      {hasPortfolioSet ? (
        <View style={styles.video}>
          <YoutubePlayer height={300} videoId={urlId} />
        </View>
      ) : (
        <EmptyState
          illustration={<EmptyUser />}
          title={`Showcase yourself with a portfolio`}
          message="You can now add portolio video to showcase your talent to clients"
        />
      )}
    </ScrollView>
  );
}

//fix scrolling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    width: "100%",
    marginTop: 16,
  },
  video: {
    marginTop: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  input: {
    minHeight: 56,
    textAlignVertical: "top",
    padding: 12,
    marginTop: 8,
  },
  modalContainer: {
    marginTop: 20,
    width: "100%",
  },
});

/* <VideoPlayer
            defaultControlsVisible
            style={{
              height: 240,
            }}
            videoProps={{
              shouldPlay: false,
              resizeMode: ResizeMode.COVER,
              source: {
                uri: "https://www.youtube.com/watch?v=pWwcVjag3lY",
              },
            }}
          /> */
