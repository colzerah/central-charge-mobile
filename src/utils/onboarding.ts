import AsyncStorage from "@react-native-async-storage/async-storage";

// Flag por aparelho: fica fora do multiRemove do signOut (useAuth.ts)
// para o tour não voltar a aparecer depois de um logout.
const ONBOARDING_KEY = "@onboardingDone";

export async function getOnboardingDone(): Promise<boolean> {
  const stored = await AsyncStorage.getItem(ONBOARDING_KEY);
  return stored === "true";
}

export async function setOnboardingDone(): Promise<void> {
  await AsyncStorage.setItem(ONBOARDING_KEY, "true");
}

// Só para desenvolvimento: faz o tour aparecer de novo.
export async function resetOnboardingDone(): Promise<void> {
  await AsyncStorage.removeItem(ONBOARDING_KEY);
}
