import { useState } from "react";
import DropDownPicker from "./modules/picker/components/Picker";

export default function TestPicker() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState([
    { label: "Haha", value: "haha" },
    { label: "Haha", value: "haha" },
    { label: "Haha", value: "haha" },
    { label: "Haha", value: "haha" },
    { label: "Haha", value: "haha" },
    { label: "Haha", value: "haha" },
    { label: "Haha", value: "haha" },
    { label: "Haha", value: "haha" },
  ]);

  return (
    <DropDownPicker
      modalTitle={undefined}
      testID={undefined}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen as VoidFunction}
      setValue={setValue}
      setItems={setItems as VoidFunction}
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
    />
  );
}
