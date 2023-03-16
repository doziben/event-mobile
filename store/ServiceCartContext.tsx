import { createContext, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

export interface ServiceData {
  name: string;
  id: string;
}

interface ServiceCartContext {
  services: ServiceData[];
  add: (service: ServiceData) => void;
  remove: (service: ServiceData) => void;
  clear: () => void;
}

export const ServiceCartContext = createContext<ServiceCartContext>({
  services: [],
  add: (service: ServiceData) => {},
  remove: (service: ServiceData) => {},
  clear: () => {},
});

export default function ServiceCartContextProvider({ children }: Props) {
  const [services, setServices] = useState<ServiceData[]>([]);

  const cartCtxValue = {
    services,
    add: (service: ServiceData) => {
      setServices((prev) => [...prev, service]);
    },
    remove: (service: ServiceData) => {
      setServices((prev) => {
        const oldArr = prev.filter((e) => e.id !== service.id);
        return [...oldArr];
      });
    },
    clear: () => setServices([]),
  };

  return (
    <ServiceCartContext.Provider value={cartCtxValue}>
      {children}
    </ServiceCartContext.Provider>
  );
}
