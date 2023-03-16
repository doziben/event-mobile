import { ImageBackground, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import getTimeString from "../../utils/GetTimeString";
import HeadingText from "../Interface/HeadingText";
import TextButton from "../Interface/TextButton";
import SummaryItem from "../requests/SummaryItem";
import ModalHeader from "./ModalHeader";
import ModalWrapper from "./ModalWrapper";

interface CalendarEventModalProps {
  isVisible: boolean;
  onClose: () => void;
  eventname: string;
  date: string;
  location: string;
  description?: string;
  _id?: string;
  startTime?: number;
  endTime?: number;
  isTimed: boolean;
}

export default function CalendarEventModal({
  isVisible,
  onClose,
  eventname,
  date,
  location,
  description,
  _id,
  endTime,
  startTime,
  isTimed,
}: CalendarEventModalProps) {
  const eventDate = new Date(date).toDateString();
  const eventTime = isTimed
    ? `${getTimeString({ date: new Date(startTime) })} - ${getTimeString({
        date: new Date(endTime),
      })}`
    : "";

  function cancelEvent() {}

  return (
    <View>
      <Modal isVisible={isVisible} onBackdropPress={onClose}>
        <ModalWrapper>
          <ModalHeader title="View Event" onClose={onClose} />
          <ImageBackground style={styles.img} source={{ uri: "" }}>
            <Text style={styles.categoryName}>{eventname}</Text>
          </ImageBackground>

          <View style={styles.header}>
            <HeadingText lg> Event Details</HeadingText>
            <TextButton title="Cancel Event" onPress={cancelEvent} />
          </View>

          <SummaryItem
            label="Date"
            value={`${eventDate} ${eventTime}`}
            hideEdit
          />
          <SummaryItem label="Location" value={location} hideEdit />
          <SummaryItem label="Description" value={description} hideEdit />
        </ModalWrapper>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 128,
    width: "100%",
    backgroundColor: "black",
    justifyContent: "center",
  },
  categoryName: {
    fontFamily: "OpenSansBold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    marginVertical: 20,
  },
});
