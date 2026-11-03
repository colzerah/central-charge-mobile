import * as icons from "lucide-react-native/icons";
export interface AvatarProps {
  name: string;
  size?: "sm" | "md";
  icon: keyof typeof icons;
  iconSize?: number;
  iconColor?: string;
  palette?: string[];
}
