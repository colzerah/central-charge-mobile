import * as icons from "lucide-react-native/icons";

type TDirection = "up" | "down" | "left" | "right";

export interface FabItems {
  iconName: keyof typeof icons;
  value: string;
  onPress?: () => void;
  // Com popover, o item abre um GooeyPopover com esse conteúdo em vez de
  // chamar o onPress
  popover?: React.ReactNode;
}

export interface FabGroupProps {
  direction?: TDirection;
  items: FabItems[];
}
