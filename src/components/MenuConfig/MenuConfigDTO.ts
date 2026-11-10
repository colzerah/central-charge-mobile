import * as icons from "lucide-react-native/icons";

export interface ItemMenuConfig {
  icon: keyof typeof icons;
  label: string;
  subLabel?: string;
  color?: string;
  type: "switch" | "button";
  title: string;
}

export interface MenuConfigPros {
  items: ItemMenuConfig[];
  title?: string;
  onPress?: (label: string, e?: boolean) => void;
  active: {
    [key: string]: boolean;
  };
}

export interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  onPress?: () => void;
  onToggle?: (e: boolean) => void;
  type: "switch" | "button";
  active?: boolean;
  title: string;
}
