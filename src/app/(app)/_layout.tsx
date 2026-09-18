import { Stack } from "expo-router";

import Header from "@/src/components/Header";
import { C } from "@/src/theme";

// Este grupo só é montado quando autenticado: o Stack.Protected em
// src/app/_layout.tsx já garante isso, então não precisa checar de novo aqui.
export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: C.ink0 },
      }}
    >
      <Stack.Screen
        name="veiculos"
        options={{
          headerShown: true,
          header: () => (
            <Header
              title="Veículos"
              subtitle="Gerencie seus carros cadastrados"
            />
          ),
        }}
      />
      <Stack.Screen
        name="novo-veiculo"
        options={{
          headerShown: true,
          header: () => (
            <Header
              title="Novo veículo"
              subtitle="Adicione um carro à sua conta"
            />
          ),
        }}
      />
    </Stack>
  );
}
