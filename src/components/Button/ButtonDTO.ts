import * as icons from "lucide-react-native/icons";

export interface ButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  shadowBox?: boolean;
  w?: number;
  title: string;
  size?: "sm" | "md" | "lg";
  iconLeft?: keyof typeof icons;
  iconRight?: keyof typeof icons;
  variant?: "solid" | "link";
}
