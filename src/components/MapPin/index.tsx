import { C } from "@/src/theme";
import { Image } from "expo-image";
import { View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import Icon from "../Icon";
import { MapPinProps, ReturnGetVariant } from "./MapPinDTO";
import { PIN, styles } from "./styles";

// Mesmo contorno do ícone MapPin do lucide (o da aba Home), sem a bolinha
// do meio: no lugar dela vai o miolo com o ícone (ou a imagem).
const PIN_PATH =
  "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0";

// Cores próprias dos pins, mais fechadas que C.success/C.error para não
// ficarem fluorescentes no mapa. Só valem aqui: o resto do app não muda.
const PIN_COLORS = {
  available: "#15803D", // verde escuro
  occupied: C.brand500,
  broken: "#B91C1C", // vermelho escuro
};

const MapPin = ({ variant, centerImage }: MapPinProps) => {
  const getVariant = (): ReturnGetVariant => {
    if (variant === "BROKEN") {
      return { icon: "ZapOff", color: PIN_COLORS.broken };
    }

    if (variant === "OCCUPIED") {
      return { icon: "BatteryCharging", color: PIN_COLORS.occupied };
    }

    return { icon: "Zap", color: PIN_COLORS.available };
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
        {/* A gota inteira fica na cor do status */}
        <Path
          d={PIN_PATH}
          fill={getVariant().color}
          stroke={getVariant().color}
          strokeWidth={PIN.strokeWidth}
          strokeLinejoin="round"
        />
        {/* Miolo branco: fica por baixo da imagem enquanto ela carrega */}
        <Circle
          cx={PIN.head.x}
          cy={PIN.head.y}
          r={PIN.head.radius}
          fill={C.white}
        />
      </Svg>
      {centerImage ? (
        <Image
          source={centerImage}
          style={styles.centerImage}
          contentFit="cover"
        />
      ) : (
        <View style={styles.iconWrap}>
          <Icon
            name={getVariant().icon}
            color={C.ink0}
            // fill={C.ink0}
            size={PIN.iconSize}
            strokeWidth={2.4}
          />
        </View>
      )}
    </View>
  );
};

export default MapPin;
