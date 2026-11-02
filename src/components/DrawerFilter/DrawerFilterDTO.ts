import { ReactNode } from "react";

export interface DrawerFilterProps {
  open: boolean;
  onClose: () => void;
  onApply: () => void;
  onClear?: () => void;
  title?: string;
  content: ReactNode;
  children: ReactNode;
}
