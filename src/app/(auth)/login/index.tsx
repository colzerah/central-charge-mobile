import BackgroundGradient from "@/src/components/BackgroundGradient";
import ViewLogin from "@/src/components/Views/ViewLogin";
import { useFrameworkReady } from "@/src/hooks/useFrameworkReady";

export default function Login() {
  useFrameworkReady();

  return (
    <BackgroundGradient>
      <ViewLogin />
    </BackgroundGradient>
  );
}
