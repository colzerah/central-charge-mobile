import { useTheme, useThemedStyles } from "@/src/hooks/useTheme";
import type { ImagePickerAsset } from "expo-image-picker";
import { useState } from "react";
import { Text, View } from "react-native";
import ProfileAvatar from "../Avatar";
import Tag from "../Tag";
import { ProfileCardProps } from "./ProfileCardDTO";
import { makeStyles } from "./styles";

const ProfileCard = ({
  name,
  email,
  premium,
  premiumLabel = "Membro Premium",
}: ProfileCardProps) => {
  const { colors: C } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const [photo, setPhoto] = useState<ImagePickerAsset | null>(null);
  return (
    <View style={styles.profileCard}>
      <ProfileAvatar
        name={name}
        icon="User"
        size="sm"
        iconColor={C.brand500}
        iconSize={32}
        photo={photo}
        onPhotoChange={setPhoto}
      />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileEmail}>{email}</Text>
        {premium && (
          <View style={styles.profileTag}>
            <Tag title={premiumLabel} type="warning" size="sm" zap />
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfileCard;
