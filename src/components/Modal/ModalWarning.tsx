import { C } from "@/src/theme";
import { Pressable, Text, View } from "react-native";
import Button from "../Button";
import Icon from "../Icon";
import { Dialog } from "../shared/ui/organisms/dialog";
import { ModalWarningProps } from "./ModalDTO";
import { modalStyles } from "./styles";

const ModalWarning = ({
  title = "Atenção",
  subTitle,
  titleButton = "OK",
}: ModalWarningProps) => {
  return (
    <View style={modalStyles.card}>
      <Dialog.Close asChild>
        <Pressable style={modalStyles.closeButton} hitSlop={12}>
          <Icon size={18} color={C.ink400} name="X" />
        </Pressable>
      </Dialog.Close>

      <View
        style={[modalStyles.iconWrapper, { backgroundColor: `${C.warning}20` }]}
      >
        <Icon size={32} color={C.warning} name="TriangleAlert" />
      </View>

      <Text style={modalStyles.title}>{title}</Text>
      {!!subTitle && <Text style={modalStyles.subTitle}>{subTitle}</Text>}
      <View style={modalStyles.viewButton}>
        <Dialog.Close asChild>
          <Button title={titleButton} w={300} colorScheme="warning" />
        </Dialog.Close>
      </View>
    </View>
  );
};

export default ModalWarning;
