import { MarketsInterface } from "@/src/app/(app)/(tabs)/home";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SharedValue } from "react-native-reanimated";
export interface MapButtonSheetRef {
  present: () => void;
  dismiss: () => void;
}

export interface MapButtonSheetProps {
  openOnFocus?: boolean;
  onClose?: () => void;
  selectedMarket: MarketsInterface | null;
  // recebe a posição do sheet a cada frame (-1 fechado, 0 aberto)
  animatedIndex?: SharedValue<number>;
}

export interface Plugs {
  id: number;
  titleSmall: string;
  title: string;
  status: "BROKEN" | "AVAILABLE" | "OCCUPIED";
  plugName:
    | "CEE-BLAU"
    | "CEE-ROOT"
    | "CHADEMO"
    | "CSS"
    | "DOMESTIC-F"
    | "TESLA-S"
    | "TYP1-CSS"
    | "TYP1"
    | "TYP2";
  kw: number;
}

export type BottomSheetModalHandle = BottomSheetModal & {
  minimize: () => void;
  restore: () => void;
};
