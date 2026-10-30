import * as icons from "lucide-react-native/icons";

type TDirection = "up" | "down" | "left" | "right";

export interface FabItems {
  iconName: keyof typeof icons;
  value: string;
  onPress: () => void;
}

export interface FabGroupProps {
  direction?: TDirection;
  items: FabItems[];
}
