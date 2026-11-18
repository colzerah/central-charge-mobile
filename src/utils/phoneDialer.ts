import { Linking } from "react-native";

export const openPhoneDialer = async (phone: string) => {
  try {
    await Linking.openURL(`tel:${phone}`);
  } catch (error) {
    console.error("Erro ao abrir discador:", error);
  }
};
