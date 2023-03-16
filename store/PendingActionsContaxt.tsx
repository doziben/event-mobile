import { useNavigation } from "@react-navigation/native";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import useUser from "../hooks/queries/useUser";

type Props = {
  children: ReactNode;
};

type Ctx = {
  pendingActions: any[];
  isModalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  setScrollEnabled: Dispatch<SetStateAction<boolean>>;
  setTabNav?: Dispatch<SetStateAction<any>>;
  tabNav?: any;
  scrollEnabled: any;
};

export const PendingActionsContext = createContext<Ctx>({
  pendingActions: [],
  isModalVisible: false,
  setModalVisible: () => {},
  setTabNav: () => {},
  tabNav: () => {},
  scrollEnabled: true,
  setScrollEnabled: () => {},
});

export default function PendingActionsContextProvider({ children }: Props) {
  const { data } = useUser();
  const [isModalVisible, setModalVisible] = useState(false);
  const [tabNav, setTabNav] = useState(undefined);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const pendingActions = [
    {
      id: 1,
      actionTitle: "Add Services",
      actionDescription: "Let us know the service you offer",
      status: data?.services?.length >= 1 ? "complete" : "",
      onPress: () => {
        tabNav.navigate("Services");
        setModalVisible(false);
      },
    },
  ];

  return (
    <PendingActionsContext.Provider
      value={{
        pendingActions,
        isModalVisible,
        setModalVisible,
        setTabNav,
        tabNav,
        scrollEnabled,
        setScrollEnabled,
      }}
    >
      {children}
    </PendingActionsContext.Provider>
  );
}
