import * as icons from "lucide-react-native/icons";

export interface ButtonIconProps {
  onPress?: () => void;
  disabled?: boolean;
  square?: boolean;
  variant?: "solid" | "outline";
  icon: keyof typeof icons;
  size?: "sm" | "md";
}
