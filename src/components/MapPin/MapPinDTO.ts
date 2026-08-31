import { IconProps } from "../Icon/IconDTO";

export interface MapPinProps {
  variant: "AVAILABLE" | "OCCUPIED" | "BROKEN";
}

export interface ReturnGetVariant {
  icon: IconProps["name"];
  color: string;
}
