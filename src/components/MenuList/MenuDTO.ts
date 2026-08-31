import * as icons from "lucide-react-native/icons";

export interface ItemMenu {
  label: string;
  subLabel?: string;
  icon: keyof typeof icons;
  variant: "PRIMARY" | "SECOND" | "DANGER";
}

export interface MenuPros {
  items: ItemMenu[];
  title?: string;
  onPress: (label: string) => void;
}

export interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  danger?: boolean;
  onPress?: () => void;
}
