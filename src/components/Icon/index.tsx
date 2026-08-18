import * as icons from "lucide-react-native/icons";
import { IconProps } from "./IconDTO";

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
