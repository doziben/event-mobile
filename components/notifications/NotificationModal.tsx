import { Ionicons } from "@expo/vector-icons";
import { Dispatch, SetStateAction, useContext } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  Modal,
  SafeAreaView,
} from "react-native";
import EmptyNotifications from "../../assets/illustrations/EmptyNotifications";
import useNotifications from "../../hooks/queries/useNotifications";
import NotificationContext from "../../store/NotificationsContext";
import EmptyState from "../Interface/EmptyState";
import HeadingText from "../Interface/HeadingText";
import LoadingComp from "../Interface/LoadingComp";
import PressableIcon from "../Interface/PressableIcon";
import ModalWrapper from "../modals/ModalWrapper";
import Notification from "./Notification";

interface NotificationModalProps {
  visibility: boolean;
  setVisibility: Dispatch<SetStateAction<Boolean>>;
}

export default function NotificationModal({
  setVisibility,
  visibility,
}: NotificationModalProps) {
  const { data, isLoading } = useNotifications();
  const dataIsValid = Array.isArray(data) && data.length > 0;
  const { setHasNotification } = useContext(NotificationContext);

  function onClose() {
    setVisibility(false);
    setHasNotification(false);
  }

  return (
    <View>
      <Modal animationType="slide" visible={visibility}>
        <SafeAreaView style={{ marginHorizontal: 20 }}>
          {/* Header */}
          <View style={styles.header}>
            <HeadingText lg>Notifications</HeadingText>
            <PressableIcon
              icon={<Ionicons name="close-circle" size={24} />}
              onPress={onClose}
            />
          </View>

          {/* Loading */}
          {isLoading && <LoadingComp />}

          <View
            style={{
              width: "100%",
            }}
          >
            {dataIsValid ? (
              <FlatList
                data={data}
                renderItem={({ item, index }) => {
                  return <Notification {...item} />;
                }}
                keyExtractor={(item) => item?.message}
                showsVerticalScrollIndicator={false}
                style={{
                  marginBottom: "50%",
                }}
              />
            ) : (
              <EmptyState
                title="No Notifications"
                message="You don't have any notifications yet"
                illustration={<EmptyNotifications />}
              />
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomColor: "#e8e8e8",
    borderBottomWidth: 1,
    width: "100%",
  },
});
