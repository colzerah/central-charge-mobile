import BackgroundGradient from "@/src/components/BackgroundGradient";
import CardBrand from "@/src/components/CardItems/CardBrand";
import { useToast } from "@/src/providers/toast-provider";

import { useAppDispatch } from "@/src/redux/store";
import { useEffect, useState } from "react";
import { View } from "react-native";

const RECENT = ["Tokyo", "Kyoto", "Osaka"];

export default function TesteCol() {
  const dispatch = useAppDispatch();
  const { openToast } = useToast();

  const [value, setValue] = useState(false);

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
        <CardBrand label={"PlugCharge"} indexColor={2} />
        <CardBrand
          indexColor={2}
          onPress={() => setValue((prev) => !prev)}
          label={"PlugCharge"}
          isActive={value}
          count={2}
          uri={
            "https://cdn.aptoide.com/imgs/a/8/d/a8dd37571f8e05e9a1e2da4be769e6a0_icon.png"
          }
        />
      </View>
    </BackgroundGradient>
  );
}
