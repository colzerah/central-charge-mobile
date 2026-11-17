import { getLocales } from "expo-localization";
import { I18n, TranslateOptions } from "i18n-js";
import { AppLanguage } from "../dtos/languageDTO";
import enUS from "./locales/en-US";
import ptBR, { Translations } from "./locales/pt-BR";
import ptPT from "./locales/pt-PT";
import ruRU from "./locales/ru-RU";
import zhCN from "./locales/zh-CN";

export const DEFAULT_LANGUAGE: AppLanguage = "pt-BR";

export const i18n = new I18n({
  "pt-BR": ptBR,
  "pt-PT": ptPT,
  "en-US": enUS,
  "zh-CN": zhCN,
  "ru-RU": ruRU,
});

// Chave sem tradução num idioma cai no pt-BR em vez de mostrar "[missing ...]"
i18n.enableFallback = true;
i18n.defaultLocale = DEFAULT_LANGUAGE;

// Russo tem 3 formas de plural (1 станция, 2 станции, 5 станций). Os outros
// idiomas usam o padrão do i18n-js (one/other).
i18n.pluralization.register("ru-RU", (_i18n, count) => {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return ["one"];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return ["few"];
  return ["many", "other"];
});

// Idioma do aparelho mapeado para um dos idiomas do app (pt-BR se não houver)
export function getDeviceLanguage(): AppLanguage {
  const { languageCode, regionCode } = getLocales()[0];
  switch (languageCode) {
    case "pt":
      return regionCode === "PT" ? "pt-PT" : "pt-BR";
    case "en":
      return "en-US";
    case "zh":
      return "zh-CN";
    case "ru":
      return "ru-RU";
    default:
      return DEFAULT_LANGUAGE;
  }
}

i18n.locale = getDeviceLanguage();

// "menu.items.signOut" etc. — erro de digitação numa chave vira erro de tipo.
// Objetos de plural ({ one, other }) viram uma chave só ("favorites.count").
type Paths<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends string
    ? `${Prefix}${K}`
    : T[K] extends { one: string; other: string }
      ? `${Prefix}${K}`
      : Paths<T[K], `${Prefix}${K}.`>;
}[keyof T & string];

export type TranslationKey = Paths<Translations>;

export type TFunction = (
  key: TranslationKey,
  options?: TranslateOptions,
) => string;

// Para arquivos fora de componentes (utils, hooks sem tela): usa o idioma
// atual do i18n, que acompanha a escolha do usuário.
export const translate: TFunction = (key, options) => i18n.t(key, options);
