import MenuConfig from "@/src/components/MenuConfig";
import { useModal } from "@/src/hooks/useModal";
import { usePermissions } from "@/src/hooks/usePermissions";
import {
  MENU_CONFIG_PERMICOES,
  MENU_CONFIG_PREFERENCIAS,
} from "@/src/utils/enum";
import { Alert, Linking, View } from "react-native";

export default function ViewConfiguracoes() {
  const { allowCameraAccess, allowLocationAccess, camera, localization } =
    usePermissions();

  const { openModal } = useModal();

  // const permissionActions: Record<string, () => Promise<boolean>> = {
  //   LOCALIZACAO: localization,
  // };

  const handlePermissionChange = async (label: string, e?: boolean) => {
    if (e === true) {
      const result =
        label === "CAMERA"
          ? await camera()
          : label === "LOCALIZACAO"
            ? await localization()
            : undefined;

      if (result && !result.granted && !result.canAskAgain) {
        // const permissionName =
        //   label === "CAMERA" ? "câmera" : "localização";
        Alert.alert(
          "Permissão necessária",
          "Ative o acesso às permissões nas configurações do aplicativo.",
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Abrir Configurações",
              onPress: () => Linking.openSettings(),
            },
          ],
        );
      }
      // await permissionActions[label]?.();
      return;
    }

    if (e === false) {
      openModal({
        title: "Alterar permissão",
        subTitle:
          "Para desativar esta permissão, vá para as configurações do aplicativo no seu dispositivo.",
        titleButton: "Ir para configurações",
        onPress: () => Linking.openSettings(),
        type: "WARNING",
      });
    }
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
