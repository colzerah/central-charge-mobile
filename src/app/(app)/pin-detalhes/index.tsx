import BackgroundGradient from "@/src/components/BackgroundGradient";
import Button from "@/src/components/Button";
import ButtonIcon from "@/src/components/ButtonIcon";
import CardInfo from "@/src/components/CardItems/CardInfo";
import CardPlug from "@/src/components/CardItems/CardPlug";
import Icon from "@/src/components/Icon";
import StationCard from "@/src/components/StationCard";
import SummaryCard from "@/src/components/SummaryCard";
import TimeTable from "@/src/components/TimeTable";
import { useAppSelector } from "@/src/redux/store";
import { C } from "@/src/theme";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function PinDetalhes() {
  const { height, width } = useWindowDimensions();
  const { values } = useAppSelector((state) => state.appState.home);

  return (
    <BackgroundGradient>
      <ScrollView
        style={pinDetailStyles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={pinDetailStyles.viewStation}>
          <StationCard title={values.pinSelected?.name!} type="AVAILABLE" />
        </View>
        <View style={pinDetailStyles.viewSummary}>
          <SummaryCard
            icon="Zap"
            value={values.pinSelected?.kwhmax!}
            label="kW máx"
          />
          <SummaryCard icon="Navigation" value={1.5} label="km" />
          <SummaryCard
            icon="Star"
            value={values.pinSelected?.r$kwh!}
            label="R$/kWh"
          />
        </View>
        <View style={pinDetailStyles.section}>
          <Text style={pinDetailStyles.title}>PLUGS DISPONÍVEIS</Text>
        </View>
        <View style={pinDetailStyles.viewPlug}>
          {values.pinSelected?.plugs.map((plug) => (
            <CardPlug
              key={plug.id}
              title={plug.title}
              titleSmall={plug.titleSmall}
              titleKw={`${plug.kw} kW`}
            />
          ))}
        </View>
        <View style={pinDetailStyles.section}>
          <Text style={pinDetailStyles.title}>ENDEREÇO</Text>
        </View>
        <View style={pinDetailStyles.viewCardInfo}>
          <View style={pinDetailStyles.viewCardInfoContent}>
            <CardInfo
              description={values.pinSelected?.adress!}
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
        <View style={pinDetailStyles.section}>
          <Text style={pinDetailStyles.title}>SUPORTE TÉCNICO</Text>
        </View>
        <View>
          <CardInfo
            iconName="Phone"
            description={values.pinSelected?.supportNumber!}
            onPress={() => console.log("press telefone")}
          />
        </View>
        <View style={pinDetailStyles.viewPressError}>
          <Pressable
            style={({ pressed }) => [
              pinDetailStyles.pressableError,
              { opacity: pressed ? 0.5 : 1 },
            ]}
          >
            <Icon
              name="CircleAlert"
              color={C.error}
              size={18}
              strokeWidth={2.2}
            />
            <Text style={pinDetailStyles.titleError}>Relatar um problemas</Text>
          </Pressable>
        </View>
        <View style={pinDetailStyles.section}>
          <Text style={pinDetailStyles.title}>HÓRARIOS DE FUNCIONAMENTO</Text>
        </View>
        <View>
          <TimeTable items={values.pinSelected?.schedules!} />
        </View>
        <View style={[pinDetailStyles.viewButton, { height: height * 0.3 }]}>
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
  container: { marginHorizontal: 14 },
  viewStation: { marginTop: 14 },
  viewSummary: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    marginTop: 24,
    marginBottom: 8,
  },
  viewPlug: {
    flexDirection: "row",
    gap: 12,
  },
  viewCardInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  viewCardInfoContent: {
    width: "80%",
  },
  viewButton: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
  },
  viewPressError: {
    marginTop: 8,
  },
  pressableError: {
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
  titleError: {
    fontSize: 14,
    color: C.error,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  title: {
    fontSize: 12,
    fontWeight: "700",
    color: C.brand400,
    fontFamily: "Inter-Bold",
    letterSpacing: 0.5,
  },
});
