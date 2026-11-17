import MenuConfig from "@/src/components/MenuConfig";
import { useModal } from "@/src/hooks/useModal";
import { usePermissions } from "@/src/hooks/usePermissions";
import { useTranslation } from "@/src/hooks/useTranslation";
import {
  getMenuConfigPermissoes,
  getMenuConfigPreferencias,
} from "@/src/utils/enum";
import { router } from "expo-router";
import { Alert, Linking, View } from "react-native";

export default function ViewConfiguracoes() {
  const { allowCameraAccess, allowLocationAccess, camera, localization } =
    usePermissions();
  const { t, language } = useTranslation();

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
        Alert.alert(
          t("settings.permissionRequired") /* pt: "Permissão necessária" */,
          t("settings.permissionRequiredMessage") /* pt: "Ative o acesso às permissões nas configurações do aplicativo." */,
          [
            { text: t("common.cancel") /* pt: "Cancelar" */, style: "cancel" },
            {
              text: t("settings.openSettings") /* pt: "Abrir Configurações" */,
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
        title: t("settings.changePermission") /* pt: "Alterar permissão" */,
        subTitle: t("settings.changePermissionMessage") /* pt: "Para desativar esta permissão, vá para as configurações do aplicativo no seu dispositivo." */,
        titleButton: t("settings.goToSettings") /* pt: "Ir para configurações" */,
        onPress: () => Linking.openSettings(),
        type: "WARNING",
      });
    }
  };

  return (
    <View>
      <MenuConfig
        title={t("settings.sections.permissions") /* pt: "Permissões" */}
        items={getMenuConfigPermissoes(t)}
        onPress={handlePermissionChange}
        active={{
          LOCALIZACAO: allowLocationAccess,
          CAMERA: allowCameraAccess,
          NOTIFICACOES: false,
        }}
      />
      <MenuConfig
        title={t("settings.sections.preferences") /* pt: "Preferências" */}
        // O item Idioma mostra o idioma escolhido (ex.: "Português (Brasil)")
        items={getMenuConfigPreferencias(t, t(`language.names.${language}`) /* pt: language.names.* → "Português (Brasil)", "Português (Portugal)", "Inglês (Estados Unidos)", … */)}
        onPress={(e, i) => {
          if (e === "IDIOMA") {
            router.navigate("/idioma");
            return;
          }
          console.log("Preferência", e, i);
        }}
        active={{ TEMA: false }}
      />
    </View>
  );
}
