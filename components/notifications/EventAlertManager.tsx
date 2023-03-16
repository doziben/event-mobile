//check if the authuser is vendor and constantly check whwen a new
//evemt is available in my state
//service is among ones i offer

import { ReactNode, useEffect, useState } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import useUser from "../../hooks/queries/useUser";
import useVendorServices from "../../hooks/queries/useVendorServices";
import socket from "../../socket";
import NotificationContext from "../../store/NotificationsContext";
import { NotificationsDataObj } from "../../types/api/NotificationsDataObj";
import ModalHeader from "../modals/ModalHeader";
import ModalWrapper from "../modals/ModalWrapper";
import Notification from "./Notification";

type Props = {
  children: ReactNode;
};

const initialData: NotificationsDataObj = {
  message: "",
  title: "",
  type: "order-active",
};

export default function EventAlertManager({ children }: Props) {
  const vendorServices = useVendorServices();
  const [hasNotification, setHasNotification] = useState(false);

  const [notifications, setNotifications] =
    useState<NotificationsDataObj>(initialData);

  const { data } = useUser();

  const isVisible = notifications.title > "";

  function closeModal() {
    setNotifications(initialData);
    setHasNotification(false);
  }

  useEffect(() => {
    if (!data) return;

    const { _id, firstName, lastName, image, userType } = data;

    socket.auth = {
      user: {
        _id,
        firstName,
        lastName,
        image,
        userType,
      },
    };
    socket.connect();

    return () => {
      socket.disconnect();
    };
  });

  socket.on("notification", (notif) => {
    if (notif?.user !== data?._id) return;
    setNotifications(notif);
    setHasNotification(true);
  });

  return (
    <NotificationContext.Provider
      value={{
        setHasNotification,
        hasNotification,
      }}
    >
      <View>
        <Modal isVisible={isVisible} onBackdropPress={closeModal}>
          <ModalWrapper>
            <ModalHeader title="New Notification" onClose={closeModal} />
            <Notification {...notifications} />
          </ModalWrapper>
        </Modal>
      </View>

      {children}
    </NotificationContext.Provider>
  );
}
