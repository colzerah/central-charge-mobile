import * as icons from "lucide-react-native/icons";

export interface SummaryCardDTO {
  value: number | string;
  label: string;
  icon: keyof typeof icons;
}
