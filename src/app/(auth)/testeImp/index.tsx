import BackgroundGradient from "@/src/components/BackgroundGradient";
import Button from "@/src/components/Button";
import NotificationCard from "@/src/components/NotificationCard";
import { MOCK_NOTIFICATIONS } from "@/src/components/NotificationCard/mock";
import { useAppDispatch } from "@/src/redux/store";

import { StyleSheet, View } from "react-native";

export default function TesteImp() {
  const dispatch = useAppDispatch();

  const handleOpen = (id: string) => {
    console.log("Abrindo notificação:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Excluindo notificação:", id);
  };

  return (
    <BackgroundGradient>
      <View style={styles.root}>
        {MOCK_NOTIFICATIONS.map((notification, index) => (
          <NotificationCard
            key={notification.id}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            day={notification.day}
            month={notification.month}
            read={notification.read}
            animationDelay={index * 50}
            onPress={() => handleOpen(notification.id)}
            onDelete={() => handleDelete(notification.id)}
          />
        ))}
        <Button title="Clique aqui" variant="outline" colorScheme="primary" />
        <Button title="Clique aqui" variant="link" colorScheme="danger" />
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
