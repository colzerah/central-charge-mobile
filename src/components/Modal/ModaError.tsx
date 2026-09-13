import { C } from "@/src/theme";
import { Pressable, Text, View } from "react-native";
import Button from "../Button";
import Icon from "../Icon";
import { Dialog } from "../shared/ui/organisms/dialog";
import { ModalErrorProps } from "./ModalDTO";
import { modalStyles } from "./styles";

const ModalError = ({
  title = "Ops! Algo deu errado",
  subTitle,
  titleButton = "OK",
}: ModalErrorProps) => {
  return (
    <View style={modalStyles.card}>
      <Dialog.Close asChild>
        <Pressable style={modalStyles.closeButton} hitSlop={12}>
          <Icon size={18} color={C.ink400} name="X" />
        </Pressable>
      </Dialog.Close>

      <View
        style={[modalStyles.iconWrapper, { backgroundColor: `${C.error}20` }]}
      >
        <Icon size={32} color={C.error} name="CircleX" />
      </View>

      <Text style={modalStyles.title}>{title}</Text>
      {!!subTitle && <Text style={modalStyles.subTitle}>{subTitle}</Text>}
      <View style={modalStyles.viewButton}>
        <Dialog.Close asChild>
          <Button title={titleButton} w={300} colorScheme="danger" />
        </Dialog.Close>
      </View>
    </View>
  );
};

export default ModalError;
