import * as icons from "lucide-react-native/icons";

export interface RadioListOption<T extends string> {
  value: T;
  label: string;
  // Segunda linha, menor, abaixo do label
  description?: string;
  icon?: keyof typeof icons;
}

export interface RadioListProps<T extends string> {
  label?: string;
  options: RadioListOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
}
