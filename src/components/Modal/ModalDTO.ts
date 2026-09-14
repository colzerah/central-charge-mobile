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

export type ModalType = "SUCCESS" | "INFO" | "WARNING" | "ERROR";

export interface ModalErrorProps {
  title: string;
  subTitle?: string;
  titleButton?: string;
}

export interface ModalSuccessProps {
  title: string;
  subTitle?: string;
  titleButton?: string;
  titleButtonCancel?: string;
  onPress?: () => void;
}

export interface ModalWarningProps {
  title: string;
  subTitle?: string;
  titleButton?: string;
}
