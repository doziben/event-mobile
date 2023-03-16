import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { eventDetailsFormData } from "../components/forms/client/EventDetails";
import { OthersFormData } from "../components/forms/client/Others";
import { RehearsalFormData } from "../components/forms/client/Rehearsals";
import { ServiceCartContext, ServiceData } from "./ServiceCartContext";
import { FormDto } from "../types/api/FormDto";

interface RequestServiceContextProps {
  children: ReactNode;
}

interface formValues {
  eventDetails: eventDetailsFormData | undefined;
  rehearsals: RehearsalFormData | undefined;
  others: OthersFormData | undefined;
  otherDetails: Object;
}

interface RequestServiceContextValue {
  services: ServiceData[];
  formValues: formValues;
  updateForm: (
    name: "eventDetails" | "rehearsals" | "others" | "otherDetails",
    value: Object
  ) => void;
  formTypes: FormDto | undefined;
  setFormTypes: Dispatch<SetStateAction<FormDto | undefined>>;
}

export const RequestServiceContext = createContext<RequestServiceContextValue>({
  services: [],
  formValues: {
    eventDetails: undefined,
    rehearsals: undefined,
    others: undefined,
    otherDetails: undefined,
  },
  updateForm: (name, value) => {},
  formTypes: undefined,
  setFormTypes: () => {},
});

export default function RequestServiceContextProvider({
  children,
}: RequestServiceContextProps) {
  const cartCtx = useContext(ServiceCartContext);
  const services = cartCtx?.services;

  const [formValues, setFormValues] = useState<formValues>({
    eventDetails: undefined,
    rehearsals: undefined,
    others: undefined,
    otherDetails: undefined,
  });

  const [formTypes, setFormTypes] = useState<FormDto>(undefined);

  return (
    <RequestServiceContext.Provider
      value={{
        services,
        formValues,
        updateForm: (name, value) => {
          setFormValues((prev) => ({ ...prev, [name]: value }));
        },
        formTypes,
        setFormTypes,
      }}
    >
      {children}
    </RequestServiceContext.Provider>
  );
}
