import BackgroundGradient from "@/src/components/BackgroundGradient";
import ProfileAvatar from "@/src/components/ProfileAvatar";
import { useAppDispatch } from "@/src/redux/store";

import { StyleSheet, View } from "react-native";

export default function TesteImp() {
  const dispatch = useAppDispatch();

  return (
    <BackgroundGradient>
      <View style={styles.root}>
        <ProfileAvatar
          name="Ruan Carlos Belmiro Gomes"
          imageURI={require("../../../../assets/images/react-logo.png")}
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
