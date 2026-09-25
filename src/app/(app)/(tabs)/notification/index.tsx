import BackgroundGradient from "@/src/components/BackgroundGradient";
import { Tabs } from "@/src/components/TabNavigation/TabNavigationDTO";
import { C } from "@/src/theme";
import {
  AlertTriangle,
  BatteryCharging,
  Bell,
  CheckCircle,
  CreditCard,
  Gift,
} from "lucide-react-native";
import React, { useState } from "react";

import TabNavigation from "@/src/components/TabNavigation";
import Notifications from "@/src/components/Views/Notification";
import { StyleSheet, View } from "react-native";
import Recharges from "../recharges";

const MONTHS = [
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

export type NotifType =
  | "charge"
  | "alert"
  | "success"
  | "info"
  | "payment"
  | "gift";

export interface Notif {
  id: string;
  type: NotifType;
  title: string;
  message: string;
  day: string;
  month: string;
  read: boolean;
}

export const NOTIFS: Notif[] = [
  {
    id: "1",
    type: "charge",
    title: "Carregamento concluído",
    message: "Sua carga atingiu 85% na Estação Centro em 38 minutos.",
    day: "16",
    month: "08",
    read: false,
  },
  {
    id: "2",
    type: "alert",
    title: "Estação offline",
    message: "Estação Sul está temporariamente indisponível para uso.",
    day: "16",
    month: "08",
    read: false,
  },
  {
    id: "3",
    type: "payment",
    title: "Pagamento aprovado",
    message: "Cobrança de R$ 21,80 referente à última recarga confirmada.",
    day: "16",
    month: "08",
    read: false,
  },
  {
    id: "4",
    type: "info",
    title: "Nova estação disponível",
    message: "Estação Aeroporto foi inaugurada a 5,5 km de você.",
    day: "15",
    month: "08",
    read: false,
  },
  {
    id: "5",
    type: "charge",
    title: "Bateria fraca",
    message: "Sua bateria está em 18%. Encontre estações próximas agora.",
    day: "15",
    month: "08",
    read: true,
  },
  {
    id: "6",
    type: "gift",
    title: "Você ganhou 50 pontos",
    message: "Bônus por completar 5 recargas neste mês.",
    day: "14",
    month: "08",
    read: true,
  },
  {
    id: "7",
    type: "success",
    title: "Conta verificada",
    message: "Seu e-mail foi confirmado com sucesso no VoltCharge.",
    day: "14",
    month: "08",
    read: true,
  },
  {
    id: "8",
    type: "charge",
    title: "Recarga agendada",
    message: "Estação Norte reservada para amanhã às 08:00.",
    day: "13",
    month: "08",
    read: true,
  },
  {
    id: "9",
    type: "alert",
    title: "Manutenção programada",
    message: "Estação Parque estará em manutenção no dia 18/08.",
    day: "12",
    month: "08",
    read: true,
  },
  {
    id: "10",
    type: "payment",
    title: "Fatura fechada",
    message: "Sua fatura de agosto totalizou R$ 108,90.",
    day: "10",
    month: "08",
    read: true,
  },
];

export const iconForType = (type: NotifType): React.ReactNode => {
  switch (type) {
    case "charge":
      return <BatteryCharging color={C.brand400} size={22} strokeWidth={2.2} />;
    case "alert":
      return <AlertTriangle color={C.error} size={22} strokeWidth={2.2} />;
    case "success":
      return <CheckCircle color={C.success} size={22} strokeWidth={2.2} />;
    case "info":
      return <Bell color={C.info} size={22} strokeWidth={2.2} />;
    case "payment":
      return <CreditCard color={C.brand400} size={22} strokeWidth={2.2} />;
    case "gift":
      return <Gift color={C.brand300} size={22} strokeWidth={2.2} />;
  }
};

export const bgForType = (type: NotifType): string => {
  switch (type) {
    case "charge":
      return C.brand400 + "22";
    case "alert":
      return C.error + "22";
    case "success":
      return C.success + "22";
    case "info":
      return C.info + "22";
    case "payment":
      return C.brand400 + "22";
    case "gift":
      return C.brand300 + "22";
  }
};

export default function NotificacoesScreen() {
  const [visitedTabs, setVisitedTabs] = useState<string[]>(["notificacoes"]);
  const [tab, setTab] = useState<string>("notificacoes");

  const TABS = [
    { value: "notificacoes", label: "Notificações", icon: "Bell" },
    { value: "recargas", label: "Recargas", icon: "Zap" },
  ] as Tabs[];

  return (
    <BackgroundGradient>
      <View style={styles.root}>
        <TabNavigation
          items={TABS}
          value={tab}
          onPress={(e) => {
            setTab(e);
            setVisitedTabs((previous) =>
              previous.includes(e) ? previous : [...previous, e],
            );
          }}
        />
        {visitedTabs.includes("notificacoes") && (
          <View
            style={{
              flex: 1,
              marginTop: 50,
              display: tab === "notificacoes" ? "flex" : "none",
            }}
          >
            <Notifications />
          </View>
        )}
        {visitedTabs.includes("recargas") && (
          <View
            style={{
              flex: 1,
              marginTop: 50,
              display: tab === "recargas" ? "flex" : "none",
            }}
          >
            <Recharges />
          </View>
        )}
      </View>
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, marginTop: 50 },
});
