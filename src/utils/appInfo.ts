import Constants from "expo-constants";
import { Platform } from "react-native";

export const APP_NAME = Constants.expoConfig?.name ?? "Central Charge";
export const APP_VERSION = Constants.expoConfig?.version ?? "-";

// No Android, Platform.Version é o nível da API (ex.: 37), não a versão do sistema
export const APP_PLATFORM =
  Platform.OS === "ios"
    ? `iOS ${Platform.Version}`
    : `Android (API ${Platform.Version})`;
