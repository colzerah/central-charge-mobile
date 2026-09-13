import {
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
  XCircle,
} from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Dialog } from "../shared/ui/organisms/dialog";
import { ModalProps, ModalType } from "./ModalDTO";

import { C } from "@/src/theme";
import { useState } from "react";

type OpenModalParams = {
  title: string;
  tagTitle?: string;
  subTitle?: string;
  type: ModalType;
};

const Modal = ({ isOpen, onOpenChange, modalType }: ModalProps) => {
  const [content, setContent] = useState<OpenModalParams>({
    title: "",
    subTitle: "",
    type: "INFO",
  });

  const MODAL_VISUALS: Record<ModalType, { icon: typeof Info; color: string }> =
    {
      SUCESS: { icon: CheckCircle2, color: C.success },
      INFO: { icon: Info, color: C.info },
      WARNING: { icon: AlertTriangle, color: C.warning },
      ERRO: { icon: XCircle, color: C.error },
    };

  const { icon: Icon, color } = MODAL_VISUALS[modalType || "INFO"];
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Backdrop>
        <Dialog.Content>
          <View style={styles.card}>
            <Dialog.Close asChild>
              <Pressable
                style={styles.closeButton}
                hitSlop={12}
                // onPress={() => closeModal()}
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
  );
};

export default Modal;

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
