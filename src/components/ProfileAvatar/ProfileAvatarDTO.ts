import { type ImageSourcePropType } from "react-native";

export interface ProfileAvatarProps {
  imageURI: string | ImageSourcePropType;
  name: string;
}
