import * as icons from "lucide-react-native/icons";

export interface BadgeProps {
  icon?: keyof typeof icons;
  count?: number;
}
