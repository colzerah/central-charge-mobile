export interface RechargeProps {
  id: number;
  title: string;
  duration?: number;
  variant?: "default" | "info" | "danger" | "success" | "warning";
  kwh?: number;
  cost: number;
  tagTitle: string;
  onPress?: () => void;
  date: Date;
}

export const RECHARGES_MOCK: RechargeProps[] = [
  {
    id: 1,
    title: "Estação Centro",
    date: new Date("2023-08-14T14:32:00"),
    duration: 38,
    kwh: 24.5,
    cost: 21.8,
    variant: "success",
    tagTitle: "Concluído",
  },
  {
    id: 2,
    title: "Estação Shopping",
    date: new Date("2023-08-12T09:15:00"),
    duration: 52,
    kwh: 35.2,
    cost: 32.38,
    variant: "success",
    tagTitle: "Concluído",
  },
  {
    id: 3,
    title: "Estação Norte",
    date: new Date("2023-08-10T18:44:00"),
    duration: 25,
    kwh: 18.0,
    cost: 14.22,
    variant: "success",
    tagTitle: "Concluído",
  },
  {
    id: 4,
    title: "Estação Aeroporto",
    date: new Date("2023-08-16T08:00:00"),
    duration: 0,
    kwh: 0,
    cost: 0,
    variant: "info",
    tagTitle: "Agendado",
  },
  {
    id: 5,
    title: "Estação Norte",
    date: new Date("2023-08-10T18:44:00"),
    duration: 25,
    kwh: 18.0,
    cost: 14.22,
    variant: "success",
    tagTitle: "Concluído",
  },
  {
    id: 6,
    title: "Estação Norte",
    date: new Date("2023-08-10T18:44:00"),
    duration: 25,
    kwh: 18.0,
    cost: 14.22,
    variant: "success",
    tagTitle: "Concluído",
  },
  {
    id: 7,
    title: "Estação Norte",
    date: new Date("2023-08-10T18:44:00"),
    duration: 25,
    kwh: 18.0,
    cost: 14.22,
    variant: "warning",
    tagTitle: "Pendente",
  },
  {
    id: 8,
    title: "Estação Norte",
    date: new Date("2023-08-10T18:44:00"),
    duration: 0,
    kwh: 0,
    cost: 0,
    variant: "danger",
    tagTitle: "Error",
  },
];
