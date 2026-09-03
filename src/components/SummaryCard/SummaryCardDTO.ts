import * as icons from "lucide-react-native/icons";

export interface SummaryCardDTO {
  value: string;
  label: string;
  icon: keyof typeof icons;
}
