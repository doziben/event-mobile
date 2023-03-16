import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export type DisplayType = "Week" | "Month";

interface CalendarContext {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  display: DisplayType;
  setDisplay: Dispatch<SetStateAction<DisplayType>>;
}

interface ProviderProps {
  children: ReactNode;
}

export const CalendarContext = createContext<CalendarContext>({
  date: new Date(),
  setDate: () => {},
  display: "Month",
  setDisplay: () => {},
});

export default function CalendarContextProvider({ children }: ProviderProps) {
  const [date, setDate] = useState(new Date());
  const [display, setDisplay] = useState<DisplayType>("Month");

  return (
    <CalendarContext.Provider
      value={{
        date,
        setDate,
        setDisplay,
        display,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
