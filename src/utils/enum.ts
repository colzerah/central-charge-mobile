import { FabItems } from "../components/FabGroup/FabGroupDTO";
import { ItemMenu } from "../components/MenuList/MenuDTO";
import { Tabs } from "../components/TabNavigation/TabNavigationDTO";

export const MONTHS = [
  "JAN",
  "FEV",
  "MAR",
  "ABR",
  "MAI",
  "JUN",
  "JUL",
  "AGO",
  "SET",
  "OUT",
  "NOV",
  "DEZ",
];

export const MENU_CONTA: ItemMenu[] = [
  {
    label: "Meu veículo",
    subLabel: "Tesla Model 3",
    icon: "Car",
    variant: "PRIMARY",
  },
  {
    label: "Pagamentos",
    subLabel: "Visa •••• 4242",
    icon: "CreditCard",
    variant: "PRIMARY",
  },
  {
    label: "Indicações",
    subLabel: "Convide amigos",
    icon: "Gift",
    variant: "PRIMARY",
  },
];

export const MENU_PREFERENCIA: ItemMenu[] = [
  {
    label: "Configurações",
    icon: "Settings",
    variant: "SECOND",
  },
  {
    label: "Idioma",
    subLabel: "Português",
    icon: "Globe",
    variant: "SECOND",
  },
  {
    label: "Privacidade",
    icon: "Shield",
    variant: "SECOND",
  },
];

export const MENU_SUPORTE: ItemMenu[] = [
  {
    label: "Central de ajuda",
    icon: "ArrowLeft",
    variant: "SECOND",
  },
  {
    label: "Sair da conta",
    icon: "LogOut",
    variant: "DANGER",
  },
];

export const ENUM_WEEK = {
  MONDAY: "Segunda-feira",
  TUESDAY: "Terça-feira",
  WEDNESDAY: "Quarta-feira",
  THURSDAY: "Quinta-feira",
  FRIDAY: "Sexta-feira",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

export const NOTIFICATION_TAB_ITEM = [
  { value: "RECARGAS", label: "Recargas", icon: "Zap" },
  { value: "NOTIFICACOES", label: "Notificações", icon: "Bell" },
] as Tabs[];

export const EMPTY_ITEM_FAB_GROUP = [
  {
    iconName: "Pen",
    value: "Pen",
    onPress: () => console.log("Pen"),
  },
] as FabItems[];
