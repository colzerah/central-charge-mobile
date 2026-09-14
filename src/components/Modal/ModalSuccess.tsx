import { C } from "@/src/theme";
import { Pressable, Text, View } from "react-native";
import Button from "../Button";
import Icon from "../Icon";
import { Dialog } from "../shared/ui/organisms/dialog";
import { ModalSuccessProps } from "./ModalDTO";
import { modalStyles } from "./styles";

const ModalSuccess = ({
  title = "Confirmar ação",
  subTitle,
  titleButton = "OK",
  titleButtonCancel = "Cancelar",
  onPress,
}: ModalSuccessProps) => {
  return (
    <View style={modalStyles.card}>
      <Dialog.Close asChild>
        <Pressable style={modalStyles.closeButton} hitSlop={12}>
          <Icon size={18} color={C.ink400} name="X" />
        </Pressable>
      </Dialog.Close>

      <View
        style={[modalStyles.iconWrapper, { backgroundColor: `${C.success}20` }]}
      >
        <Icon size={32} color={C.success} name="CircleCheckBig" />
      </View>

      <Text style={modalStyles.title}>{title}</Text>
      {!!subTitle && <Text style={modalStyles.subTitle}>{subTitle}</Text>}
      <View style={modalStyles.viewButton}>
        <View style={modalStyles.viewRow}>
          <Dialog.Close asChild>
            <Button title={titleButtonCancel} w={140} colorScheme="success" />
          </Dialog.Close>
          <Button
            title={titleButton}
            w={140}
            colorScheme="success"
            onPress={onPress}
          />
        </View>
      </View>
    </View>
  );
};

export default ModalSuccess;
