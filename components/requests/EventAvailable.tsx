import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import getTimeDifference from "../../utils/getTimeDifference";
import LoadingComp from "../Interface/LoadingComp";
import TextButton from "../Interface/TextButton";
import EventRequestModal from "../modals/EventRequestModal";
import GenerateQuoteModal from "../modals/GenerateQuoteModal";

interface EventAvailableProps {
  requestId: string;
  title: string;
  clientId: string;
  time: number;
  onApply: VoidFunction;
}

export default function EventAvailable({
  clientId,
  requestId,
  title,
  time,
  onApply,
}: EventAvailableProps) {
  const [genQuote, setGenQuote] = useState(false);
  const [evtModal, setEvtModal] = useState(false);
  const data = clientId as any;
  const isLoading = false;

  const clientName = data && `${data?.firstName} ${data?.lastName}`;

  function handlePress() {
    setEvtModal(true);
  }

  return (
    <>
      {/* Generate Quote Modal */}
      <GenerateQuoteModal
        requestId={requestId}
        setVisibility={setGenQuote}
        visibility={genQuote}
        onApply={onApply}
      />

      {/* Preview event modal */}
      <EventRequestModal
        isVisible={evtModal}
        requestId={requestId}
        setVisibility={setEvtModal}
        onApply={onApply}
        onGenerateQuote={() => {
          setEvtModal(false);

          setTimeout(() => {
            setGenQuote((p) => !p);
          }, 2000);
        }}
      />

      {/* Main Card */}
      <Pressable
        style={({ pressed }) => [pressed && styles.pressed]}
        onPress={!isLoading && handlePress}
      >
        <View style={styles.requestCard}>
          {isLoading ? (
            <LoadingComp />
          ) : (
            <>
              <View style={styles.header}>
                <View style={styles.title}>
                  <Feather name="zap" size={24} color={"#DE8E0E"} />
                  <Text
                    style={[styles.serviceText, { marginLeft: 12 }]}
                  >{`${title} gig available!`}</Text>
                </View>
                <Text style={styles.grayText}>
                  {getTimeDifference(new Date(time))}
                </Text>
              </View>

              <View style={styles.textWrapper}>
                <Text
                  style={styles.grayText}
                >{`${clientName} is looking for a ${title} around your area. View and apply now`}</Text>
              </View>

              <TextButton
                title="View"
                extraStyles={{ width: "100%", textAlign: "right" }}
                onPress={!isLoading && handlePress}
              />
            </>
          )}
        </View>
      </Pressable>
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
  grayText: {
    color: "#767676",
    fontFamily: "OpenSansRegular",
    fontSize: 14,
    lineHeight: 24,
  },
  pressed: {
    opacity: 0.5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  textWrapper: {
    marginHorizontal: 4,
  },
});
