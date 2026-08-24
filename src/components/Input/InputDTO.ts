import { DimensionValue } from "react-native";

export interface InputProps {
  onChange?: (text: string) => void;
  value?: string;
  w?: DimensionValue;
  label?: string;
  placeholder?: string;
  enterKeyHint?: "done" | "go" | "next" | "search" | "send";
  size?: "sm" | "md" | "lg";
  isInvalid?: boolean;
  isDisabled?: boolean;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
  textContentType?: "none" | "emailAddress" | "password";
}
