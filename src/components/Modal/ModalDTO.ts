export interface ModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  modalType: ModalType;
}

export type ModalType = "SUCESS" | "INFO" | "WARNING" | "ERRO";
