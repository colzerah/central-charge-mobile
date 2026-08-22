import { useAppSelector } from "@/src/redux/store";
import { Redirect } from "expo-router";

export default function Root() {
  const { isAuthenticated } = useAppSelector((state) => state.authState);

  if (isAuthenticated) {
    return <Redirect href="/(app)/(tabs)/home" />;
  }

  return <Redirect href="/login" />;
}
