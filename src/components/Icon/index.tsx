import * as icons from "lucide-react-native/icons";

interface IconProps {
  name: keyof typeof icons;
  color?: string;
  size?: number;
  strokeWidth?: number;
  fill?: string;
}

const Icon = ({ name, color, size, strokeWidth, fill }: IconProps) => {
  const LucideIcon = icons[name];

  return (
    <LucideIcon
      color={color}
      size={size}
      strokeWidth={strokeWidth}
      fill={fill}
    />
  );
};

export default Icon;
