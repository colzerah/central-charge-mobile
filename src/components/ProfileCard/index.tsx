import { Text, View } from "react-native";
import ProfileAvatar from "../ProfileAvatar";
import Tag from "../Tag";
import { ProfileCardProps } from "./ProfileCardDTO";
import { styles } from "./styles";

const ProfileCard = ({ name, email, imageURI, premium }: ProfileCardProps) => {
  return (
    <View style={styles.profileCard}>
      <ProfileAvatar name={name} imageURI={imageURI} />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileEmail}>{email}</Text>
        {premium && (
          <View style={styles.profileTag}>
            <Tag title="Membro Premium" type="warning" size="sm" dot />
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfileCard;
