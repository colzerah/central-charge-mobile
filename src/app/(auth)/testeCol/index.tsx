import BackgroundGradient from "@/src/components/BackgroundGradient";
import InputOpt from "@/src/components/InputOpt";
import { useToast } from "@/src/providers/toast-provider";

import { useAppDispatch } from "@/src/redux/store";
import { useEffect, useState } from "react";
import { View } from "react-native";

const RECENT = ["Tokyo", "Kyoto", "Osaka"];

export default function TesteCol() {
  const dispatch = useAppDispatch();
  const { openToast } = useToast();

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
      </View>
    </BackgroundGradient>
  );
}
