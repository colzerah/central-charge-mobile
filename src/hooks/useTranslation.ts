import { i18n, TFunction } from "@/src/i18n";
import { addLanguage } from "@/src/redux/appSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { useCallback, useEffect, useState } from "react";
import { AppLanguage } from "../dtos/languageDTO";
import { getStoredLanguage, setStoredLanguage } from "../utils/language";

// Traduções da tela. O idioma vem do Redux, então a tela se redesenha
// sozinha quando ele muda na tela de Idioma.
export function useTranslation() {
  const language = useAppSelector((state) => state.appState.language);

  const t: TFunction = useCallback(
    (key, options) => i18n.t(key, { locale: language, ...options }),
    [language],
  );

  return { t, language };
}

export function useChangeLanguage() {
  const dispatch = useAppDispatch();

  return useCallback(
    async (language: AppLanguage) => {
      i18n.locale = language;
      dispatch(addLanguage(language));
      await setStoredLanguage(language);
    },
    [dispatch],
  );
}

// Roda uma vez na inicialização, antes da splash sumir: aplica o idioma
// salvo no aparelho (se houver). Sem nada salvo, fica o idioma do celular,
// que já é o valor inicial do Redux.
export function useLanguageBootstrap() {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const stored = await getStoredLanguage();
      if (stored) {
        i18n.locale = stored;
        dispatch(addLanguage(stored));
      }
      setReady(true);
    })();
  }, []);

  return { languageReady: ready };
}
