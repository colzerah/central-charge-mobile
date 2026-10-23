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
          name="Roberto"
          imageURI="https://dnm.nflximg.net/api/v6/s0XAg4q_jvYbSSbLvySyUsliNSg/AAAAQdGpNjgjM-EGLMKSpGta3L5C8BmTIuG4UlIJGNHfWOoOS0L4RihZkkcdmPOjKujYSDvN7PLxk9vYZR1_ME1jI7f8BFUrNQzARKVwe9tuf8Exj4S3J2dqYIvAH2NgV-CiXpkefheq3i-c_AhQKzjm_fC9Kk0.jpg?r=5f2"
          // imageURI={require("../../../../assets/images/react-logo.png")}
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
