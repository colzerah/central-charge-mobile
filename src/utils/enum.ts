import Constants from "expo-constants";
import { FabItems } from "../components/FabGroup/FabGroupDTO";
import { ItemMenuConfig } from "../components/MenuConfig/MenuConfigDTO";
import { ItemMenu } from "../components/MenuList/MenuDTO";
import { Tabs } from "../components/TabNavigation/TabNavigationDTO";
import {
  AppProblemType,
  ReportTypeOption,
  StationProblemType,
} from "../dtos/reportProblemDTO";
import { C } from "../theme";

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
];

export const MENU_SUPORTE: ItemMenu[] = [
  {
    label: "Central de ajuda",
    icon: "LifeBuoy",
    variant: "SECOND",
  },
  {
    label: "Reportar problema",
    subLabel: "Erros ou falhas no app",
    icon: "Bug",
    variant: "SECOND",
  },
  {
    label: "Termos e privacidade",
    icon: "FileText",
    variant: "SECOND",
  },
  {
    label: "Sobre o app",
    subLabel: `Versão ${Constants.expoConfig?.version ?? ""}`,
    icon: "Info",
    variant: "SECOND",
  },
];

export const MENU_SESSAO: ItemMenu[] = [
  {
    label: "Sair da conta",
    icon: "LogOut",
    variant: "DANGER",
  },
  {
    label: "Excluir conta",
    icon: "Trash2",
    variant: "DANGER",
  },
];

export const MENU_CONFIG_PERMICOES: ItemMenuConfig[] = [
  {
    title: "Localização",
    label: "LOCALIZACAO",
    subLabel: "Encontrar estações perto de você",
    icon: "MapPin",
    color: "#3B82F6",
    type: "switch",
  },
  {
    title: "Câmera",
    label: "CAMERA",
    subLabel: "Tirar foto do seu veículo",
    icon: "Camera",
    color: "#F97316",
    type: "switch",
  },
  {
    title: "Notificações",
    label: "NOTIFICACOES",
    subLabel: "Avisos de recargas e pagamentos",
    icon: "Bell",
    color: "#F59E0B",
    type: "switch",
  },
];
export const MENU_CONFIG_PREFERENCIAS: ItemMenuConfig[] = [
  {
    title: "Idioma",
    label: "IDIOMA",
    subLabel: "Português (Brasil)",
    icon: "Globe",
    color: C.success,
    type: "button",
  },
  {
    title: "Tema",
    label: "TEMA",
    subLabel: "Escuro",
    icon: "Moon",
    color: C.ink400,
    type: "switch",
  },
];

export const STATION_PROBLEM_TYPES: ReportTypeOption<StationProblemType>[] = [
  { value: "DEFEITO", label: "Carregador com defeito", icon: "PlugZap" },
  { value: "OCUPADA", label: "Vaga ocupada ou bloqueada", icon: "Car" },
  { value: "CONECTOR", label: "Conector incompatível", icon: "Cable" },
  { value: "PAGAMENTO", label: "Problema no pagamento", icon: "CreditCard" },
  { value: "OUTRO", label: "Outro", icon: "CircleEllipsis" },
];

export const APP_PROBLEM_TYPES: ReportTypeOption<AppProblemType>[] = [
  { value: "ERRO", label: "Erro ou travamento", icon: "Bug" },
  { value: "NAO_FUNCIONA", label: "Algo não funciona", icon: "CircleX" },
  { value: "LENTIDAO", label: "App lento", icon: "Hourglass" },
  { value: "CONTA", label: "Conta ou login", icon: "UserRound" },
  { value: "OUTRO", label: "Outro", icon: "CircleEllipsis" },
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

export const COLOR_PALETTE = [
  "#22C55E",
  "#3B82F6",
  "#FB923C",
  "#F59E0B",
  "#EF4444",
  "#de3163",
  "#ffbf00",
  "#e0b0ff",
  "#ff6347",
  "#40e0d0",
  "#556b2f",
  "#ffdead",
  "#006400",
  "#22C55E",
  "#3B82F6",
  "#FB923C",
  "#F59E0B",
  "#EF4444",
  "#de3163",
  "#ffbf00",
  "#e0b0ff",
  "#ff6347",
  "#40e0d0",
  "#556b2f",
  "#ffdead",
  "#006400",
];
