export type NotificationType =
  | "charge"
  | "alert"
  | "success"
  | "info"
  | "payment"
  | "gift";

export interface NotificationProps {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  day: string;
  month: string;
  read: boolean;
}

export const NOTIFICATION_MOCK: NotificationProps[] = [
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
