import { Plugs } from "../../MapButtonSheet/MapButtronSheetDTO";
import { TimeTableItemProps } from "../../TimeTable/TimeTableDTO";

export interface MarketsInterface {
  id: number;
  name: string;
  adress: string;
  supportNumber: string;
  r$kwh: number;
  kwhmax: number;
  schedules: TimeTableItemProps[];
  variant: "BROKEN" | "AVAILABLE" | "OCCUPIED";
  coordinate: {
    latitude: number;
    longitude: number;
  };
  qtdPlugs: number;
  plugs: Plugs[];
  // logo da operadora, mostrada no miolo do pin no lugar do ícone
  image?: string;
}
