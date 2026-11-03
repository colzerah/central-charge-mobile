import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { useCallback, useEffect } from "react";
import { addOnboardingDone } from "../redux/appSlice";
import {
  getOnboardingDone,
  resetOnboardingDone,
  setOnboardingDone,
} from "../utils/onboarding";

export function useOnboarding() {
  const dispatch = useAppDispatch();
  const { onboardingDone } = useAppSelector((state) => state.appState);

  // Chamado pelo "Pular" e pelo "Começar". Grava antes de atualizar o
  // Redux para a flag já estar persistida quando o guard do _layout
  // trocar o tour pelo (auth).
  const completeOnboarding = useCallback(async () => {
    await setOnboardingDone();
    dispatch(addOnboardingDone(true));
  }, []);

  // Só para desenvolvimento: deslogado, o guard volta a mostrar o tour na hora.
  const resetOnboarding = useCallback(async () => {
    await resetOnboardingDone();
    dispatch(addOnboardingDone(false));
  }, []);

  return { onboardingDone, completeOnboarding, resetOnboarding };
}

// Mesmo papel do useAuthBootstrap: roda uma vez na inicialização, antes
// da splash sumir, para o _layout saber se mostra o tour ou o (auth).
// onboardingDone fica null até essa leitura terminar.
export function useOnboardingBootstrap() {
  const dispatch = useAppDispatch();
  const { onboardingDone } = useAppSelector((state) => state.appState);

  useEffect(() => {
    (async () => {
      const storedOnboardingDone = await getOnboardingDone();
      dispatch(addOnboardingDone(storedOnboardingDone));
    })();
  }, []);

  return { onboardingDone };
}
