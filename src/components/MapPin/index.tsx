import { C } from "@/src/theme";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import Icon from "../Icon";
import { MapPinProps, ReturnGetVariant } from "./MapPinDTO";
import { PIN, styles } from "./styles";

// Mesmo contorno do ícone MapPin do lucide (o da aba Home), sem a bolinha
// do meio: no lugar dela vai o ícone da variante.
const PIN_PATH =
  "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0";

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
      <Svg width={PIN.width} height={PIN.height} viewBox={PIN.viewBox}>
        {/* Sombra desenhada no próprio SVG: shadow/elevation numa View sem
            fundo não funciona no Android e gera aviso no iOS */}
        <Path
          d={PIN_PATH}
          fill={C.black}
          opacity={0.3}
          translateY={PIN.shadowOffset}
        />
        <Path
          d={PIN_PATH}
          fill={getVariant().color}
          stroke={C.ink0}
          strokeWidth={PIN.strokeWidth}
          strokeLinejoin="round"
        />
      </Svg>
      <View style={styles.iconWrap}>
        <Icon
          name={getVariant().icon}
          color={C.white}
          size={PIN.iconSize}
          strokeWidth={2.2}
        />
      </View>
    </View>
  );
};

export default MapPin;
