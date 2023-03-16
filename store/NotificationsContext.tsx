import { createContext, Dispatch, SetStateAction } from "react";

export type NotificationContextData = {
  setHasNotification: Dispatch<SetStateAction<boolean>>;
  hasNotification: boolean;
};

const NotificationContext = createContext<NotificationContextData>({
  setHasNotification: () => {},
  hasNotification: false,
});

export default NotificationContext;
