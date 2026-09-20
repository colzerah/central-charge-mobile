import BackgroundGradient from "@/src/components/BackgroundGradient";
import Button from "@/src/components/Button";
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
        {/* {MOCK_NOTIFICATIONS.map((notification, index) => (
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
        ))} */}
        <Button title="Clique aqui" size="md" colorScheme="primary" />
        <Button title="Clique aqui" size="md" colorScheme="danger" />
        <Button title="Clique aqui" size="md" colorScheme="warning" />
        <Button title="Clique aqui" size="md" colorScheme="success" />
        <Button
          title="Clique aqui"
          size="md"
          colorScheme="primary"
          variant="outline"
        />
        <Button
          title="Clique aqui"
          size="md"
          colorScheme="danger"
          variant="outline"
        />
        <Button
          title="Clique aqui"
          size="md"
          colorScheme="warning"
          variant="outline"
        />
        <Button
          title="Clique aqui"
          size="md"
          colorScheme="success"
          variant="outline"
        />
        <Button
          title="Clique aqui"
          size="md"
          colorScheme="primary"
          variant="link"
        />
        <Button
          title="Clique aqui"
          size="md"
          colorScheme="danger"
          variant="link"
        />
        <Button
          title="Clique aqui"
          size="md"
          colorScheme="warning"
          variant="link"
        />
        <Button
          title="Clique aqui"
          size="md"
          colorScheme="success"
          variant="link"
        />
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
