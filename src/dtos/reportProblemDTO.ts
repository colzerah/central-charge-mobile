import * as icons from "lucide-react-native/icons";

export interface ReportTypeOption<T extends string> {
  value: T;
  label: string;
  icon: keyof typeof icons;
}

// Problema em uma estação (aberto pelos detalhes da estação)
export type StationProblemType =
  | "DEFEITO"
  | "OCUPADA"
  | "CONECTOR"
  | "PAGAMENTO"
  | "OUTRO";

export interface StationReportPayload {
  stationId: number;
  stationName: string;
  type: StationProblemType;
  description: string;
}

// Problema no uso do app (aberto pelo Menu)
export type AppProblemType = "ERRO" | "NAO_FUNCIONA" | "LENTIDAO" | "CONTA" | "OUTRO";

export interface AppReportPayload {
  type: AppProblemType;
  description: string;
  appVersion: string;
  platform: string;
}
