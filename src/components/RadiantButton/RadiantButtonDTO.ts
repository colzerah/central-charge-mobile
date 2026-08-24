import * as icons from "lucide-react-native/icons";

export interface ButtonProps {
  onPress?: () => void;
  isLoading?: boolean;
  title?: string;
  w?: number;
  iconName?: keyof typeof icons;
  rightIcon?: boolean;
  leftIcon?: boolean;
  disabled?: boolean;
}
