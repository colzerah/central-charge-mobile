import { MapPinProps } from "../MapPin/MapPinDTO";

export interface MapLegendItem {
  variant: MapPinProps["variant"];
  title: string;
  description: string;
}

export interface MapLegendProps {
  items?: MapLegendItem[];
}
