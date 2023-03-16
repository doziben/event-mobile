import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

type AppNavContext = {
  drawerNav: any;
  setDrawerNav: Dispatch<SetStateAction<any>>;
};

export const AppNavContext = createContext<AppNavContext>({
  drawerNav: undefined,
  setDrawerNav: () => {},
});

export default function AppNavContextProvider({ children }: Props) {
  const [drawerNav, setDrawerNav] = useState(undefined);

  return (
    <AppNavContext.Provider
      value={{
        drawerNav,
        setDrawerNav,
      }}
    >
      {children}
    </AppNavContext.Provider>
  );
}
