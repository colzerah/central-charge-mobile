import type { ImageProps } from "expo-image";
import { IconProps } from "../Icon/IconDTO";

export interface MapPinProps {
  variant: "AVAILABLE" | "OCCUPIED" | "BROKEN";
  // Imagem do miolo (local com require() ou remota com { uri }). Sem ela,
  // o miolo mostra o ícone da variante.
  centerImage?: ImageProps["source"];
}

export interface ReturnGetVariant {
  icon: IconProps["name"];
  color: string;
}
