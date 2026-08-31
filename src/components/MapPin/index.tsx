import { C } from "@/src/theme";
import { View } from "react-native";
import Icon from "../Icon";
import { MapPinProps, ReturnGetVariant } from "./MapPinDTO";
import { styles } from "./styles";

const MapPin = ({ variant }: MapPinProps) => {
  const getVariant = (): ReturnGetVariant => {
    if (variant === "BROKEN") {
      return { icon: "PlugZap", color: C.error };
    }

    if (variant === "OCCUPIED") {
      return { icon: "DatabaseZap", color: C.warning };
    }

    return { icon: "Zap", color: C.success };
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.badge,
          {
            backgroundColor: getVariant().color,
            // borderColor: getVariant().color,
          },
        ]}
      >
        <Icon
          name={getVariant().icon}
          color={C.white}
          size={20}
          strokeWidth={2.2}
        />
      </View>
      {/* <View style={[styles.tail, { borderTopColor: getVariant().color }]} /> */}
      <View style={[styles.tail, { borderColor: C.ink0 }]} />
    </View>
  );
};

export default MapPin;
