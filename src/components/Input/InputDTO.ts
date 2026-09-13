import * as icons from "lucide-react-native/icons";
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
  variant?: "default" | "outline";
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
  textContentType?: "none" | "emailAddress" | "password";
  leftIcon?: keyof typeof icons;
  iconColor?: string;
  iconBg?: string;
}
