import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppLanguage } from "../dtos/languageDTO";

// Idioma escolhido na tela de Idioma. Fica fora do multiRemove do signOut
// (useAuth.ts) para continuar valendo depois de um logout.
const LANGUAGE_KEY = "@language";

const SUPPORTED: AppLanguage[] = ["pt-BR", "pt-PT", "en-US", "zh-CN", "ru-RU"];

export async function getStoredLanguage(): Promise<AppLanguage | null> {
  const stored = await AsyncStorage.getItem(LANGUAGE_KEY);
  return SUPPORTED.includes(stored as AppLanguage)
    ? (stored as AppLanguage)
    : null;
}

export async function setStoredLanguage(language: AppLanguage): Promise<void> {
  await AsyncStorage.setItem(LANGUAGE_KEY, language);
}
