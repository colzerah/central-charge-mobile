import { useTheme, useThemedStyles } from "@/src/hooks/useTheme";
import { Stack } from "expo-router";

import { C } from "@/src/theme";

export default function TabsLayout() {
  const { colors: C } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: C.ink0 },
      }}
    />
  );
}
