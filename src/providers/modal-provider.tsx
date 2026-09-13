import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Modal from "../components/Modal";

export type ModalType = "SUCCESS" | "INFO" | "WARNING" | "ERROR";

export type OpenModalParams = {
  title: string;
  subTitle?: string;
  type: ModalType;
  onPress?: () => void;
  titleButton?: string;
  titleButtonCancel?: string;
};

type ModalContextValue = {
  isOpen: boolean;
  openModal: (params: OpenModalParams) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<OpenModalParams>({
    title: "",
    subTitle: "",
    type: "INFO",
    onPress: () => {},
    titleButton: "",
    titleButtonCancel: "",
  });

  const openModal = useCallback((params: OpenModalParams) => {
    setContent(params);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), [isOpen]);

  const contextValue = useMemo(
    () => ({ isOpen, openModal, closeModal }),
    [isOpen, openModal, closeModal],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        modalType={content.type}
        title={content.title}
        subTitle={content.subTitle}
        onPress={content.onPress}
        titleButton={content.titleButton}
        titleButtonCancel={content.titleButtonCancel}
      />
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextValue {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal deve ser usado dentro de um ModalProvider");
  }
  return context;
}
