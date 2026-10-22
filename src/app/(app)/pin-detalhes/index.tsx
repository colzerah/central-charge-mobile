import BackgroundGradient from "@/src/components/BackgroundGradient";
import CardPlug from "@/src/components/CardItems/CardPlug";
import StationCard from "@/src/components/StationCard";
import SummaryCard from "@/src/components/SummaryCard";
import { C } from "@/src/theme";
import { StyleSheet, Text, View } from "react-native";

const MOCKPLUGS = [
  { id: 1, title: "ISO 167", titleSmall: "CCS2", titleKw: "250 kW" },
  { id: 2, title: "ISO 168", titleSmall: "Type 2", titleKw: "43 kW" },
];

export default function PinDetalhes() {
  return (
    <BackgroundGradient>
      <View style={{ marginHorizontal: 14, marginTop: 14 }}>
        <StationCard title={"Estacao do sul"} type="OCCUPIED" />
      </View>

      <View
        style={{
          marginTop: 14,
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 14,
        }}
      >
        <SummaryCard icon="Info" value="250" label="kW máx" />
        <SummaryCard icon="Info" value="1.5" label="km" />
        <SummaryCard icon="Info" value="0.92" label="R$/kWh" />
      </View>
      <View style={{ marginTop: 24, marginBottom: 8 }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "700",
            color: C.brand400,
            fontFamily: "Inter-Bold",
            letterSpacing: 0.5,
            paddingHorizontal: 18,
          }}
        >
          PLUGS DISPONÍVEIS
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 12, marginHorizontal: 14 }}>
        {MOCKPLUGS.map((plug) => (
          <CardPlug
            key={plug.id}
            title={plug.title}
            titleSmall={plug.titleSmall}
            titleKw={plug.titleKw}
          />
        ))}
      </View>
    </BackgroundGradient>
  );
}

const newehicleStyles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: 24, paddingBottom: 48 },
  introIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: C.brand400 + "18",
    borderWidth: 1,
    borderColor: C.brand400 + "55",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 18,
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
  },
  subtitle: {
    textAlign: "center",
    color: C.ink400,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "Inter-Regular",
    marginTop: 8,
    marginHorizontal: 8,
    marginBottom: 24,
  },
  formCard: {
    backgroundColor: C.ink50,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: C.ink200,
    padding: 18,
    gap: 8,
    paddingBottom: 28,
  },
  errorText: {
    color: C.error,
    fontSize: 13,
    fontFamily: "Inter-Regular",
    marginTop: 14,
    marginHorizontal: 4,
  },
});
