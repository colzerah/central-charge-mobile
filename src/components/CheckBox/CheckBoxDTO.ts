import { ColorValue } from "react-native";

export interface CheckBoxProps {
  size?: number;
  bgColor?: ColorValue;
  onPress?: (e: boolean) => void;
  borderW?: number;
  isCheck?: boolean;
  isReadOnly?: boolean;
}
