import MenuConfig from "@/src/components/MenuConfig";
import { usePermissions } from "@/src/hooks/usePermissions";
import {
  MENU_CONFIG_PERMICOES,
  MENU_CONFIG_PREFERENCIAS,
} from "@/src/utils/enum";
import { Alert, Linking, View } from "react-native";

export default function ViewConfiguracoes() {
  const { allowCameraAccess, allowLocationAccess, camera, localization } =
    usePermissions();

  const permissionActions: Record<string, () => Promise<boolean>> = {
    LOCALIZACAO: localization,
    CAMERA: camera,
  };

  const handlePermissionChange = async (label: string, e?: boolean) => {
    if (e) {
      await permissionActions[label]?.();
      return;
    }

    Alert.alert(
      "Alterar permissão",
      "Para desativar esta permissão, vá para as configurações do aplicativo no seu dispositivo.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Abrir Configurações", onPress: () => Linking.openSettings() },
      ],
    );
  };

  return (
    <View>
      <MenuConfig
        title="Permissões"
        items={MENU_CONFIG_PERMICOES}
        onPress={handlePermissionChange}
        active={{
          LOCALIZACAO: allowLocationAccess,
          CAMERA: allowCameraAccess,
          NOTIFICACOES: false,
        }}
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
