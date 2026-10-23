import { C } from "@/src/theme";
import { User } from "lucide-react-native";
import { Image, View } from "react-native";
import { GradientAvatar } from "../shared/ui/base/gradient-avatar";
import { ProfileAvatarProps } from "./ProfileAvatarDTO";
import { styles } from "./styles";

const ProfileAvatar = ({ imageURI, name }: ProfileAvatarProps) => {
  const size = 64;
  const SIZE_AVATAR = size / 2;
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
        rounding={SIZE_AVATAR}
        style={{ backgroundColor: "red" }}
        palette={[C.brand400]}
      />

      <View style={[styles.profileAvatar, { borderRadius: SIZE_AVATAR }]}>
        {!imageURI && <User color={C.brand400} size={32} strokeWidth={2} />}
        {imageURI && (
          <Image
            source={typeof imageURI === "string" ? { uri: imageURI } : imageURI}
            style={[
              styles.imageStyles,
              {
                width: 60,
                height: 60,
                // width: size - borderWidth * 2,
                // height: size - borderWidth * 2,
                borderRadius: SIZE_AVATAR,
              },
            ]}
            resizeMode="cover"
          />
        )}
      </View>
    </View>
  );
};

export default ProfileAvatar;
