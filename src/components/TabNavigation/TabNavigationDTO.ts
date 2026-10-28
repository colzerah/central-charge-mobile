import * as icons from "lucide-react-native/icons";
import { StyleProp, ViewStyle } from "react-native";

export type Tabs = {
  value: string;
  label: string;
  icon: keyof typeof icons;
};

export interface TabNavigationProps {
  items: Tabs[];
  onPress: (e: string) => void;
  value: string;
  style?: StyleProp<ViewStyle>;
}
