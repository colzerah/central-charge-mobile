import { ButtonProps } from "../Button/ButtonDTO";
import { IconProps } from "../Icon/IconDTO";

export type ModalType = "SUCCESS" | "INFO" | "WARNING" | "ERROR";

export interface ModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  modalType: ModalType;
  title: string;
  subTitle?: string;
  onPress?: () => void;
  titleButton?: string;
  titleButtonCancel?: string;
}

export interface ModalVariant {
  color: string;
  icon: IconProps["name"];
  colorScheme: ButtonProps["colorScheme"];
}
