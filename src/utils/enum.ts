import { FabItems } from "../components/FabGroup/FabGroupDTO";
import { ItemMenuConfig } from "../components/MenuConfig/MenuConfigDTO";
import { ItemMenu } from "../components/MenuList/MenuDTO";
import { RadioListOption } from "../components/RadioList/RadioListDTO";
import { Tabs } from "../components/TabNavigation/TabNavigationDTO";
import { AppLanguage } from "../dtos/languageDTO";
import { TFunction } from "../i18n";
import { APP_VERSION } from "./appInfo";
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

// Listas de menu: o `id` identifica o item no onPress e o texto vem do i18n
export const getMenuConta = (t: TFunction): ItemMenu[] => [
  {
    id: "VEICULO",
    label: t("menu.items.myVehicle") /* pt: "Meu veículo" */,
    subLabel: "Tesla Model 3",
    icon: "Car",
    variant: "PRIMARY",
  },
  {
    id: "PAGAMENTOS",
    label: t("menu.items.payments") /* pt: "Pagamentos" */,
    subLabel: "Visa •••• 4242",
    icon: "CreditCard",
    variant: "PRIMARY",
  },
  {
    id: "INDICACOES",
    label: t("menu.items.referrals") /* pt: "Indicações" */,
    subLabel: t("menu.items.referralsSub") /* pt: "Convide amigos" */,
    icon: "Gift",
    variant: "PRIMARY",
  },
];

export const getMenuPreferencia = (t: TFunction): ItemMenu[] => [
  {
    id: "CONFIGURACOES",
    label: t("menu.items.settings") /* pt: "Configurações" */,
    icon: "Settings",
    variant: "SECOND",
  },
];

export const getMenuSuporte = (t: TFunction): ItemMenu[] => [
  {
    id: "AJUDA",
    label: t("menu.items.helpCenter") /* pt: "Central de ajuda" */,
    icon: "LifeBuoy",
    variant: "SECOND",
  },
  {
    id: "REPORTAR_PROBLEMA",
    label: t("menu.items.reportProblem") /* pt: "Reportar problema" */,
    subLabel: t("menu.items.reportProblemSub") /* pt: "Erros ou falhas no app" */,
    icon: "Bug",
    variant: "SECOND",
  },
  {
    id: "TERMOS",
    label: t("menu.items.terms") /* pt: "Termos e privacidade" */,
    icon: "FileText",
    variant: "SECOND",
  },
  {
    id: "SOBRE",
    label: t("menu.items.about") /* pt: "Sobre o app" */,
    subLabel: t("common.version", { version: APP_VERSION }) /* pt: "Versão {{version}}" */,
    icon: "Info",
    variant: "SECOND",
  },
];

export const getMenuSessao = (t: TFunction): ItemMenu[] => [
  {
    id: "SAIR",
    label: t("menu.items.signOut") /* pt: "Sair da conta" */,
    icon: "LogOut",
    variant: "DANGER",
  },
  {
    id: "EXCLUIR_CONTA",
    label: t("menu.items.deleteAccount") /* pt: "Excluir conta" */,
    icon: "Trash2",
    variant: "DANGER",
  },
];

export const getMenuConfigPermissoes = (t: TFunction): ItemMenuConfig[] => [
  {
    title: t("settings.location") /* pt: "Localização" */,
    label: "LOCALIZACAO",
    subLabel: t("settings.locationSub") /* pt: "Encontrar estações perto de você" */,
    icon: "MapPin",
    color: "#3B82F6",
    type: "switch",
  },
  {
    title: t("settings.camera") /* pt: "Câmera" */,
    label: "CAMERA",
    subLabel: t("settings.cameraSub") /* pt: "Tirar foto do seu veículo" */,
    icon: "Camera",
    color: "#F97316",
    type: "switch",
  },
  {
    title: t("settings.notifications") /* pt: "Notificações" */,
    label: "NOTIFICACOES",
    subLabel: t("settings.notificationsSub") /* pt: "Avisos de recargas e pagamentos" */,
    icon: "Bell",
    color: "#F59E0B",
    type: "switch",
  },
];

export const getMenuConfigPreferencias = (
  t: TFunction,
  languageLabel: string,
): ItemMenuConfig[] => [
  {
    title: t("settings.language") /* pt: "Idioma" */,
    label: "IDIOMA",
    subLabel: languageLabel,
    icon: "Globe",
    color: C.success,
    type: "button",
  },
  {
    title: t("settings.theme") /* pt: "Tema" */,
    label: "TEMA",
    subLabel: t("settings.themeDark") /* pt: "Escuro" */,
    icon: "Moon",
    color: C.ink400,
    type: "switch",
  },
];

export const getStationProblemTypes = (
  t: TFunction,
): ReportTypeOption<StationProblemType>[] => [
  { value: "DEFEITO", label: t("report.station.types.DEFEITO") /* pt: "Carregador com defeito" */, icon: "PlugZap" },
  { value: "OCUPADA", label: t("report.station.types.OCUPADA") /* pt: "Vaga ocupada ou bloqueada" */, icon: "Car" },
  { value: "CONECTOR", label: t("report.station.types.CONECTOR") /* pt: "Conector incompatível" */, icon: "Cable" },
  {
    value: "PAGAMENTO",
    label: t("report.station.types.PAGAMENTO") /* pt: "Problema no pagamento" */,
    icon: "CreditCard",
  },
  { value: "OUTRO", label: t("report.station.types.OUTRO") /* pt: "Outro" */, icon: "CircleEllipsis" },
];

export const getAppProblemTypes = (
  t: TFunction,
): ReportTypeOption<AppProblemType>[] => [
  { value: "ERRO", label: t("report.app.types.ERRO") /* pt: "Erro ou travamento" */, icon: "Bug" },
  { value: "NAO_FUNCIONA", label: t("report.app.types.NAO_FUNCIONA") /* pt: "Algo não funciona" */, icon: "CircleX" },
  { value: "LENTIDAO", label: t("report.app.types.LENTIDAO") /* pt: "App lento" */, icon: "Hourglass" },
  { value: "CONTA", label: t("report.app.types.CONTA") /* pt: "Conta ou login" */, icon: "UserRound" },
  { value: "OUTRO", label: t("report.app.types.OUTRO") /* pt: "Outro" */, icon: "CircleEllipsis" },
];

// Nome do idioma no próprio idioma (fixo, para quem não lê o idioma atual)
export const LANGUAGE_NATIVE_NAMES: Record<AppLanguage, string> = {
  "pt-BR": "Português",
  "pt-PT": "Português",
  "en-US": "English",
  "zh-CN": "中文",
  "ru-RU": "Русский",
};

// Todas as opções no mesmo padrão:
//   Português (pt-BR)      ← nome nativo + código
//   Português (Brasil)     ← nome completo no idioma atual do app
export const getLanguages = (t: TFunction): RadioListOption<AppLanguage>[] =>
  (Object.keys(LANGUAGE_NATIVE_NAMES) as AppLanguage[]).map((value) => ({
    value,
    label: `${LANGUAGE_NATIVE_NAMES[value]} (${value})`,
    description: t(`language.names.${value}`) /* pt: language.names.* → "Português (Brasil)", "Português (Portugal)", "Inglês (Estados Unidos)", … */,
  }));

export const getNotificationTabItems = (t: TFunction): Tabs[] => [
  { value: "RECARGAS", label: t("recharges.title") /* pt: "Recargas" */, icon: "Zap" },
  { value: "NOTIFICACOES", label: t("notifications.title") /* pt: "Notificações" */, icon: "Bell" },
];

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
