import { C } from "@/src/theme";
import * as ImagePicker from "expo-image-picker";
import { User } from "lucide-react-native";
import { useState } from "react";
import { Alert, Image, Pressable, View } from "react-native";
import { GradientAvatar } from "../shared/ui/base/gradient-avatar";
import { ProfileAvatarProps } from "./ProfileAvatarDTO";
import { styles } from "./styles";

const ProfileAvatar = ({ name }: ProfileAvatarProps) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const size = 64;
  const SIZE_AVATAR = size / 2;
  const borderWidth = 3;

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
        setPhotoUrl(result.assets[0].uri);
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
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      const libraryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!cameraPermission.granted || !libraryPermission.granted) {
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
          width: size,
          height: size,
        },
      ]}
    >
      <GradientAvatar
        token={name}
        size={size}
        rounding={SIZE_AVATAR}
        palette={[C.brand400]}
      />

      <View style={[styles.profileAvatar, { borderRadius: SIZE_AVATAR }]}>
        <Pressable onPress={handlePhotoPress}>
          {!photoUrl && <User color={C.brand400} size={32} strokeWidth={2} />}
          {photoUrl && (
            <Image
              source={{ uri: photoUrl }}
              style={[
                styles.imageStyles,
                {
                  borderRadius: SIZE_AVATAR,
                },
              ]}
              resizeMode="cover"
            />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileAvatar;
