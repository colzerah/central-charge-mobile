import * as icons from "lucide-react-native/icons";

export interface IconBackgroundProps {
  size?: "sm" | "md" | "lg";
  icon: keyof typeof icons;
  backgroundColor?: string;
  iconColor?: string;
  square?: boolean;
}
