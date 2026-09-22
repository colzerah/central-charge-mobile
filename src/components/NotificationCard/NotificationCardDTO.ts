export type NotificationType =
  | "charge"
  | "alert"
  | "success"
  | "info"
  | "payment"
  | "gift";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  day: number;
  month: string;
  read: boolean;
}

export interface NotificationCardProps {
  type: NotificationType;
  title: string;
  message: string;
  day: number;
  month: string;
  read: boolean;
  animationDelay?: number;
  onPress?: () => void;
  onDelete?: () => void;
}
