import { ItemMenu } from "../components/MenuList/MenuDTO";

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
