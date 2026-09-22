export interface CardPlugProps {
  title: string;
  titleSmall: string;
  titleKw: string;
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
  plugStatus: "BROKEN" | "AVAILABLE" | "OCCUPIED";
}
