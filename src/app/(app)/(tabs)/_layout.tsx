import { Stack } from "expo-router";

import { C } from "@/src/theme";

export default function TabsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: C.ink0 },
      }}
    />
  );
}
