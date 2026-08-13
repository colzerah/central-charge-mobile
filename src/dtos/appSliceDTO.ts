export interface AppState {
  home: HomeState;
  notifications: NotificationState;
}

export interface HomeState {
  listPins: Pin[];
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
