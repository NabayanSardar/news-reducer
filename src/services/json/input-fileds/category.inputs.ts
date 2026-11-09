import type { DynamicInputProps } from "../../../components/DynamicInput";
import type { CategoryPayload } from "../../../types/interface/category.interface";

export const CategoryInputField: Array<Omit<
  DynamicInputProps<CategoryPayload>,
  "register" | "errors"
>> = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: true,
  },
];
