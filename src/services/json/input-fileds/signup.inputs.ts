import type { DynamicInputProps } from "../../../components/DynamicInput";
import type {  SignupPayload } from "../../../types/interface/auth.interface";


export const SingupInputField: Array<
  Omit<DynamicInputProps<SignupPayload>, "register" | "errors">
> = [
    {
    name: "name",
    label: "name",
    type: "text",
    required: true,
  },
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


