import BackgroundGradient from "@/src/components/BackgroundGradient";
import { Content } from "@/src/components/SearchBar";
import { ScrollableSearch } from "@/src/components/shared/ui/base/scrollable-search";
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
      <View style={{ marginTop: 50, flex: 1 }}>
        <ScrollableSearch>
          <Content
            value={value}
            onPress={(e) => console.log(e)}
            items={items}
            onChange={setValue}
          />
        </ScrollableSearch>
      </View>
    </BackgroundGradient>
  );
}
