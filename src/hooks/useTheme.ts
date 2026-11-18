import { addTheme } from "@/src/redux/appSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { AppTheme, THEME_COLORS, ThemeColors } from "@/src/theme";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getStoredTheme, setStoredTheme } from "../utils/theme";

// Tema atual e suas cores. O tema vem do Redux, então quem usa o hook se
// redesenha sozinho quando ele muda em Configurações.
export function useTheme() {
  const theme = useAppSelector((state) => state.appState.theme);
  const colors = THEME_COLORS[theme];
  return { theme, colors, isDark: theme === "dark" };
}

// Estilos que dependem do tema. Cada styles.ts migrado exporta
// `makeStyles = (C: ThemeColors) => StyleSheet.create({...})`, e o componente
// chama `const styles = useThemedStyles(makeStyles)`.
export function useThemedStyles<T>(makeStyles: (colors: ThemeColors) => T): T {
  const { colors } = useTheme();
  return useMemo(() => makeStyles(colors), [makeStyles, colors]);
}

export function useChangeTheme() {
  const dispatch = useAppDispatch();

  return useCallback(
    async (theme: AppTheme) => {
      dispatch(addTheme(theme));
      await setStoredTheme(theme);
    },
    [dispatch],
  );
}

// Roda uma vez na inicialização, antes da splash sumir, para aplicar o tema
// salvo no aparelho (sem nada salvo, fica o escuro).
export function useThemeBootstrap() {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const stored = await getStoredTheme();
      if (stored) dispatch(addTheme(stored));
      setReady(true);
    })();
  }, []);

  return { themeReady: ready };
}
