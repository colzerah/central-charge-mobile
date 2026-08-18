import * as icons from "lucide-react-native/icons";

export interface IconProps {
  name: keyof typeof icons;
  color?: string;
  size?: number;
  strokeWidth?: number;
  fill?: string;
}
