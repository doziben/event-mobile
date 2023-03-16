export type FormComponent =
  | "TextInput"
  | "Toggle"
  | "Select"
  | "Radio"
  | "TextArea"
  | "NumberInput";

interface Field {
  name: string;
  values: string[];
  component: FormComponent;
}

export type FormDto = {
  _id: string;
  title: string;
  fields: Field[];
};
