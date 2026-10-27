import * as icons from "lucide-react-native/icons";

export interface CardInfoProps {
  description: string;
  onPress?: () => void;
  iconName: keyof typeof icons;
}
