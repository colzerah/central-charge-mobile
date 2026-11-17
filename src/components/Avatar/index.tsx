import { useModal } from "@/src/hooks/useModal";
import { usePermissions } from "@/src/hooks/usePermissions";
import { useTranslation } from "@/src/hooks/useTranslation";
import { C } from "@/src/theme";
import * as ImagePicker from "expo-image-picker";
import { Alert, Image, Pressable, View } from "react-native";
import Icon from "../Icon";
import { GradientAvatar } from "../shared/ui/base/gradient-avatar";
import { AvatarProps } from "./AvatarDTO";
import { styles } from "./styles";

const Avatar = ({
  name,
  size = "sm",
  icon,
  iconSize = 24,
  iconColor,
  palette,
  photo,
  onPhotoChange,
}: AvatarProps) => {
  const { allowCameraAccess, allowGalleryAccess, camera, gallery } =
    usePermissions();

  const { openModal } = useModal();
  const { t } = useTranslation();

  const getSize = () => {
    if (size === "sm") {
      return 64;
    }
    if (size === "md") {
      return 96;
    }
    return size;
  };

  const width = getSize() - 5;
  const height = getSize() - 5;

  const SIZE_AVATAR = getSize() / 2;

  const selectPhoto = async (source: "camera" | "library") => {
    try {
      const result =
        source === "camera"
          ? await ImagePicker.launchCameraAsync({
              mediaTypes: ["images"],
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.8,
            })
          : await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ["images"],
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.8,
            });

      if (!result.canceled) {
        onPhotoChange(result.assets[0]);
      }
    } catch (error) {
      console.error("Não foi possível selecionar a foto de perfil.", error);
      Alert.alert(
        t("common.error") /* pt: "Erro" */,
        t(
          "avatar.selectError",
        ) /* pt: "Não foi possível selecionar a foto. Tente novamente." */,
      );
    }
  };

  const handlePhotoPress = async () => {
    try {
      await camera();
      await gallery();

      if (!allowCameraAccess || !allowGalleryAccess) {
        openModal({
          title: t(
            "avatar.permissionsTitle",
          ) /* pt: "Permissões necessárias" */,
          subTitle: t(
            "avatar.permissionsMessage",
          ) /* pt: "Permita o acesso à câmera e às fotos para adicionar uma foto de perfil." */,
          type: "INFO",
        });
        return;
      }
    } catch (error) {
      console.error(
        "Não foi possível solicitar acesso à câmera e às fotos.",
        error,
      );
      Alert.alert(
        t("common.error") /* pt: "Erro" */,
        t(
          "avatar.permissionsError",
        ) /* pt: "Não foi possível solicitar as permissões. Tente novamente." */,
      );
      return;
    }

    openModal({
      title: t("avatar.photoTitle"),
      subTitle: t("avatar.photoMessage"),
      type: "SUCCESS",
      titleButton: t("avatar.takePhoto"),
      onPress: () => void selectPhoto("camera"),
      titleButtonAction: t("avatar.chooseLibrary"),
      onPressAction: () => void selectPhoto("library"),
    });

    // Alert.alert(t("avatar.photoTitle") /* pt: "Foto de perfil" */, t("avatar.photoMessage") /* pt: "Como deseja adicionar sua foto?" */, [
    //   { text: t("avatar.takePhoto") /* pt: "Tirar foto" */, onPress: () => void selectPhoto("camera") },
    //   {
    //     text: t("avatar.chooseLibrary") /* pt: "Escolher da galeria" */,
    //     onPress: () => void selectPhoto("library"),
    //   },
    //   { text: t("common.cancel") /* pt: "Cancelar" */, style: "cancel" },
    // ]);
  };

  return (
    <View
      style={[
        styles.containerStyles,
        {
          width: getSize(),
          height: getSize(),
        },
      ]}
    >
      <GradientAvatar
        token={name}
        size={getSize()}
        rounding={SIZE_AVATAR}
        palette={palette || [C.brand400]}
      />

      <View
        style={[
          styles.profileAvatar,
          {
            borderRadius: SIZE_AVATAR,
            width: width,
            height: height,
          },
        ]}
      >
        <Pressable onPress={handlePhotoPress}>
          {!photo && (
            <Icon
              name={icon}
              color={iconColor}
              size={iconSize}
              strokeWidth={2}
            />
          )}
          {photo && (
            <Image
              source={{ uri: photo.uri }}
              style={{
                borderRadius: SIZE_AVATAR,
                width: width,
                height: height,
              }}
              resizeMode="cover"
            />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default Avatar;
