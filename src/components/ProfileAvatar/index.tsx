import { C } from "@/src/theme";
import { User } from "lucide-react-native";
import { Image, View } from "react-native";
import { GradientAvatar } from "../shared/ui/base/gradient-avatar";
import { ProfileAvatarProps } from "./ProfileAvatarDTO";
import { styles } from "./styles";

const ProfileAvatar = ({ imageURI, name }: ProfileAvatarProps) => {
  const size = 64;
  const borderWidth = 3;
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
        rounding={size / 2}
        palette={[C.brand400]}
      />
      {!imageURI && (
        <View style={styles.profileAvatar}>
          <User color={C.brand400} size={32} strokeWidth={2} />
        </View>
      )}
      <Image
        source={typeof imageURI === "string" ? { uri: imageURI } : imageURI}
        style={[
          styles.imageStyles,
          {
            width: size - borderWidth * 2,
            height: size - borderWidth * 2,
            borderRadius: size / 2,
          },
        ]}
        resizeMode="cover"
      />
    </View>
  );
};

export default ProfileAvatar;
