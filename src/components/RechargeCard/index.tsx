import { C } from "@/src/theme";
import {
  convertDateToDayAndMonthShort,
  convertHourAndMinute,
} from "@/src/utils/date";
import { Pressable, Text, View } from "react-native";
import IconBackground from "../IconBackground";
import Tag from "../Tag";
import { RechargeCardProps } from "./RechargeCardDTO";
import { styles } from "./styles";

const RechargeCard = ({
  title,
  duration,
  variant = "default",
  kwh,
  cost,
  tagTitle,
  onPress,
  date,
}: RechargeCardProps) => {
  const getVariant = () => {
    if (variant === "success") {
      return {
        color: C.success,
      };
    }
    if (variant === "warning") {
      return {
        color: C.warning,
      };
    }
    if (variant === "info") {
      return {
        color: C.info,
      };
    }
    if (variant === "danger") {
      return {
        color: C.error,
      };
    }
    if (variant === "default") {
      return {
        color: C.brand400,
      };
    }
  };

  const formattedCost = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cost);

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <IconBackground
        icon="BatteryCharging"
        backgroundColor={getVariant()?.color}
        iconColor={getVariant()?.color}
        size="lg"
      />
      <View style={styles.rechargeInfo}>
        <Text style={styles.rechargeStation}>{title}</Text>
        <View style={styles.rechargeDateInfo}>
          <Text style={styles.rechargeDate}>
            {convertDateToDayAndMonthShort(date)}
          </Text>
          <Text style={styles.rechargeDate}>
            , {convertHourAndMinute(date)}
          </Text>
        </View>
        <View style={styles.rechargeStats}>
          <Text style={styles.rechargeStat}>{`${duration} min`}</Text>
          <Text style={styles.rechargeDot}>•</Text>
          <Text style={styles.rechargeStat}>{`${kwh} Kwh`}</Text>
        </View>
      </View>
      <View style={styles.rechargeRight}>
        <Text style={styles.rechargeCost}>{formattedCost}</Text>
        <Tag title={tagTitle} type={variant} />
      </View>
    </Pressable>
  );
};

export default RechargeCard;
