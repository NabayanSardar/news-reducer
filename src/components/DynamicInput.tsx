import { TextField } from "@mui/material";
import type { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";

export type FieldType = "text" | "email" | "password" | "textarea";

export interface DynamicInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: FieldType | undefined;
  rows?: number;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}




const DynamicInput = <T extends FieldValues>({
  name,
  label,
  type = "text",
  rows,
  required = false,
  register,
  errors,
}: DynamicInputProps<T>) => {
  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <TextField
      label={
        required ? (
          <>
            {label} <span style={{ color: "red" }}>*</span>
          </>
        ) : (
          label
        )
      }
      type={type === "textarea" ? "text" : type}
      fullWidth
      multiline={type === "textarea"}
      rows={type === "textarea" ? (rows ?? 4) : undefined}
      error={!!errorMessage}
      helperText={errorMessage}
      {...register(name)}
    />
  );
};

export default DynamicInput;
