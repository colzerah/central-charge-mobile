export interface RechargeCardProps {
  title: string;
  duration?: number;
  variant?: "default" | "info" | "danger" | "success" | "warning";
  kwh?: number;
  cost: number;
  tagTitle: string;
  onPress?: () => void;
}
