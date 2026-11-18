import { MarketsInterface } from "../components/Views/ViewHome/ViewHomeDTO";
import { AppTheme } from "../theme";
import { AppLanguage } from "./languageDTO";

export interface HomeValuesState {
  pinSelected: MarketsInterface | null;
}
export interface AppState {
  home: HomeState;
  notifications: NotificationState;
  // null = ainda não leu do AsyncStorage (ver useOnboardingBootstrap)
  onboardingDone: boolean | null;
  language: AppLanguage;
  theme: AppTheme;
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
