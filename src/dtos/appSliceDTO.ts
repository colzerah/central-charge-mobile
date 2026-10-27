import { MarketsInterface } from "../app/(app)/(tabs)/home";

export interface HomeValuesState {
  pinSelected: MarketsInterface | null;
}
export interface AppState {
  home: HomeState;
  notifications: NotificationState;
}

export interface HomeState {
  listPins: MarketsInterface[];
  values: HomeValuesState;
}

export interface Pin {
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface NotificationState {
  listNotifications: Notification[];
}

export interface Notification {
  title: string;
  message: string;
  date: Date;
}
