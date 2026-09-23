import BackgroundGradient from "@/src/components/BackgroundGradient";
import { useAppDispatch } from "@/src/redux/store";
import { StyleSheet } from "react-native";

export default function TesteCol() {
  const dispatch = useAppDispatch();

  return (
    <BackgroundGradient>
      <></>
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
