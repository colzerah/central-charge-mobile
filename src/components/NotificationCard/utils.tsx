import { C } from "@/src/theme";
import { NotificationType } from "./NotificationCardDTO";

export const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "charge":
      return "BatteryCharging";

    case "alert":
      return "TriangleAlert";

    case "success":
      return "CircleCheck";

    case "info":
      return "Bell";

    case "payment":
      return "CreditCard";

    case "gift":
      return "Gift";
  }
};

export const getNotificationIconBackground = (
  type: NotificationType,
): string => {
  switch (type) {
    case "charge":
    case "payment":
      return C.brand400;

    case "alert":
      return C.error;

    case "success":
      return C.success;

    case "info":
      return C.info;

    case "gift":
      return C.brand300;
  }
};

export const getIconColor = (type: NotificationType): string => {
  switch (type) {
    case "charge":
    case "payment":
      return C.brand400;

    case "alert":
      return C.error;

    case "success":
      return C.success;

    case "info":
      return C.info;

    case "gift":
      return C.brand300;
  }
};
