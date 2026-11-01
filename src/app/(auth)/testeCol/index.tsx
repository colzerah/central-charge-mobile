import BackgroundGradient from "@/src/components/BackgroundGradient";
import Seek from "@/src/components/Seek";
import { useToast } from "@/src/providers/toast-provider";

import { useAppDispatch } from "@/src/redux/store";
import { useEffect, useState } from "react";
import { View } from "react-native";

const RECENT = ["Tokyo", "Kyoto", "Osaka"];

export default function TesteCol() {
  const dispatch = useAppDispatch();
  const { openToast } = useToast();

  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log(value);
  }, [value]);

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
        <Seek value={value} onChange={setValue} min={0} max={300} />
      </View>
    </BackgroundGradient>
  );
}
