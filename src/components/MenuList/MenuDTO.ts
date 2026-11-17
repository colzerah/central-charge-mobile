import * as icons from "lucide-react-native/icons";

export interface ItemMenu {
  // Identificador fixo, usado no onPress (o label muda com o idioma)
  id: string;
  label: string;
  subLabel?: string;
  icon: keyof typeof icons;
  variant: "PRIMARY" | "SECOND" | "DANGER";
}

export interface MenuPros {
  items: ItemMenu[];
  title?: string;
  onPress: (id: string) => void;
}

export interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  danger?: boolean;
  // Linha separadora abaixo do item (todos menos o último do grupo)
  divider?: boolean;
  onPress?: () => void;
}
