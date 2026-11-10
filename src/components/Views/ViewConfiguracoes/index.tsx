import MenuConfig from "@/src/components/MenuConfig";
import { usePermissions } from "@/src/hooks/usePermissions";
import {
  MENU_CONFIG_PERMICOES,
  MENU_CONFIG_PREFERENCIAS,
} from "@/src/utils/enum";
import { View } from "react-native";

export default function ViewConfiguracoes() {
  const { allowCameraAccess, allowLocationAccess, camera, localization } =
    usePermissions();

  return (
    <View>
      <MenuConfig
        title="Permissões"
        items={MENU_CONFIG_PERMICOES}
        onPress={(e, i) => {
          console.log("Mudar permissão", e, i);
        }}
        active={{ LOCALIZACAO: true, CAMERA: true, NOTIFICACOES: true }}
      />
      <MenuConfig
        title="Preferências"
        items={MENU_CONFIG_PREFERENCIAS}
        onPress={(e, i) => {
          console.log("Mudar idioma", e, i);
        }}
        active={{ TEMA: false }}
      />
    </View>
  );
}
