import { usePermissions } from "@/src/hooks/usePermissions";
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
  const { allowCameraAccess, allowGaleryAccess, camera, galery } =
    usePermissions();

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
        "Erro",
        "Não foi possível selecionar a foto. Tente novamente.",
      );
    }
  };

  const handlePhotoPress = async () => {
    try {
      // const cameraPermission =
      //   await ImagePicker.requestCameraPermissionsAsync();
      // const libraryPermission =
      //   await ImagePicker.requestMediaLibraryPermissionsAsync();
      await camera();
      await galery();

      if (!allowCameraAccess || !allowGaleryAccess) {
        Alert.alert(
          "Permissões necessárias",
          "Permita o acesso à câmera e às fotos para adicionar uma foto de perfil.",
        );
        return;
      }
    } catch (error) {
      console.error(
        "Não foi possível solicitar acesso à câmera e às fotos.",
        error,
      );
      Alert.alert(
        "Erro",
        "Não foi possível solicitar as permissões. Tente novamente.",
      );
      return;
    }

    Alert.alert("Foto de perfil", "Como deseja adicionar sua foto?", [
      { text: "Tirar foto", onPress: () => void selectPhoto("camera") },
      {
        text: "Escolher da galeria",
        onPress: () => void selectPhoto("library"),
      },
      { text: "Cancelar", style: "cancel" },
    ]);
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
