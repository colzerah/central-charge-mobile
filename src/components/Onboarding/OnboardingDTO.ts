import * as icons from "lucide-react-native/icons";

export interface OnboardingSlide {
  id: string;
  icon: keyof typeof icons;
  title: string;
  description: string;
}

export interface OnboardingProps {
  slides: OnboardingSlide[];
  onFinish: () => void;
}
