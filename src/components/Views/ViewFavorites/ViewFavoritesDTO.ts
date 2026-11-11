export interface FavoriteStation {
  station: ChargingStation;
  savedAt: string;
}

export interface StationHours {
  day: string;
  hours: string;
}

export type StationStatus = "available" | "busy" | "offline";

export interface Plug {
  id: string;
  standard: string;
  type: string;
  power: number;
}

export interface ChargingStation {
  id: string;
  name: string;
  x: number;
  y: number;
  status: StationStatus;
  power: number;
  distance: number;
  price: number;
  address: string;
  phone: string;
  plugs: Plug[];
  hours: StationHours[];
}

export type SortOption = "recent" | "nearest";
