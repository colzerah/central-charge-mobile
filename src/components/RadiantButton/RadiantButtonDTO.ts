import * as icons from "lucide-react-native/icons";
import { DimensionValue } from "react-native";

export interface ButtonProps {
  onPress?: () => void;
  isLoading?: boolean;
  title?: string;
  w?: DimensionValue;
  iconName?: keyof typeof icons;
  rightIcon?: boolean;
  leftIcon?: boolean;
  disabled?: boolean;
}
