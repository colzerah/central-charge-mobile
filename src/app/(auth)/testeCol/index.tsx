import BackgroundGradient from "@/src/components/BackgroundGradient";
import Button from "@/src/components/Button";
import InputOpt from "@/src/components/InputOpt";
import { useOnboarding } from "@/src/hooks/useOnboarding";
import { useToast } from "@/src/providers/toast-provider";

import { useAppDispatch } from "@/src/redux/store";
import { useEffect, useState } from "react";
import { View } from "react-native";

const RECENT = ["Tokyo", "Kyoto", "Osaka"];

export default function TesteCol() {
  const dispatch = useAppDispatch();
  const { openToast } = useToast();
  const { resetOnboarding } = useOnboarding();

  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log(value);
  }, [value]);

  const handleFinishg = () => {
    if (value !== "123456") {
      setError(true);
    }
    setTimeout(() => {
      setError(false);
    }, 2000);
  };

  return (
    <BackgroundGradient>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <InputOpt
          error={error}
          onChange={setValue}
          onFinishedChange={handleFinishg}
        />
        {__DEV__ && (
          <Button
            title="Resetar tour"
            variant="outline"
            onPress={resetOnboarding}
          />
        )}
      </View>
    </BackgroundGradient>
  );
}
