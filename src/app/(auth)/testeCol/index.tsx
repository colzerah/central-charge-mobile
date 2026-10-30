import BackgroundGradient from "@/src/components/BackgroundGradient";
import CheckBox from "@/src/components/CheckBox";
import { useToast } from "@/src/providers/toast-provider";

import { useAppDispatch } from "@/src/redux/store";
import { useMemo, useState } from "react";
import { View } from "react-native";

const RECENT = ["Tokyo", "Kyoto", "Osaka"];

export default function TesteCol() {
  const dispatch = useAppDispatch();
  const { openToast } = useToast();

  const [value, setValue] = useState("");

  const items = useMemo(() => {
    const search = value.trim().toLowerCase();
    return RECENT.filter((item) => item.toLowerCase().includes(search));
  }, [value]);

  return (
    <BackgroundGradient>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <CheckBox />
      </View>
    </BackgroundGradient>
  );
}
