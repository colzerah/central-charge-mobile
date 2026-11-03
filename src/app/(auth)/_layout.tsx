import { Stack } from "expo-router";

import { HeaderBackButton } from "@/src/components/Header";
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
      <Stack.Screen
        name="criarConta"
        options={{
          headerShown: true,
          header: () => <HeaderBackButton />,
          headerTitle: "Criar Conta",
          headerBackTitle: "Voltar",
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          headerShown: true,
          header: () => <HeaderBackButton />,
          headerTitle: "",
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="send-code"
        options={{
          headerShown: true,
          header: () => <HeaderBackButton />,
          headerTitle: "",
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="new-password"
        options={{
          headerShown: true,
          header: () => <HeaderBackButton />,
          headerTitle: "",
          headerBackTitle: "",
        }}
      />
    </Stack>
  );
}
