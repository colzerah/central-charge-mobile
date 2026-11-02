import { C } from "@/src/theme";
import { Pressable, Text, View } from "react-native";
import Button from "../Button";
import Icon from "../Icon";
import { Dialog } from "../shared/ui/organisms/dialog";
import { ModalProps, ModalType, ModalVariant } from "./ModalDTO";
import { modalStyles } from "./styles";

const MODAL_VARIANTS: Record<ModalType, ModalVariant> = {
  SUCCESS: { color: C.success, icon: "CircleCheckBig", colorScheme: "success" },
  ERROR: { color: C.error, icon: "CircleX", colorScheme: "danger" },
  WARNING: { color: C.warning, icon: "TriangleAlert", colorScheme: "warning" },
  INFO: { color: C.info, icon: "Info", colorScheme: "info" },
};

const Modal = ({
  isOpen,
  onOpenChange,
  modalType,
  title,
  subTitle,
  onPress,
  titleButton = "OK",
  titleButtonCancel,
}: ModalProps) => {
  const { color, icon, colorScheme } = MODAL_VARIANTS[modalType];
  const hasCancel = !!titleButtonCancel;

  const handlePress = () => {
    onOpenChange(false);
    onPress?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Backdrop>
        <Dialog.Content>
          <View style={modalStyles.card}>
            <Dialog.Close asChild>
              <Pressable style={modalStyles.closeButton} hitSlop={12}>
                <Icon size={18} color={C.ink400} name="X" />
              </Pressable>
            </Dialog.Close>

            <View
              style={[modalStyles.iconWrapper, { backgroundColor: `${color}20` }]}
            >
              <Icon size={32} color={color} name={icon} />
            </View>

            <Text style={modalStyles.title}>{title}</Text>
            {!!subTitle && <Text style={modalStyles.subTitle}>{subTitle}</Text>}

            <View style={modalStyles.viewButton}>
              <View style={modalStyles.viewRow}>
                {hasCancel && (
                  <Dialog.Close asChild>
                    <Button
                      title={titleButtonCancel}
                      w={140}
                      colorScheme={colorScheme}
                      variant="outline"
                    />
                  </Dialog.Close>
                )}
                <Button
                  title={titleButton}
                  w={hasCancel ? 140 : 300}
                  colorScheme={colorScheme}
                  onPress={handlePress}
                />
              </View>
            </View>
          </View>
        </Dialog.Content>
      </Dialog.Backdrop>
    </Dialog>
  );
};

export default Modal;
