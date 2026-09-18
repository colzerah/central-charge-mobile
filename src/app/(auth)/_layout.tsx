import { Stack } from "expo-router";

import { C } from "@/src/theme";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: C.ink0 },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen
        name="testeCol"
        options={{
          headerShown: true,
          headerTitle: "Pagina Teste coL",
          headerBackTitle: "Voltar",
        }}
      />
      <Stack.Screen
        name="testeImp"
        options={{
          headerShown: true,
          headerTitle: "Pagina Teste Imp",
          headerBackTitle: "Voltar",
        }}
      />
    </Stack>
  );
}
