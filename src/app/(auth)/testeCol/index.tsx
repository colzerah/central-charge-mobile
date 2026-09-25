import BackgroundGradient from "@/src/components/BackgroundGradient";
import Button from "@/src/components/Button";
import { useToast } from "@/src/providers/toast-provider";

import { useAppDispatch } from "@/src/redux/store";
import { View } from "react-native";

export default function TesteCol() {
  const dispatch = useAppDispatch();
  const { openToast } = useToast();

  const handlePressSucess = () => {
    openToast({
      title: "Success",
      subTitle: "Your changes have been saved.",
      type: "SUCCESS",
    });
  };

  const handlePressError = () => {
    openToast({
      title: "Connection lost",
      subTitle: "Something went wrong. Please try again.",
      type: "ERROR",
    });
  };

  const handlePressInfo = () => {
    openToast({
      title: "New version available",
      subTitle: "Restart the app to update.",
      type: "INFO",
    });
  };

  const handlePressWarning = () => {
    openToast({
      title: "New version available",
      subTitle: "Restart the app to update.",
      type: "WARNING",
    });
  };

  return (
    <>
      <BackgroundGradient>
        <View style={{ marginBottom: 40, marginTop: 40 }}>
          <Button title="Success" onPress={handlePressSucess} />
        </View>
        <View style={{ marginBottom: 40 }}>
          <Button title="Error" onPress={handlePressError} />
        </View>
        <View style={{ marginBottom: 40 }}>
          <Button title="Info" onPress={handlePressInfo} />
        </View>
        <View style={{ marginBottom: 40 }}>
          <Button title="Warning" onPress={handlePressWarning} />
        </View>
      </BackgroundGradient>
    </>
  );
}
