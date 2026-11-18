import { useTheme, useThemedStyles } from "@/src/hooks/useTheme";
import { useTranslation } from "@/src/hooks/useTranslation";
import { C } from "@/src/theme";
import { Trash2 } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Tag from "../../Tag";
import { makeVehicleStyles } from "./styles";
import { VehicleCardProps } from "./VehicleCardDTO";

export function VehicleCard({ vehicle, onDelete }: VehicleCardProps) {
  const { colors: C } = useTheme();
  const vehicleStyles = useThemedStyles(makeVehicleStyles);
  const { t } = useTranslation();
  return (
    <View style={vehicleStyles.card}>
      <View style={vehicleStyles.cardImageWrap}>
        <Image
          source={{ uri: vehicle.image }}
          style={vehicleStyles.cardImage}
          resizeMode="cover"
        />
        <View style={vehicleStyles.imageOverlay} />

        <TouchableOpacity
          style={vehicleStyles.deleteBtn}
          onPress={onDelete}
          activeOpacity={0.7}
        >
          <Trash2 color={C.error} size={18} strokeWidth={2.2} />
        </TouchableOpacity>
      </View>

      <View style={vehicleStyles.cardInfo}>
        <View style={vehicleStyles.cardHeader}>
          <Text style={vehicleStyles.vehicleName}>{vehicle.name}</Text>
          <Text style={vehicleStyles.vehicleBrand}>{vehicle.brand}</Text>
        </View>
        <View style={vehicleStyles.plateWrap}>
          <Text style={vehicleStyles.plateLabel}>{t("vehicles.plate") /* pt: "Placa" */}</Text>
          <View>
            <Tag title={vehicle.plate} type="gray" size="md" />
          </View>
        </View>
      </View>
    </View>
  );
}
