import BackgroundGradient from "@/src/components/BackgroundGradient";
import Button from "@/src/components/Button";
import ButtonIcon from "@/src/components/ButtonIcon";
import CardInfo from "@/src/components/CardItems/CardInfo";
import CardPlug from "@/src/components/CardItems/CardPlug";
import Icon from "@/src/components/Icon";
import StationCard from "@/src/components/StationCard";
import SummaryCard from "@/src/components/SummaryCard";
import TimeTable from "@/src/components/TimeTable";
import { TimeTableItemProps } from "@/src/components/TimeTable/TimeTableDTO";
import { C } from "@/src/theme";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const MOCKPLUGS = [
  { id: 1, title: "ISO 167", titleSmall: "CCS2", titleKw: "250 kW" },
  { id: 2, title: "ISO 168", titleSmall: "Type 2", titleKw: "43 kW" },
];

export const MOCKTIMETABLE: TimeTableItemProps[] = [
  {
    days: "MONDAY",
    hours: "08:00 às 22:00",
  },
  {
    days: "TUESDAY",
    hours: "08:00 às 22:00",
  },
  {
    days: "WEDNESDAY",
    hours: "08:00 às 22:00",
  },
  {
    days: "TUESDAY",
    hours: "08:00 às 22:00",
  },
  {
    days: "WEDNESDAY",
    hours: "08:00 às 22:00",
  },
  {
    days: "TUESDAY",
    hours: "08:00 às 22:00",
  },
  {
    days: "WEDNESDAY",
    hours: "08:00 às 22:00",
  },
];

export default function PinDetalhes() {
  const { height, width } = useWindowDimensions();

  return (
    <BackgroundGradient>
      <ScrollView
        style={{ marginHorizontal: 14 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 14 }}>
          <StationCard title={"Estacao do sul"} type="AVAILABLE" />
        </View>
        <View
          style={{
            marginTop: 14,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <SummaryCard icon="Zap" value="250" label="kW máx" />
          <SummaryCard icon="Navigation" value="1.5" label="km" />
          <SummaryCard icon="Star" value="0.92" label="R$/kWh" />
        </View>
        <View style={{ marginTop: 24, marginBottom: 8 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: C.brand400,
              fontFamily: "Inter-Bold",
              letterSpacing: 0.5,
            }}
          >
            PLUGS DISPONÍVEIS
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 12 }}>
          {MOCKPLUGS.map((plug) => (
            <CardPlug
              key={plug.id}
              title={plug.title}
              titleSmall={plug.titleSmall}
              titleKw={plug.titleKw}
            />
          ))}
        </View>
        <View style={{ marginTop: 24, marginBottom: 8 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: C.brand400,
              fontFamily: "Inter-Bold",
              letterSpacing: 0.5,
            }}
          >
            ENDEREÇO
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "center",
            gap: 8,
          }}
        >
          <View
            style={{
              // flex: 10,
              width: "80%",
            }}
          >
            <CardInfo
              description="Setor Comercial Sul, EQ 8/12, Asa Sul, Brasília - DF"
              iconName="MapPinned"
            />
          </View>
          <View>
            <ButtonIcon
              icon={"Navigation"}
              square
              size="lg"
              onPress={() => console.log("click no endereco")}
            />
          </View>
        </View>
        <View style={{ marginTop: 24, marginBottom: 8 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: C.brand400,
              fontFamily: "Inter-Bold",
              letterSpacing: 0.5,
            }}
          >
            SUPORTE TÉCNICO
          </Text>
        </View>
        <View>
          <CardInfo
            iconName="Phone"
            description="0800 500 5000"
            onPress={() => console.log("press telefone")}
          />
        </View>
        <View style={{ marginTop: 8 }}>
          <Pressable
            style={({ pressed }) => [
              {
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                backgroundColor: C.error + "15",
                borderRadius: 14,
                borderWidth: 1.5,
                borderColor: C.error + "40",
                paddingHorizontal: 14,
                paddingVertical: 12,
              },
              { opacity: pressed ? 0.5 : 1 },
            ]}
          >
            <Icon
              name="CircleAlert"
              color={C.error}
              size={18}
              strokeWidth={2.2}
            />
            <Text
              style={{
                fontSize: 14,
                color: C.error,
                fontWeight: "600",
                fontFamily: "Inter-SemiBold",
              }}
            >
              Relatar um problemas
            </Text>
          </Pressable>
        </View>
        <View style={{ marginTop: 24, marginBottom: 8 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: C.brand400,
              fontFamily: "Inter-Bold",
              letterSpacing: 0.5,
            }}
          >
            HÓRARIOS DE FUNCIONAMENTO
          </Text>
        </View>
        <View>
          <TimeTable items={MOCKTIMETABLE} />
        </View>
        <View
          style={{
            height: height * 0.3,
            flexDirection: "row",
            marginTop: 30,
            justifyContent: "space-between",
          }}
        >
          <View>
            <Button
              title={"Escaneiar QR Code"}
              iconLeft="QrCode"
              size="lg"
              w={310}
            />
          </View>
          <View>
            <ButtonIcon icon="Star" square size="md" variant="outline" border />
          </View>
        </View>
      </ScrollView>
    </BackgroundGradient>
  );
}

const pinDetailStyles = StyleSheet.create({
  flex: { flex: 1 },
});
