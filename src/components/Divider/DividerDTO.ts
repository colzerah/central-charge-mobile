import { DimensionValue } from "react-native";

export interface DividerProps {
  title?: string;
  type?: "horizontal" | "vertical";
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  h?: DimensionValue;
}
