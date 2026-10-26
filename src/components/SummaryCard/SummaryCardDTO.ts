import * as icons from "lucide-react-native/icons";

export interface SummaryCardDTO {
  value: number;
  label: string;
  icon: keyof typeof icons;
}
