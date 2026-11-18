import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppTheme } from "../theme";

// Tema escolhido em Configurações. Fica fora do multiRemove do signOut
// (useAuth.ts) para continuar valendo depois de um logout.
const THEME_KEY = "@theme";

export async function getStoredTheme(): Promise<AppTheme | null> {
  const stored = await AsyncStorage.getItem(THEME_KEY);
  return stored === "dark" || stored === "light" ? stored : null;
}

export async function setStoredTheme(theme: AppTheme): Promise<void> {
  await AsyncStorage.setItem(THEME_KEY, theme);
}
