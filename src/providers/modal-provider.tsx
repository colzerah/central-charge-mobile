import { Dialog } from "@/src/components/shared/ui/organisms/dialog";
import { C } from "@/src/theme";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
  XCircle,
} from "lucide-react-native";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type ModalType = "SUCESS" | "INFO" | "WARNING" | "ERRO";

export type OpenModalParams = {
  title: string;
  subTitle?: string;
  type: ModalType;
};

type ModalContextValue = {
  isOpen: boolean;
  openModal: (params: OpenModalParams) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

const MODAL_VISUALS: Record<ModalType, { icon: typeof Info; color: string }> = {
  SUCESS: { icon: CheckCircle2, color: C.success },
  INFO: { icon: Info, color: C.info },
  WARNING: { icon: AlertTriangle, color: C.warning },
  ERRO: { icon: XCircle, color: C.error },
};

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<OpenModalParams>({
    title: "",
    type: "INFO",
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

  const { icon: Icon, color } = MODAL_VISUALS[content.type];

  return (
    <ModalContext.Provider value={contextValue}>
      {children}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Backdrop>
          <Dialog.Content>
            <View style={styles.card}>
              <Dialog.Close asChild>
                <Pressable
                  style={styles.closeButton}
                  hitSlop={12}
                  onPress={() => closeModal()}
                >
                  <X size={18} color={C.ink400} />
                </Pressable>
              </Dialog.Close>

              <View
                style={[styles.iconWrapper, { backgroundColor: `${color}20` }]}
              >
                <Icon size={32} color={color} />
              </View>

              <Text style={styles.title}>{content.title}</Text>
              {!!content.subTitle && (
                <Text style={styles.subTitle}>{content.subTitle}</Text>
              )}
            </View>
          </Dialog.Content>
        </Dialog.Backdrop>
      </Dialog>
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: C.ink50,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: C.ink200,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: 4,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 14,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    marginTop: 8,
  },
});
