import { Notification } from "./NotificationCardDTO";

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "charge",
    title: "Carregamento concluído",
    message: "Sua carga atingiu 85% na Estação Centro em 38 minutos.",
    day: 16,
    month: "Ago",
    read: false,
  },
  {
    id: "2",
    type: "alert",
    title: "Estação offline",
    message: "A Estação Sul está temporariamente indisponível para uso.",
    day: 15,
    month: "Ago",
    read: false,
  },
  {
    id: "3",
    type: "payment",
    title: "Pagamento aprovado",
    message: "Cobrança de R$ 21,80 referente à última recarga confirmada.",
    day: 14,
    month: "Ago",
    read: true,
  },
];
