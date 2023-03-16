import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Text } from "react-native";
import { PendingActionsContext } from "../../store/PendingActionsContaxt";
import DropDownPicker from "../modules/picker/components/Picker";

interface FormDropDownItem {
  label: string;
  value: string | number;
}

export interface FormDropDownProps {
  label: string;
  options: FormDropDownItem[];
  onChangeValue: (value: string) => void;
  placeholder: string;
  defaultValue?: string;
  zIndex?: number;
  zIndexInverse?: number;
  setOptions?: Dispatch<SetStateAction<FormDropDownItem[]>>;
  rawOptions?: FormDropDownItem[];
  searchable?: boolean;
  onOpen?: VoidFunction;
  onClose?: VoidFunction;
}

export default function FormDropDown({
  options,
  onChangeValue,
  label,
  placeholder,
  defaultValue,
  zIndex,

  onClose,
  onOpen,
  rawOptions,
  setOptions,
  searchable,
  zIndexInverse,
}: FormDropDownProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue ?? null);
  const [items, setItems] = useState(Array.isArray(options) && options);

  const { setScrollEnabled: setScroll } = useContext(PendingActionsContext);

  useEffect(() => {
    setItems(options);
  }, [options]);

  useEffect(() => {
    onChangeValue(value);
  }, [value]);

  const rawItems = Array.isArray(rawOptions) ? rawOptions : null;

  return (
    <>
      <Text
        style={{
          fontFamily: "OpenSansSemiBold",
          color: "#343434",
          fontSize: 12,
          marginBottom: 5,
        }}
      >
        {label}
      </Text>

      <DropDownPicker
        zIndex={zIndex}
        onOpen={() => {
          setScroll(false);
          onOpen && onOpen();
        }}
        onClose={() => {
          setScroll(true);
          onClose && onClose();
        }}
        zIndexInverse={zIndexInverse}
        placeholder={placeholder}
        searchable={searchable}
        searchPlaceholder={placeholder}
        searchTextInputStyle={{
          borderColor: "#D2D2D2",
          backgroundColor: "#ffffff",
        }}
        textStyle={{ color: "#767676", fontFamily: "OpenSansSemiBold" }}
        style={{
          borderColor: "#D2D2D2",
          backgroundColor: "#FAFAFA",
          marginBottom: 10,
        }}
        dropDownContainerStyle={{
          borderColor: "#D2D2D2",
          backgroundColor: "#ffffff",
        }}
        selectedItemLabelStyle={{ color: "#DE8E0E" }}
        selectedItemContainerStyle={{ backgroundColor: "#FAF1E3" }}
        open={open}
        value={value}
        items={rawItems ?? items}
        setOpen={setOpen as VoidFunction}
        setValue={setValue}
        setItems={(setOptions as VoidFunction) ?? (setItems as VoidFunction)}
        modalTitle={placeholder}
        testID="item-testid"
      />
    </>
  );
}
