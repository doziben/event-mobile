import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type Props = { children: ReactNode };

type PremiumModal = {
  isVisible: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
};

export const PremiumModalContext = createContext<PremiumModal>({
  isVisible: false,
  setVisibility: () => {},
});

export default function PremiumModalContextProvider({ children }: Props) {
  const [isVisible, setVisibility] = useState(false);

  return (
    <PremiumModalContext.Provider value={{ isVisible, setVisibility }}>
      {children}
    </PremiumModalContext.Provider>
  );
}
