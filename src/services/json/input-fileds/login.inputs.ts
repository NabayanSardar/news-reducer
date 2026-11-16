import type { DynamicInputProps } from "../../../components/DynamicInput";
import type { LoginPayload } from "../../../types/interface/auth.interface";


export const LoginInputField: Array<
  Omit<DynamicInputProps<LoginPayload>, "register" | "errors">
> = [
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
  },
];


