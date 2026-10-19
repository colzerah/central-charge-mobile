import BackgroundGradient from "@/src/components/BackgroundGradient";
import ProfileCard from "@/src/components/ProfileCard";
import { useAppDispatch } from "@/src/redux/store";

import { StyleSheet, View } from "react-native";

export default function TesteImp() {
  const dispatch = useAppDispatch();

  return (
    <BackgroundGradient>
      <View style={styles.root}>
        <ProfileCard
          name="User Teste"
          imageURI=""
          email="teste@gmail.com"
          premium
        />
      </View>
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 50,
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
    gap: 50,
  },
});
