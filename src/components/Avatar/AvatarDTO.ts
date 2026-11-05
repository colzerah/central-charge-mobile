import type { ImagePickerAsset } from "expo-image-picker";
import * as icons from "lucide-react-native/icons";
export interface AvatarProps {
  name: string;
  size?: "sm" | "md";
  icon: keyof typeof icons;
  iconSize?: number;
  iconColor?: string;
  palette?: string[];
  photo?: ImagePickerAsset | null;
  onPhotoChange: (photo: ImagePickerAsset) => void;
}
