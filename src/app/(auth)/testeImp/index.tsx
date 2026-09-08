import BackgroundGradient from "@/src/components/BackgroundGradient";
import NotificationCard from "@/src/components/NotificationCard";
import { MOCK_NOTIFICATIONS } from "@/src/components/NotificationCard/mock";
import { Notification } from "@/src/components/NotificationCard/NotificationCardDTO";
import { useAppDispatch } from "@/src/redux/store";

import { StyleSheet, View } from "react-native";

export default function TesteImp() {
  const dispatch = useAppDispatch();

  const handleOpen = (notification: Notification) => {
    console.log("Abrindo notificação:", notification);
  };

  const handleDelete = (notification: Notification) => {
    console.log("Excluindo notificação:", notification);
  };

  return (
    <BackgroundGradient>
      <View style={styles.root}>
        {MOCK_NOTIFICATIONS.map((notification, index) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            index={index}
            onPress={handleOpen}
            onDelete={handleDelete}
          />
        ))}
      </View>
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
    gap: 10,
  },
});
