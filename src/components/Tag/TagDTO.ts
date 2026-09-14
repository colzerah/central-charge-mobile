export interface TagProps {
  title: string;
  type?: "default" | "info" | "danger" | "success" | "warning" | "gray";
  size?: "sm" | "md";
  border?: boolean;
  dot?: boolean;
}
