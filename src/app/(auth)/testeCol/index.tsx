import BackgroundGradient from "@/src/components/BackgroundGradient";
import { useToast } from "@/src/providers/toast-provider";

import { useAppDispatch } from "@/src/redux/store";

export default function TesteCol() {
  const dispatch = useAppDispatch();
  const { openToast } = useToast();

  return (
    <BackgroundGradient>
      <></>
    </BackgroundGradient>
  );
}
