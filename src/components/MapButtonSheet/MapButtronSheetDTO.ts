import { MarketsInterface } from "@/src/app/(app)/(tabs)/home";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
export interface MapButtonSheetRef {
  present: () => void;
  dismiss: () => void;
}

export interface MapButtonSheetProps {
  openOnFocus?: boolean;
  onClose?: () => void;
  selectedMarket: MarketsInterface;
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
