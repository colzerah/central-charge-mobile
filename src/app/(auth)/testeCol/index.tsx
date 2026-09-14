import { useRef } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import BackgroundGradient from "@/src/components/BackgroundGradient";
import MapButtonSheet from "@/src/components/MapButtonSheet";
import type { IMapButtonSheetRef } from "@/src/components/MapButtonSheet";
import { useAppDispatch } from "@/src/redux/store";

export default function TesteCol() {
  const dispatch = useAppDispatch();
  const sheetRef = useRef<IMapButtonSheetRef>(null);

  return (
    <BackgroundGradient>
      <Pressable style={styles.trigger} onPress={() => sheetRef.current?.present()}>
        <Text style={styles.triggerText}>Abrir cadastro</Text>
      </Pressable>

      <MapButtonSheet
        ref={sheetRef}
        onPrimaryPress={() => sheetRef.current?.dismiss()}
        onSecondaryPress={() => console.log("Continue with Email")}
        onApplePress={() => console.log("Continue with Apple")}
        onGooglePress={() => console.log("Continue with Google")}
      />
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  trigger: {
    alignSelf: "center",
    marginTop: 200,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#ffffff",
  },
  triggerText: {
    fontWeight: "700",
    color: "#111111",
  },
});
