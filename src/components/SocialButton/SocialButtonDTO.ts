export interface SocialButtonProps {
  type: "facebook" | "chrome" | "apple";
  label: string;
  onPress: () => void;
}
