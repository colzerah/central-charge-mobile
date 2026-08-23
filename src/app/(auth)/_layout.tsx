import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
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
