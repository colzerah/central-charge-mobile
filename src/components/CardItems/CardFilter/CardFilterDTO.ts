export interface CardFilterProps {
  label: string;
  onPress?: () => void;
  type: "SUCCESS" | "WARNING" | "ERROR";
  isActive?: boolean;
  count?: number;
}
