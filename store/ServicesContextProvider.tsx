import { createContext, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

export const ServicesContext = createContext({
  tabBar: true,
  showTabBar: () => {},
  hideTabBar: () => {},
});

export default function ServicesContextProvider({ children }: Props) {
  const [tabBar, setTabBar] = useState(true);

  return (
    <ServicesContext.Provider
      value={{
        tabBar,
        hideTabBar: () => setTabBar(false),
        showTabBar: () => setTabBar(true),
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
}
