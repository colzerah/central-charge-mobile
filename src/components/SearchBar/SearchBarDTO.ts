import { ReactNode } from "react";

export interface SearchBarProps {
  onPress: (param: any) => void;
  onChange: (param: string) => void;
  items: any[];
  value: string;
  placeholder?: string;
  subtitle?: string;
  focusedOffset?: number;
  unfocusedOffset?: number;
  scrollableSearch: (item: any, index: number) => ReactNode;
}
