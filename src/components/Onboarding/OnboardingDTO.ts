import * as icons from "lucide-react-native/icons";
import { ImageSourcePropType } from "react-native";

export interface OnboardingSlide {
  id: string;
  image: ImageSourcePropType;
  icon: keyof typeof icons;
  title: string;
  description: string;
}

export interface OnboardingProps {
  slides: OnboardingSlide[];
  onFinish: () => void;
}
