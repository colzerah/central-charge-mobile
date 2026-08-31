import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="teste"
        options={{
          animation: "ios_from_right",
        }}
      />
    </Stack>
  );
}
